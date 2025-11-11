const https = require('https');

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

  const options = {
    method: 'GET',
    hostname: 'instagram-profile1.p.rapidapi.com',
    port: null,
    path: `/getprofile/${username}`,
    headers: {
      'x-rapidapi-key': process.env.RAPIDAPI_KEY || 'dd3c34e814msh61c8bd0f44c7617p1449b2jsn7b9eec3255f0',
      'x-rapidapi-host': 'instagram-profile1.p.rapidapi.com'
    }
  };

  // Return a promise to handle the async request
  return new Promise((resolve, reject) => {
    const apiReq = https.request(options, function (apiRes) {
      const chunks = [];

      apiRes.on('data', function (chunk) {
        chunks.push(chunk);
      });

      apiRes.on('end', function () {
        const body = Buffer.concat(chunks);
        const data = body.toString();

        try {
          // Parse JSON response
          const jsonData = JSON.parse(data);
          
          // Send successful response
          res.status(apiRes.statusCode).json(jsonData);
          resolve();
        } catch (error) {
          // If parsing fails, send raw data
          res.status(apiRes.statusCode).send(data);
          resolve();
        }
      });
    });

    apiReq.on('error', function (error) {
      console.error('API Error:', error);
      res.status(500).json({ error: 'Failed to fetch Instagram profile', details: error.message });
      resolve();
    });

    apiReq.end();
  });
};

