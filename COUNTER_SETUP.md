# Portfolio Counter Setup Guide

## What's Implemented

Your portfolio now has:
- **Global Visit Counter**: Tracks every time someone opens your portfolio
- **Like System**: Visitors can like your portfolio (once per browser)
- **Secure API**: Your CounterAPI key is hidden on the server side

## Setup Steps

### 1. Get Your CounterAPI Key
1. Go to https://counterapi.dev/signup
2. Create an account
3. Generate an API key from your dashboard
4. Copy the API key

### 2. Configure Locally (for testing)
1. Create a `.env` file in your project root:
   ```bash
   COUNTER_API_KEY=your_actual_api_key_here
   ```
2. The `.env` file is already in `.gitignore` so it won't be committed

### 3. Deploy to Netlify
1. Go to your Netlify dashboard
2. Select your site
3. Go to **Site settings** → **Environment variables**
4. Add a new variable:
   - **Key**: `COUNTER_API_KEY`
   - **Value**: Your actual API key from CounterAPI
5. Save and redeploy your site

### 4. Initialize Your Counters (Optional)
If you want to start with specific values instead of 0:

Visit these URLs in your browser (replace `YOUR_API_KEY`):
```
https://api.counterapi.dev/v2/adarsh-portfolio/adarsh04-p-count/reset?value=0
https://api.counterapi.dev/v2/adarsh-portfolio/adarsh04-p-likes/reset?value=0
```

Add header: `Authorization: Bearer YOUR_API_KEY`

## How It Works

### Architecture
```
Frontend (React) 
    ↓
Netlify Function (/.netlify/functions/counter)
    ↓ (API key hidden here)
CounterAPI V2
```

### Files Created
- `netlify/functions/counter.js` - Serverless function (keeps API key secure)
- `src/components/PortfolioCounter.js` - UI component
- `.env.example` - Template for environment variables

### API Endpoints
Your frontend calls:
- `/.netlify/functions/counter?action=up&counter=adarsh04-p-count` - Increment visits
- `/.netlify/functions/counter?action=up&counter=adarsh04-p-likes` - Increment likes
- `/.netlify/functions/counter?action=get&counter=adarsh04-p-likes` - Get like count

## Features

✅ **Secure**: API key never exposed to frontend
✅ **Global**: Counts all visitors across all devices
✅ **Persistent**: Uses localStorage to prevent duplicate likes
✅ **Real-time**: Updates immediately
✅ **Styled**: Matches your portfolio's cyberpunk theme
✅ **Fixed Position**: Bottom-right corner, always visible

## Customization

### Change Position
Edit `src/components/PortfolioCounter.js`:
```javascript
// Change from bottom-right to bottom-left
className="fixed bottom-8 left-8 z-50..."
```

### Change Workspace Name
Edit `netlify/functions/counter.js`:
```javascript
const WORKSPACE = 'your-new-workspace-name';
```

### Add More Counters
Just add more counter names in your API calls:
```javascript
fetch('/.netlify/functions/counter?action=up&counter=downloads')
```

## Testing Locally

1. Install Netlify CLI:
   ```bash
   npm install -g netlify-cli
   ```

2. Run locally:
   ```bash
   netlify dev
   ```

3. Your site will run at `http://localhost:8888` with functions working

## Troubleshooting

**Counter not updating?**
- Check browser console for errors
- Verify API key is set in Netlify environment variables
- Check Netlify function logs in dashboard

**"API key not configured" error?**
- Make sure you added `COUNTER_API_KEY` to Netlify environment variables
- Redeploy after adding the variable

**Counter shows "---"?**
- API might be rate-limited (600 req/min limit)
- Check network tab for failed requests
- Verify your CounterAPI account is active

## Rate Limits

CounterAPI V2: **600 requests per minute per URL path**

This is more than enough for a portfolio site!
