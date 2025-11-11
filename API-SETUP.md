# 🔑 Get Real Instagram Data - API Setup Guide

Your app is now configured to fetch **real Instagram data**. Here's how to get it working:

---

## 🚀 Quick Start (Use Your Own API Key)

The current API key in the code might be rate-limited. Get your own FREE key:

### Step 1: Sign up for RapidAPI
1. Go to [RapidAPI.com](https://rapidapi.com/auth/sign-up)
2. Sign up with Google/GitHub (takes 30 seconds)

### Step 2: Subscribe to Instagram Scraper API
1. Visit: [Instagram Scraper API v2](https://rapidapi.com/social-api1-instagram/api/instagram-scraper-api2)
2. Click **"Subscribe to Test"**
3. Choose **FREE plan** (500 requests/month free)
4. Copy your API key from the "Code Snippets" section

### Step 3: Update Your Code
In `index.html`, replace line 490:
```javascript
'x-rapidapi-key': 'YOUR_NEW_API_KEY_HERE'
```

---

## 🎯 Alternative Working APIs (2025)

If the above doesn't work, try these:

### Option A: Instagram Bulk Profile Scraper
- API: `https://rapidapi.com/DataCrawler/api/instagram-bulk-profile-scrapper`
- Free tier: 100 requests/month
- Very reliable

### Option B: Instagram API (unofficial)
- API: `https://rapidapi.com/maatootz/api/instagram-api-2021`
- Free tier: 50 requests/day
- Good for testing

### Option C: Insta Scraper API
- API: `https://rapidapi.com/Prasadbro/api/insta-scraper-api`
- Free tier: 500 requests/month

---

## 🛠️ Backend Solution (Most Reliable)

For production apps, use a **backend proxy**:

### Using Vercel Serverless Functions:

1. Create `api/instagram.js`:
```javascript
export default async function handler(req, res) {
  const { username } = req.query;
  
  try {
    const response = await fetch(`https://www.instagram.com/api/v1/users/web_profile_info/?username=${username}`, {
      headers: {
        'User-Agent': 'Instagram 76.0.0.15.395 Android',
        'X-IG-App-ID': '936619743392459'
      }
    });
    
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
}
```

2. Update your `index.html` to call:
```javascript
const response = await fetch(`/api/instagram?username=${cleanUsername}`);
```

---

## 🔐 Security Best Practices

1. **Never commit API keys to GitHub**
   - Add API keys to `.env` file
   - Add `.env` to `.gitignore`

2. **Use environment variables**
   ```javascript
   'x-rapidapi-key': process.env.RAPIDAPI_KEY
   ```

3. **Set up rate limiting**
   - Monitor your API usage
   - Implement caching

---

## ✅ Testing Your Setup

1. Open `test-api.html` in your browser
2. Click **"Test All Methods"**
3. Check if you get a 200 status code
4. Verify JSON data is returned

---

## 📊 Current Status

**Updated:** Your app now tries 3 methods:
1. ✅ **RapidAPI** (requires valid key)
2. ✅ **Instagram Direct** (no key needed, may be blocked)
3. ✅ **Demo Data** (always works as fallback)

---

## 🎓 Recommended Approach

**For Portfolio/Learning:**
- Use demo data (no API needed)
- Shows your UI/UX skills

**For Real Application:**
- Get RapidAPI free tier
- Later upgrade to Apify or build backend scraper

---

## 🆘 Need Help?

If you're still getting errors:
1. Check browser console (F12)
2. Look for the error message
3. Verify your API key is valid
4. Check API subscription status on RapidAPI

---

**Questions? Let me know!** 🚀

