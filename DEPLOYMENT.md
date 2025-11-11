# 🚀 Deploy to Vercel - Complete Guide

Your Instagram Profile Finder is now **production-ready** with a secure backend!

---

## ✅ What's Been Set Up

✔️ **Secure Backend API** (`/api/instagram`)
- API key is hidden from users
- Node.js serverless function
- Auto-scales with traffic

✔️ **Frontend** (`index.html`)
- Calls backend API (secure)
- Fallback to demo data
- Mobile responsive

✔️ **Vercel Configuration** (`vercel.json`)
- Optimized settings
- 10-second timeout
- 1GB memory

---

## 📦 **Deploy to Vercel (3 Methods)**

### **Method 1: Using Vercel CLI (Recommended)**

1. **Install Vercel CLI**
```bash
npm install -g vercel
```

2. **Login to Vercel**
```bash
vercel login
```

3. **Deploy from your project directory**
```bash
vercel
```

4. **Follow the prompts:**
   - Set up and deploy? **Y**
   - Which scope? Select your account
   - Link to existing project? **N**
   - Project name? **instagram-profile-finder** (or your choice)
   - Directory? **./** (just press Enter)
   - Override settings? **N**

5. **Set Environment Variable (Optional but recommended)**
```bash
vercel env add RAPIDAPI_KEY
```
Then paste your RapidAPI key when prompted.

6. **Deploy to Production**
```bash
vercel --prod
```

---

### **Method 2: Using GitHub + Vercel Dashboard**

1. **Push to GitHub**
```bash
git add .
git commit -m "Add backend API for Instagram data"
git push origin main
```

2. **Go to [vercel.com](https://vercel.com)**
   - Click **"Add New Project"**
   - Import your GitHub repository
   - Click **"Deploy"**

3. **Add Environment Variable** (after deployment)
   - Go to Project Settings → Environment Variables
   - Add: `RAPIDAPI_KEY` = `your_api_key_here`
   - Click **"Redeploy"** to apply changes

---

### **Method 3: Drag & Drop**

1. **Create a deployment package**
```bash
# Make sure you have all files
dir
```

2. **Go to [vercel.com/new](https://vercel.com/new)**
   - Drag and drop your project folder
   - Wait for deployment

3. **Add API Key via Dashboard**
   - Settings → Environment Variables
   - Add `RAPIDAPI_KEY`

---

## 🔑 **Setting Up Your API Key (Important!)**

### **Get a Free RapidAPI Key:**

1. Sign up at [RapidAPI.com](https://rapidapi.com/auth/sign-up)
2. Go to [Instagram API](https://rapidapi.com/maatootz/api/instagram-profile1)
3. Subscribe to **FREE tier**
4. Copy your API key

### **Add to Vercel:**

**Option A: Via CLI**
```bash
vercel env add RAPIDAPI_KEY production
# Paste your key when prompted
vercel --prod
```

**Option B: Via Dashboard**
1. Go to your project on vercel.com
2. Settings → Environment Variables
3. Add new variable:
   - Name: `RAPIDAPI_KEY`
   - Value: `your_actual_api_key_here`
   - Environment: Production
4. Click "Save"
5. Redeploy your app

---

## 🧪 **Test Your Deployment**

After deploying, test your app:

1. **Visit your Vercel URL** (e.g., `your-app.vercel.app`)
2. **Open Developer Console** (F12)
3. **Search for a profile** (e.g., "cristiano")
4. **Check the console** for:
   - ✅ `Backend API Response:` with data = **SUCCESS!**
   - ❌ Error messages = Check API key setup

---

## 📊 **Project Structure**

```
instagram-profile-finder/
├── api/
│   └── instagram.js          # Serverless backend API
├── index.html                 # Main frontend
├── test-api.html             # API testing tool
├── package.json              # Project config
├── vercel.json               # Vercel settings
├── .env.example              # Environment variables template
├── .gitignore                # Git ignore rules
├── README.md                 # Project documentation
├── DEPLOYMENT.md             # This file
└── API-SETUP.md              # API setup guide
```

---

## 🔒 **Security Features**

✅ **API Key Hidden** - Never exposed to users
✅ **CORS Enabled** - Works from any domain
✅ **Error Handling** - Graceful fallbacks
✅ **Environment Variables** - Secure configuration

---

## 🐛 **Troubleshooting**

### **Issue: "Failed to fetch profile"**
**Solution:**
- Check if you added `RAPIDAPI_KEY` to Vercel
- Verify your API key is valid on RapidAPI
- Check RapidAPI subscription is active

### **Issue: "Demo data" always shows**
**Solution:**
- API might be down or rate-limited
- Check browser console for actual error
- Try testing with `test-api.html`

### **Issue: "Function invocation failed"**
**Solution:**
- Make sure `api/instagram.js` is in the repo
- Check Vercel function logs
- Verify `vercel.json` is present

### **Issue: CORS errors**
**Solution:**
- Already handled in backend code
- If still occurring, check Vercel logs

---

## 📈 **Monitoring Your App**

**View Logs:**
```bash
vercel logs [deployment-url]
```

**Check Function Performance:**
- Go to Vercel Dashboard
- Select your project
- View Analytics tab

**Monitor API Usage:**
- Check RapidAPI Dashboard
- Watch for rate limits
- Upgrade plan if needed

---

## 🎯 **Next Steps**

1. ✅ Deploy to Vercel
2. ✅ Add your own API key
3. ✅ Test with real usernames
4. ✅ Share your app URL!

---

## 📞 **Need Help?**

- **Vercel Docs:** [vercel.com/docs](https://vercel.com/docs)
- **RapidAPI Support:** [rapidapi.com/support](https://rapidapi.com/support)
- **Test API:** Open `test-api.html` locally

---

## 🎉 **You're Ready!**

Your app is production-ready with:
- ✅ Secure backend
- ✅ Real Instagram data
- ✅ Demo fallback
- ✅ Mobile responsive
- ✅ Professional deployment

**Deploy now:**
```bash
vercel --prod
```

Good luck! 🚀

