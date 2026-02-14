# Local Testing Guide

## Problem
When you run `npm start`, the Netlify functions don't work because React's dev server doesn't know about them.

## Solution: Use Netlify CLI

### Step 1: Install Netlify CLI
```bash
npm install -g netlify-cli
```

### Step 2: Make sure your .env file exists
Your `.env` file should be in the project root with:
```
COUNTER_API_KEY=your_actual_api_key_here
```

### Step 3: Run with Netlify Dev
Instead of `npm start`, use:
```bash
netlify dev
```

This will:
- Start your React app
- Run Netlify functions locally
- Load environment variables from .env
- Open at http://localhost:8888 (not 3000)

### Step 4: Test
1. Open http://localhost:8888
2. Check browser console for any errors
3. The counters should appear in bottom-right corner
4. Visit counter should increment automatically
5. Click the heart to test likes

## Alternative: Test on Netlify Directly

If you don't want to install Netlify CLI:

1. Push your code to GitHub
2. Deploy to Netlify
3. Add `COUNTER_API_KEY` to Netlify environment variables:
   - Go to Site settings → Environment variables
   - Add: Key = `COUNTER_API_KEY`, Value = your API key
4. Redeploy
5. Test on your live site

## Troubleshooting

### "netlify: command not found"
- Make sure you installed globally: `npm install -g netlify-cli`
- Restart your terminal after installation

### Counter still shows "---"
- Check browser console (F12) for errors
- Verify .env file is in project root (not in src/)
- Make sure API key is correct
- Check Network tab to see if function calls are failing

### Function returns 500 error
- API key might be invalid
- Check Netlify function logs
- Verify counter names match: `adarsh04-p-count` and `adarsh04-p-likes`

### Port 8888 already in use
```bash
netlify dev --port 9999
```
