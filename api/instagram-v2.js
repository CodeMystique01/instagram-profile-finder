const https = require('https');
// Load environment variables for local testing
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

// Alternative API endpoints to try
const API_ENDPOINTS = [
  {
    name: 'instagram-scraper-api2',
    hostname: 'instagram-scraper-api2.p.rapidapi.com',
    path: (username) => `/v1/info?username_or_id_or_url=${username}`,
    transformResponse: (data) => {
      if (data.data) {
        const user = data.data;
        return {
          username: user.username,
          full_name: user.full_name,
          profile_pic_url: user.profile_pic_url,
          profile_pic_url_hd: user.profile_pic_url_hd || user.profile_pic_url,
          biography: user.biography,
          edge_followed_by: { count: user.follower_count || 0 },
          edge_follow: { count: user.following_count || 0 },
          edge_owner_to_timeline_media: { count: user.media_count || 0 }
        };
      }
      return data;
    }
  },
  {
    name: 'instagram-profile1',
    hostname: 'instagram-profile1.p.rapidapi.com',
    path: (username) => `/getprofile/${username}`,
    transformResponse: (data) => data
  }
];

module.exports = async (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle OPTIONS preflight request
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Get username from query parameter
  const { username } = req.query;

  if (!username) {
    return res.status(400).json({ error: 'Username is required' });
  }

  // Try each API endpoint until one works
  for (const endpoint of API_ENDPOINTS) {
    try {
      const data = await tryAPI(endpoint, username);
      
      // Check if we got valid data
      if (data && !data.error && !data.not_found && data.username) {
        const transformed = endpoint.transformResponse(data);
        return res.status(200).json(transformed);
      }
    } catch (error) {
      console.log(`${endpoint.name} failed:`, error.message);
      // Continue to next endpoint
    }
  }

  // All APIs failed
  return res.status(404).json({ 
    error: 'Profile not found',
    message: 'Could not fetch profile from any API. Please check the username or try again later.',
    username: username
  });
};

function tryAPI(endpoint, username) {
  return new Promise((resolve, reject) => {
    const options = {
      method: 'GET',
      hostname: endpoint.hostname,
      port: null,
      path: endpoint.path(username),
      headers: {
        'x-rapidapi-key': process.env.RAPIDAPI_KEY || 'dd3c34e814msh61c8bd0f44c7617p1449b2jsn7b9eec3255f0',
        'x-rapidapi-host': endpoint.hostname
      }
    };

    const apiReq = https.request(options, function (apiRes) {
      const chunks = [];

      apiRes.on('data', function (chunk) {
        chunks.push(chunk);
      });

      apiRes.on('end', function () {
        const body = Buffer.concat(chunks);
        const data = body.toString();

        try {
          const jsonData = JSON.parse(data);
          
          // Check for API errors
          if (apiRes.statusCode >= 400 || jsonData.error || jsonData.not_found) {
            reject(new Error(jsonData.message || `API returned status ${apiRes.statusCode}`));
          } else {
            resolve(jsonData);
          }
        } catch (error) {
          reject(new Error('Failed to parse API response'));
        }
      });
    });

    apiReq.on('error', function (error) {
      reject(error);
    });

    apiReq.setTimeout(10000, () => {
      apiReq.destroy();
      reject(new Error('Request timeout'));
    });

    apiReq.end();
  });
}

