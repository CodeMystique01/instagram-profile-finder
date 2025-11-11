# 🔑 Use Your Paid RapidAPI Key

Since you have a **paid subscription**, let's get your API key and make it work!

---

## Step 1: Get Your API Key from RapidAPI

### Option A: From API Page
1. Go to your subscribed Instagram API on RapidAPI
2. Look for **"Code Snippets"** section
3. Select any language (e.g., "Node.js" or "HTTP")
4. Find the line with **`X-RapidAPI-Key`**
5. Copy the full key value

Example:
```
X-RapidAPI-Key: abc123def456ghi789jkl012mno345pqr678
```

### Option B: From Dashboard
1. Go to: https://rapidapi.com/dashboard
2. Click **"My Subscriptions"**
3. Click on your Instagram API subscription
4. Click **"Test Endpoint"**
5. Copy the **X-RapidAPI-Key** value

---

## Step 2: Test Your Key Locally

Create a file `test-my-api.js`:

```javascript
const https = require('https');

// REPLACE WITH YOUR ACTUAL KEY
const YOUR_API_KEY = 'paste_your_key_here';

const options = {
  method: 'GET',
  hostname: 'instagram-profile1.p.rapidapi.com',
  path: '/getprofile/cristiano',
  headers: {
    'x-rapidapi-key': YOUR_API_KEY,
    'x-rapidapi-host': 'instagram-profile1.p.rapidapi.com'
  }
};

console.log('Testing your API key...\n');

const req = https.request(options, function (res) {
  const chunks = [];
  
  res.on('data', function (chunk) {
    chunks.push(chunk);
  });
  
  res.on('end', function () {
    const body = Buffer.concat(chunks).toString();
    console.log('Status Code:', res.statusCode);
    console.log('\nResponse:');
    
    try {
      const data = JSON.parse(body);
      console.log(JSON.stringify(data, null, 2));
      
      if (data.username && !data.error) {
        console.log('\n✅ SUCCESS! Your API key is working!\n');
      } else {
        console.log('\n❌ ERROR:', data.message || 'Unknown error\n');
      }
    } catch (e) {
      console.log(body);
    }
  });
});

req.on('error', function (error) {
  console.error('❌ Request Error:', error.message);
});

req.end();
```

Run it:
```bash
node test-my-api.js
```

---

## Step 3: Add Your Key to the Project

### For Local Testing:

Create `.env` file in your project root:
```bash
RAPIDAPI_KEY=your_actual_key_here
```

Install dotenv:
```bash
npm install dotenv
```

Update `api/instagram-v2.js` (add this at the very top):
```javascript
require('dotenv').config();
```

Test locally:
```bash
npm start
```

---

### For Vercel Deployment:

**Method 1: Using CLI (Fastest)**
```bash
vercel env add RAPIDAPI_KEY

# When prompted:
# - What's the value? [paste your API key]
# - Add to which environments? [select Production and Preview]

vercel --prod
```

**Method 2: Using Dashboard**
1. Go to: https://vercel.com/dashboard
2. Select your project (or import from GitHub)
3. Go to **Settings** → **Environment Variables**
4. Click **"Add New"**
5. Fill in:
   - **Name:** `RAPIDAPI_KEY`
   - **Value:** [paste your actual API key]
   - **Environments:** Check ✅ Production, ✅ Preview, ✅ Development
6. Click **"Save"**
7. Go to **Deployments** tab
8. Click the ⋯ menu on latest deployment
9. Click **"Redeploy"**

---

## Step 4: Deploy & Test

```bash
vercel --prod
```

Visit your Vercel URL and search for "cristiano" - you should see REAL data!

---

## ✅ What Should Work

With your paid subscription, you should get:
- ✅ Real Instagram profile data
- ✅ No rate limits (depends on your plan)
- ✅ Reliable responses
- ✅ All features working

---

## 🔍 Troubleshooting

### If you still get errors:

**1. Check which API you're subscribed to:**
- Instagram Profile API?
- Instagram Scraper API 2?
- Instagram Bulk Scraper?
- Other?

**2. Check your subscription status:**
- Go to: https://rapidapi.com/dashboard/subscriptions
- Make sure it's active
- Check your usage/quota

**3. Make sure you're using the right endpoint:**

Update `api/instagram-v2.js` to match your subscription:

```javascript
// If you're subscribed to "instagram-profile1"
const API_ENDPOINTS = [
  {
    name: 'instagram-profile1',
    hostname: 'instagram-profile1.p.rapidapi.com',
    path: (username) => `/getprofile/${username}`,
    transformResponse: (data) => data
  }
];

// If you're subscribed to "instagram-scraper-api2"  
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
  }
];
```

---

## 📞 Need My Help?

Tell me:
1. **Which Instagram API are you subscribed to?** (name from RapidAPI)
2. **What error are you seeing?** (from browser console)
3. **Have you added your key to Vercel?** (yes/no)

I'll help you get it working immediately!

