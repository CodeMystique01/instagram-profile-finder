# 🚀 How to Run Your App (Fix CORS Issues)

## ⚠️ **The Problem:**

When you open `index.html` directly as a file (`file:///C:/...`), Instagram API is blocked by **CORS policy**.

This is why you see:
```
❌ Access to fetch at 'https://www.instagram.com/...' blocked by CORS policy
❌ Instagram profile name: Amazondotin (fallback, not real data)
❌ BrandBooster search: "Amazondotin" → 0 ads
```

## ✅ **The Solution: Use Local Server**

You must run the app on a **local web server** (`http://localhost:...`) to avoid CORS issues.

---

## 🚀 **Method 1: Python HTTP Server (Easiest)**

### Start Server:
```bash
# Open PowerShell in your project folder
cd C:\Users\aadit\instagram-profile-finder

# Start server
python -m http.server 8000
```

### Open Browser:
```
http://localhost:8000/index.html
```

**Server is now running!** Keep the PowerShell window open.

---

## 🚀 **Method 2: Node.js HTTP Server**

### Start Server:
```bash
# Install http-server globally (first time only)
npm install -g http-server

# Start server
http-server -p 8000
```

### Open Browser:
```
http://localhost:8000/index.html
```

---

## 🚀 **Method 3: VS Code Live Server**

1. Install **"Live Server"** extension in VS Code
2. Right-click `index.html`
3. Select **"Open with Live Server"**
4. Opens at `http://127.0.0.1:5500/index.html`

---

## 🧪 **Test It Works:**

Once running on `http://localhost:...`:

1. Search for: **amazondotin**
2. Check Console (F12)
3. You should see:

```
✅ Instagram profile name: Amazon India  ← REAL DATA!
✅ Fetching ad data for: Amazon India
✅ Total ads: 540  ← SUCCESS!
```

---

## 📊 **Why This Fixes It:**

| Running As | Instagram API | Result |
|-----------|---------------|--------|
| `file:///` | ❌ Blocked by CORS | Uses fallback "Amazondotin" → 0 ads |
| `http://localhost:8000` | ✅ Works! | Gets "Amazon India" → 540 ads |

---

## 🎯 **I Started the Server for You!**

**Server is running at:** `http://localhost:8000`

**A browser should have opened automatically!**

Now try searching for **amazondotin** and it should work! 🎉

---

## 🛑 **To Stop the Server:**

Press `Ctrl + C` in the PowerShell window where server is running.

---

## 🚀 **For Production (No Server Needed):**

Deploy to Vercel:
```bash
vercel --prod
```

On Vercel, CORS issues are automatically handled and your app will work perfectly!

---

**Try it now at http://localhost:8000/index.html!** 🎊

