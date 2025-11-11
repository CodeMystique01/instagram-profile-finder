// Simple local test server for the Instagram API
// Run with: node test-local.js

const http = require('http');
const url = require('url');
const instagramAPI = require('./api/instagram-v2');

const PORT = 3000;

const server = http.createServer(async (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  
  // Serve index.html
  if (parsedUrl.pathname === '/' || parsedUrl.pathname === '/index.html') {
    const fs = require('fs');
    const html = fs.readFileSync('./index.html', 'utf8');
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(html);
    return;
  }
  
  // Handle API request
  if (parsedUrl.pathname === '/api/instagram' || parsedUrl.pathname === '/api/instagram-v2') {
    const mockReq = {
      method: req.method,
      query: parsedUrl.query
    };
    
    const mockRes = {
      setHeader: (key, value) => res.setHeader(key, value),
      status: (code) => {
        res.statusCode = code;
        return mockRes;
      },
      json: (data) => {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(data));
      },
      send: (data) => {
        res.end(data);
      },
      end: () => res.end()
    };
    
    await instagramAPI(mockReq, mockRes);
    return;
  }
  
  // 404 for other routes
  res.writeHead(404);
  res.end('Not found');
});

server.listen(PORT, () => {
  console.log(`\n🚀 Local test server running!`);
  console.log(`📱 Open: http://localhost:${PORT}`);
  console.log(`🔍 API: http://localhost:${PORT}/api/instagram?username=cristiano`);
  console.log(`\n✅ Test your app before deploying to Vercel\n`);
});

