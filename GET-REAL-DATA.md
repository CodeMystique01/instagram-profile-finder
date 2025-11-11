# 🔑 How to Get REAL Instagram Data Working

## 🚨 Current Issue

The shared API key is **not working** because:
- ❌ It's expired or out of credits
- ❌ It's rate-limited from too many requests
- ❌ The API subscription is invalid

**Error:** `{"error": true, "message": "Not Found, please check username"}`

---

## ✅ **SOLUTION: Get Your Own FREE API Key (Takes 3 Minutes)**

### Step 1: Sign Up for RapidAPI

1. Go to: **https://rapidapi.com/auth/sign-up**
2. Click **"Sign Up with Google"** or **"Sign Up with GitHub"**
3. Verify your email

---

### Step 2: Subscribe to Instagram API (FREE)

**Option A: Instagram Scraper API 2 (Recommended)**
1. Visit: https://rapidapi.com/social-api1-instagram/api/instagram-scraper-api2
2. Click **"Subscribe to Test"**
3. Choose **"Basic"** plan (FREE - 500 requests/month)
4. Click **"Subscribe"**

**Option B: Instagram Profile API**
1. Visit: https://rapidapi.com/maatootz/api/instagram-profile1
2. Click **"Subscribe to Test"**
3. Choose **"Basic"** plan (FREE)
4. Click **"Subscribe"**

---

### Step 3: Copy Your API Key

1. After subscribing, you'll see **"Code Snippets"** section
2. Look for **"X-RapidAPI-Key"**
3. Copy the value (looks like: `abc123xyz456...`)

Example:
```
X-RapidAPI-Key: abc123def456ghi789...
```

---

### Step 4: Add API Key to Your Project

#### **For Local Testing:**

Create a file called `.env` in your project root:

```bash
# .env file
RAPIDAPI_KEY=your_actual_api_key_here
```

Then update `api/instagram-v2.js` to load it:
```javascript
require('dotenv').config(); // Add this at the top

// In the headers section:
'x-rapidapi-key': process.env.RAPIDAPI_KEY
```

Install dotenv:
```bash
npm install dotenv
```

---

#### **For Vercel Deployment:**

**Method 1: Via CLI**
```bash
vercel env add RAPIDAPI_KEY
# Paste your API key when prompted
# Choose "Production"
vercel --prod
```

**Method 2: Via Dashboard**
1. Go to: https://vercel.com/dashboard
2. Select your project
3. Go to **Settings** → **Environment Variables**
4. Click **"Add New"**
5. Name: `RAPIDAPI_KEY`
6. Value: `your_actual_api_key_here`
7. Environment: **Production** (check the box)
8. Click **"Save"**
9. Go to **Deployments** → Click **"Redeploy"**

---

## 🧪 **Test Your New API Key**

### Test Directly with Node.js

Create a test file `test-my-key.js`:

```javascript
const https = require('https');

const options = {
  method: 'GET',
  hostname: 'instagram-scraper-api2.p.rapidapi.com',
  port: null,
  path: '/v1/info?username_or_id_or_url=cristiano',
  headers: {
    'x-rapidapi-key': 'YOUR_API_KEY_HERE', // Replace with your key
    'x-rapidapi-host': 'instagram-scraper-api2.p.rapidapi.com'
  }
};

const req = https.request(options, function (res) {
  const chunks = [];

  res.on('data', function (chunk) {
    chunks.push(chunk);
  });

  res.on('end', function () {
    const body = Buffer.concat(chunks);
    console.log('Status:', res.statusCode);
    console.log('Response:', JSON.parse(body.toString()));
  });
});

req.on('error', (e) => {
  console.error('Error:', e.message);
});

req.end();
```

Run it:
```bash
node test-my-key.js
```

**Expected Result:**
```json
{
  "status": "ok",
  "data": {
    "username": "cristiano",
    "full_name": "Cristiano Ronaldo",
    "follower_count": 612000000,
    ...
  }
}
```

---

## 📊 **API Comparison**

| API | Free Tier | Requests/Month | Reliability |
|-----|-----------|----------------|-------------|
| **Instagram Scraper API 2** | ✅ Yes | 500 | ⭐⭐⭐⭐⭐ |
| **Instagram Profile API** | ✅ Yes | 100 | ⭐⭐⭐ |
| **Instagram Bulk Scraper** | ✅ Yes | 100 | ⭐⭐⭐⭐ |

---

## 🚀 **Quick Setup Summary**

```bash
# 1. Get API key from RapidAPI
#    → Sign up at rapidapi.com
#    → Subscribe to Instagram API (free)
#    → Copy your API key

# 2. Test locally
echo "RAPIDAPI_KEY=your_key_here" > .env
npm install dotenv
node test-my-key.js

# 3. Deploy to Vercel
vercel env add RAPIDAPI_KEY
vercel --prod

# 4. Test your live app!
```

---

## 🔒 **Security Best Practices**

### ✅ DO:
- ✅ Store API key in environment variables
- ✅ Use backend API (already set up)
- ✅ Add `.env` to `.gitignore` (already done)
- ✅ Rotate keys if exposed
- ✅ Monitor usage on RapidAPI dashboard

### ❌ DON'T:
- ❌ Put API key directly in HTML/JavaScript
- ❌ Commit `.env` file to GitHub
- ❌ Share your API key publicly
- ❌ Use same key for multiple projects

---

## 🐛 **Troubleshooting**

### Still Getting Errors?

**1. Verify API Key is Correct**
```bash
# Test with curl
curl -X GET \
  'https://instagram-scraper-api2.p.rapidapi.com/v1/info?username_or_id_or_url=cristiano' \
  -H 'x-rapidapi-host: instagram-scraper-api2.p.rapidapi.com' \
  -H 'x-rapidapi-key: YOUR_KEY_HERE'
```

**2. Check RapidAPI Dashboard**
- Go to: https://rapidapi.com/dashboard
- Check **"My Subscriptions"**
- Verify you're subscribed
- Check remaining requests

**3. Check Vercel Environment Variables**
```bash
vercel env ls
```

Should show:
```
RAPIDAPI_KEY (Production)
```

**4. View Vercel Logs**
```bash
vercel logs --follow
```

Look for errors in the API function.

---

## 💰 **If You Need More Requests**

### Free Options (No Cost):
- Use demo data fallback (already implemented)
- Implement caching to reduce API calls
- Rate limit user searches (1 per 5 seconds)

### Paid Options:
- **RapidAPI Pro:** $9.99/month (10,000 requests)
- **Instagram Graph API:** Free but requires business account
- **Apify:** Pay-as-you-go scraping

---

## ✅ **Next Steps**

1. [ ] Sign up for RapidAPI
2. [ ] Subscribe to free Instagram API
3. [ ] Copy your API key
4. [ ] Add to Vercel environment variables
5. [ ] Redeploy your app
6. [ ] Test with real usernames
7. [ ] Enjoy real data! 🎉

---

## 🆘 **Still Need Help?**

**Email RapidAPI Support:**
- support@rapidapi.com

**Check API Status:**
- https://rapidapi.com/social-api1-instagram/api/instagram-scraper-api2/discussions

**Vercel Support:**
- https://vercel.com/support

---

**Remember:** The backend is already set up correctly using your HTTP format! You just need a valid API key. 🔑

**Expected time:** 3-5 minutes to get everything working! ⚡

