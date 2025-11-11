// Test YOUR RapidAPI Key
// Instructions:
// 1. Get your key from: https://rapidapi.com/developer/dashboard
// 2. Replace 'YOUR_KEY_HERE' below with your actual key
// 3. Run: node test-my-rapidapi-key.js

const https = require('https');
require('dotenv').config();

// Get key from .env file or replace here
const YOUR_API_KEY = process.env.RAPIDAPI_KEY || 'YOUR_KEY_HERE';

console.log('\n🔑 Testing RapidAPI Key...\n');
console.log('Key:', YOUR_API_KEY.substring(0, 20) + '...\n');

// Test with Instagram Scraper API 2
const options = {
  method: 'GET',
  hostname: 'instagram-scraper-api2.p.rapidapi.com',
  port: null,
  path: '/v1/info?username_or_id_or_url=cristiano',
  headers: {
    'x-rapidapi-key': YOUR_API_KEY,
    'x-rapidapi-host': 'instagram-scraper-api2.p.rapidapi.com'
  }
};

console.log('📡 Testing endpoint: instagram-scraper-api2\n');

const req = https.request(options, function (res) {
  const chunks = [];

  res.on('data', function (chunk) {
    chunks.push(chunk);
  });

  res.on('end', function () {
    const body = Buffer.concat(chunks);
    const response = body.toString();
    
    console.log('📊 Status Code:', res.statusCode);
    console.log('─'.repeat(60));
    
    try {
      const data = JSON.parse(response);
      
      if (res.statusCode === 200 && data.data && data.data.username) {
        console.log('✅ SUCCESS! Your API key is working!\n');
        console.log('Profile Found:');
        console.log('  Username:', data.data.username);
        console.log('  Full Name:', data.data.full_name);
        console.log('  Followers:', data.data.follower_count?.toLocaleString());
        console.log('  Following:', data.data.following_count?.toLocaleString());
        console.log('  Posts:', data.data.media_count?.toLocaleString());
        console.log('\n🎉 Your app will now show REAL DATA!\n');
      } else if (res.statusCode === 403) {
        console.log('❌ ERROR: API Key is invalid or not authorized\n');
        console.log('Solutions:');
        console.log('  1. Check your key at: https://rapidapi.com/developer/dashboard');
        console.log('  2. Make sure you\'re subscribed to the Instagram API');
        console.log('  3. Copy the correct key from "My Apps" section\n');
      } else if (res.statusCode === 429) {
        console.log('⚠️  ERROR: Rate limit exceeded\n');
        console.log('Solutions:');
        console.log('  1. Wait a few minutes and try again');
        console.log('  2. Check your quota at: https://rapidapi.com/developer/billing');
        console.log('  3. Upgrade your plan if needed\n');
      } else {
        console.log('⚠️  Response:', response.substring(0, 300));
        console.log('\nCheck your RapidAPI dashboard for more details.\n');
      }
    } catch (error) {
      console.log('❌ Failed to parse response:', response.substring(0, 200));
    }
  });
});

req.on('error', function (error) {
  console.error('❌ Request Error:', error.message);
  console.log('\nCheck your internet connection and try again.\n');
});

req.setTimeout(15000, () => {
  console.log('❌ Request timed out after 15 seconds\n');
  req.destroy();
});

req.end();

