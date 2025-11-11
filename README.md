# Instagram Profile Finder

A beautiful, modern web application to fetch and display Instagram profile information using the Instagram Profile API.

## Features

- 🎨 Beautiful gradient UI with smooth animations
- 📱 Fully responsive design (works on all devices)
- 🔍 Search Instagram profiles by username
- 📊 Display profile statistics (posts, followers, following)
- 🖼️ Show profile picture and biography
- ⚡ Fast and lightweight (no dependencies)
- 🔗 Direct link to Instagram profile

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

## Quick Start

### Option 1: Double-click the file
Simply double-click `index.html` to open it in your default browser.

### Option 2: Use a local server (recommended for development)
```bash
# Using Python 3
python -m http.server 8000

# Using Node.js (if you have http-server installed)
npx http-server

# Using PHP
php -S localhost:8000
```

Then open your browser and go to `http://localhost:8000`

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

