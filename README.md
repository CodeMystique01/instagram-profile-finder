# 📸 Instagram Profile Finder

A modern, secure web app to search and view Instagram profiles with **real-time data** using a Node.js backend API.

## 🎯 Live Demo

Try it now: [Your Vercel URL here after deployment]

## 🏗️ Architecture

```
┌─────────────────┐
│   Frontend      │
│  (index.html)   │
└────────┬────────┘
         │
         │ fetch('/api/instagram')
         │
         ▼
┌─────────────────┐
│  Vercel API     │
│ (/api/instagram)│ ← Secure backend
└────────┬────────┘
         │
         │ HTTPS + API Key
         │
         ▼
┌─────────────────┐
│   RapidAPI      │
│  Instagram API  │
└─────────────────┘
```

**Benefits:**
- ✅ API key stays secure on server
- ✅ No CORS issues
- ✅ Easy to deploy
- ✅ Auto-scales

## ✨ Features

- 🎨 **Beautiful UI** - Gradient design with smooth animations
- 📱 **Fully Responsive** - Works on all devices
- 🔒 **Secure Backend** - API key hidden from users
- 🔍 **Real Data** - Fetches live Instagram profiles
- 📊 **Profile Stats** - Posts, followers, following counts
- 🖼️ **Profile Display** - Picture, bio, and more
- ⚡ **Fast & Modern** - Serverless backend
- 🎯 **Demo Fallback** - Works even if API is down
- 🔗 **Direct Links** - View profiles on Instagram

## How to Use

1. **Open the website**: Simply open `index.html` in your web browser
2. **Enter username**: Type any Instagram username (e.g., "therock")
3. **Click Search**: Hit the search button or press Enter
4. **View results**: See the profile details including:
   - Profile picture
   - Full name
   - Username
   - Post count
   - Followers count
   - Following count
   - Biography
   - Link to view on Instagram

## 🚀 Quick Start

### Test Locally (with backend API)
```bash
# Install Node.js if you haven't already, then:
npm start
# or
node test-local.js
```

Then open `http://localhost:3000` in your browser.

### Deploy to Vercel (Production)
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Deploy to production
vercel --prod
```

See **[DEPLOYMENT.md](DEPLOYMENT.md)** for detailed deployment instructions.

## API Information

This website uses the Instagram Profile API from RapidAPI:
- **Endpoint**: `https://instagram-profile1.p.rapidapi.com/getprofile/{username}`
- **Method**: GET
- **Headers Required**:
  - `x-rapidapi-host`: instagram-profile1.p.rapidapi.com
  - `x-rapidapi-key`: Your API key

**Note**: The API key included is for demonstration purposes. For production use, please get your own API key from [RapidAPI](https://rapidapi.com/).

## Technologies Used

- HTML5
- CSS3 (with animations and gradients)
- Vanilla JavaScript (ES6+)
- Fetch API for HTTP requests

## Browser Support

- ✅ Chrome (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Opera

## Features Breakdown

### UI/UX
- Gradient purple background
- Card-based design with shadow effects
- Smooth slide-up and fade-in animations
- Loading spinner during API calls
- Error messages with shake animation
- Hover effects on buttons and links

### Functionality
- Input validation
- Automatic @ symbol removal
- Number formatting (1.5M, 500K, etc.)
- Error handling for failed requests
- Keyboard support (Enter to search)
- Disabled button during loading

## Troubleshooting

**Profile not found?**
- Make sure the username is correct
- Try without the @ symbol
- Check if the Instagram account is public

**API not working?**
- Check your internet connection
- Verify the API key is valid
- Check if you've exceeded API rate limits

**Page not loading?**
- Make sure JavaScript is enabled in your browser
- Try opening in a different browser
- Check browser console for errors (F12)

## License

This project is free to use for personal and educational purposes.

## Credits

Built with ❤️ using modern web technologies and the Instagram Profile API.

