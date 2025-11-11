const https = require('https');

// Load environment variables
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

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

  // Get brand name from query parameter
  const { brand } = req.query;

  if (!brand) {
    return res.status(400).json({ error: 'Brand name is required' });
  }

  try {
    // Step 1: Fetch brand ad data from BrandBooster API
    const adData = await fetchBrandAds(brand);
    
    // Step 2: Use Gemini API to generate insights about the brand
    const geminiInsights = await getGeminiInsights(brand, adData);
    
    // Step 3: Combine and return data
    const response = {
      brand_name: brand,
      ad_statistics: adData,
      ai_insights: geminiInsights,
      timestamp: new Date().toISOString()
    };
    
    return res.status(200).json(response);
    
  } catch (error) {
    console.error('Error:', error.message);
    return res.status(500).json({ 
      error: 'Failed to fetch brand data',
      message: error.message 
    });
  }
};

// Fetch brand ad statistics
function fetchBrandAds(brandName) {
  return new Promise((resolve, reject) => {
    const url = `https://api.brandbooster.ai/api/v1/research/brand-ads-count-public?brand_name=${encodeURIComponent(brandName)}`;
    
    https.get(url, (apiRes) => {
      const chunks = [];

      apiRes.on('data', (chunk) => chunks.push(chunk));

      apiRes.on('end', () => {
        const body = Buffer.concat(chunks).toString();
        
        try {
          const data = JSON.parse(body);
          
          if (apiRes.statusCode === 200 && data.total_ad_count !== undefined) {
            resolve({
              total_ads: data.total_ad_count || 0,
              active_ads: data.active_ad_count || 0,
              inactive_ads: data.inactive_ad_count || 0
            });
          } else {
            reject(new Error('Brand not found or no ad data available'));
          }
        } catch (error) {
          reject(new Error('Failed to parse brand data'));
        }
      });
    }).on('error', (error) => {
      reject(error);
    });
  });
}

// Get AI insights from Gemini API
function getGeminiInsights(brandName, adData) {
  return new Promise((resolve, reject) => {
    const geminiKey = process.env.GEMINI_API_KEY || 'AIzaSyAHY8-W3rmJzvARGUgTaZvFOFcLBCdNhU4';
    
    const prompt = `Provide a brief 2-3 sentence marketing insight about ${brandName} based on their advertising data: ${adData.total_ads} total ads, ${adData.active_ads} active, ${adData.inactive_ads} inactive. Focus on their marketing strategy and presence.`;
    
    const requestData = JSON.stringify({
      contents: [{
        parts: [{
          text: prompt
        }]
      }]
    });

    const options = {
      hostname: 'generativelanguage.googleapis.com',
      path: `/v1beta/models/gemini-pro:generateContent?key=${geminiKey}`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': requestData.length
      }
    };

    const apiReq = https.request(options, (apiRes) => {
      const chunks = [];

      apiRes.on('data', (chunk) => chunks.push(chunk));

      apiRes.on('end', () => {
        const body = Buffer.concat(chunks).toString();
        
        try {
          const data = JSON.parse(body);
          
          if (data.candidates && data.candidates[0]?.content?.parts[0]?.text) {
            resolve(data.candidates[0].content.parts[0].text);
          } else {
            // Fallback insight if Gemini API fails
            resolve(`${brandName} maintains a strong digital advertising presence with ${adData.total_ads.toLocaleString()} total ads. Their ${adData.active_ads.toLocaleString()} active campaigns demonstrate ongoing marketing efforts.`);
          }
        } catch (error) {
          // Fallback insight
          resolve(`${brandName} has ${adData.total_ads.toLocaleString()} total ads tracked.`);
        }
      });
    });

    apiReq.on('error', () => {
      // Fallback insight on error
      resolve(`${brandName} has ${adData.total_ads.toLocaleString()} ads with ${adData.active_ads.toLocaleString()} currently active.`);
    });

    apiReq.setTimeout(10000, () => {
      apiReq.destroy();
      resolve(`${brandName} advertising data: ${adData.total_ads.toLocaleString()} total ads.`);
    });

    apiReq.write(requestData);
    apiReq.end();
  });
}

