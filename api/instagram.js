const https = require('https');

module.exports = async (req, res) => {
  // Enable CORS
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

  console.log('Fetching Instagram profile for:', username);

  // Try to fetch Instagram profile
  const options = {
    hostname: 'www.instagram.com',
    path: `/api/v1/users/web_profile_info/?username=${username}`,
    method: 'GET',
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'X-IG-App-ID': '936619743392459',
      'Accept': 'application/json',
      'Accept-Language': 'en-US,en;q=0.9',
      'Referer': 'https://www.instagram.com/',
      'Sec-Fetch-Dest': 'empty',
      'Sec-Fetch-Mode': 'cors',
      'Sec-Fetch-Site': 'same-origin'
    }
  };

  return new Promise((resolve) => {
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
            const result = {
              username: user.username,
              full_name: user.full_name,
              profile_pic_url: user.profile_pic_url,
              profile_pic_url_hd: user.profile_pic_url_hd,
              biography: user.biography,
              edge_followed_by: user.edge_followed_by,
              edge_follow: user.edge_follow,
              edge_owner_to_timeline_media: user.edge_owner_to_timeline_media
            };
            
            console.log('Successfully fetched profile:', user.username);
            res.status(200).json(result);
            resolve();
          } else {
            console.log('Profile not found, using fallback');
            // Return fallback data
            res.status(200).json({
              username: username,
              full_name: username.charAt(0).toUpperCase() + username.slice(1),
              profile_pic_url: `https://ui-avatars.com/api/?name=${username}&size=150&background=667eea&color=fff`,
              profile_pic_url_hd: `https://ui-avatars.com/api/?name=${username}&size=300&background=667eea&color=fff`,
              biography: '',
              edge_followed_by: { count: 0 },
              edge_follow: { count: 0 },
              edge_owner_to_timeline_media: { count: 0 }
            });
            resolve();
          }
        } catch (error) {
          console.error('Parse error:', error);
          // Return fallback
          res.status(200).json({
            username: username,
            full_name: username.charAt(0).toUpperCase() + username.slice(1),
            profile_pic_url: `https://ui-avatars.com/api/?name=${username}&size=150&background=667eea&color=fff`,
            profile_pic_url_hd: `https://ui-avatars.com/api/?name=${username}&size=300&background=667eea&color=fff`,
            biography: '',
            edge_followed_by: { count: 0 },
            edge_follow: { count: 0 },
            edge_owner_to_timeline_media: { count: 0 }
          });
          resolve();
        }
      });
    });

    request.on('error', (error) => {
      console.error('Request error:', error);
      res.status(200).json({
        username: username,
        full_name: username.charAt(0).toUpperCase() + username.slice(1),
        profile_pic_url: `https://ui-avatars.com/api/?name=${username}&size=150&background=667eea&color=fff`,
        profile_pic_url_hd: `https://ui-avatars.com/api/?name=${username}&size=300&background=667eea&color=fff`,
        biography: '',
        edge_followed_by: { count: 0 },
        edge_follow: { count: 0 },
        edge_owner_to_timeline_media: { count: 0 }
      });
      resolve();
    });

    request.setTimeout(10000, () => {
      request.destroy();
      res.status(200).json({
        username: username,
        full_name: username.charAt(0).toUpperCase() + username.slice(1),
        profile_pic_url: `https://ui-avatars.com/api/?name=${username}&size=150&background=667eea&color=fff`,
        profile_pic_url_hd: `https://ui-avatars.com/api/?name=${username}&size=300&background=667eea&color=fff`,
        biography: '',
        edge_followed_by: { count: 0 },
        edge_follow: { count: 0 },
        edge_owner_to_timeline_media: { count: 0 }
      });
      resolve();
    });

    request.end();
  });
};

