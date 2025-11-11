const https = require('https');

// Hybrid approach: Try to scrape Instagram public data
// This doesn't require API keys but may be blocked by Instagram

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const { username } = req.query;

  if (!username) {
    return res.status(400).json({ error: 'Username is required' });
  }

  // Method 1: Try Instagram's public web endpoint
  const instagramURL = `https://www.instagram.com/api/v1/users/web_profile_info/?username=${username}`;

  return new Promise((resolve) => {
    const options = {
      hostname: 'www.instagram.com',
      path: `/api/v1/users/web_profile_info/?username=${username}`,
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'X-IG-App-ID': '936619743392459', // Public Instagram App ID
        'Accept': 'application/json'
      }
    };

    const request = https.request(options, (response) => {
      let data = '';

      response.on('data', (chunk) => {
        data += chunk;
      });

      response.on('end', () => {
        try {
          const jsonData = JSON.parse(data);

          if (jsonData.data && jsonData.data.user) {
            const user = jsonData.data.user;
            
            // Transform to our format
            const result = {
              username: user.username,
              full_name: user.full_name,
              profile_pic_url: user.profile_pic_url_hd || user.profile_pic_url,
              profile_pic_url_hd: user.profile_pic_url_hd,
              biography: user.biography,
              edge_followed_by: { count: user.edge_followed_by?.count || 0 },
              edge_follow: { count: user.edge_follow?.count || 0 },
              edge_owner_to_timeline_media: { count: user.edge_owner_to_timeline_media?.count || 0 }
            };

            res.status(200).json(result);
          } else {
            res.status(404).json({ 
              error: 'Profile not found',
              message: 'This method may be blocked by Instagram. Consider using RapidAPI with a valid subscription.'
            });
          }
          resolve();
        } catch (error) {
          res.status(500).json({ 
            error: 'Failed to parse Instagram response',
            message: data.substring(0, 200)
          });
          resolve();
        }
      });
    });

    request.on('error', (error) => {
      res.status(500).json({ 
        error: 'Failed to connect to Instagram',
        details: error.message 
      });
      resolve();
    });

    request.setTimeout(10000, () => {
      request.destroy();
      res.status(408).json({ error: 'Request timeout' });
      resolve();
    });

    request.end();
  });
};

