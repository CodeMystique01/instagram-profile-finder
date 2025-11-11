const https = require('https');
const http = require('http');

// This endpoint fetches brand ad data from BrandBooster API
// Example: /api/brand-info?brand=Nike

module.exports = async (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const { brand } = req.query;

  if (!brand) {
    return res.status(400).json({ error: 'Brand name is required' });
  }

  // Fetch from BrandBooster API
  const url = `https://api.brandbooster.ai/api/v1/research/brand-ads-count-public?brand_name=${encodeURIComponent(brand)}`;

  return new Promise((resolve) => {
    https.get(url, (apiRes) => {
      let data = '';

      apiRes.on('data', (chunk) => {
        data += chunk;
      });

      apiRes.on('end', () => {
        try {
          const jsonData = JSON.parse(data);
          res.status(200).json(jsonData);
          resolve();
        } catch (error) {
          res.status(500).json({ error: 'Failed to parse response' });
          resolve();
        }
      });
    }).on('error', (error) => {
      res.status(500).json({ error: error.message });
      resolve();
    });
  });
};

