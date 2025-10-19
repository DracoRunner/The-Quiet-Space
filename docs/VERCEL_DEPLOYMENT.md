# Vercel Deployment Guide - API Configuration

## The Problem
When deploying to Vercel, server-side rendering (SSR) tries to fetch from `localhost:3000`, which doesn't exist in production, causing:
```
Error: connect ECONNREFUSED 127.0.0.1:3000
```

## The Solution
Use Vercel's built-in environment variables to automatically detect the deployment URL.

## How It Works

### `getBaseUrl()` Function
The service layer now automatically detects the correct URL:

```typescript
function getBaseUrl(): string {
  // Browser - use relative URL
  if (typeof window !== "undefined") return "";
  
  // Vercel - use VERCEL_URL (automatically set by Vercel)
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  
  // Custom deployment URL
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL;
  }
  
  // Local development
  return `http://localhost:${process.env.PORT || 3000}`;
}
```

## Environment Variables

### Vercel (Automatic)
Vercel automatically provides:
- `VERCEL_URL` - Your deployment URL (e.g., `your-app-abc123.vercel.app`)
- No configuration needed! ✅

### Local Development
In `.env.local`:
```bash
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### Custom Domain (Optional)
If you have a custom domain, add to Vercel environment variables:
```bash
NEXT_PUBLIC_SITE_URL=https://your-custom-domain.com
```

## How to Deploy to Vercel

### 1. Push your code to GitHub
```bash
git add .
git commit -m "Fix API calls for Vercel deployment"
git push
```

### 2. Deploy on Vercel
1. Go to [vercel.com](https://vercel.com)
2. Click "Import Project"
3. Select your GitHub repository
4. Click "Deploy"

### 3. Verify it works
- Vercel will automatically use `VERCEL_URL`
- Check the logs to see the API calls working
- Visit `/blogs` page to test

## Debugging

### Check Logs on Vercel
1. Go to your project on Vercel
2. Click "Deployments"
3. Click on the latest deployment
4. Click "Functions" tab
5. See the console.log output

### What You'll See
```
🔍 [Service/Server] Fetching blogs from: https://your-app.vercel.app/api/blogs
✅ [Service/Server] Fetched 3 blogs (45ms)
```

### Common Issues

#### Issue: Still seeing localhost errors
**Solution:** Make sure you've pushed the latest code and redeployed

#### Issue: API returns 404
**Solution:** Check that your API routes are in `/app/api/blogs/`

#### Issue: CORS errors
**Solution:** This setup doesn't have CORS issues because we use same-origin requests

## Environment Priority

The URL is selected in this order:
1. **Browser**: Always use relative URL (`/api/blogs`)
2. **Vercel**: Use `VERCEL_URL` environment variable
3. **Custom**: Use `NEXT_PUBLIC_SITE_URL` if set
4. **Local Dev**: Default to `http://localhost:3000`

## Testing Locally

### Test the build
```bash
pnpm build
pnpm start
```

### Test with production URL
```bash
# In .env.local
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Run production build
pnpm build && pnpm start
```

## API Endpoints Available

### GET /api/blogs
Returns all blogs
```bash
curl https://your-app.vercel.app/api/blogs
```

### GET /api/blogs/:id
Returns single blog
```bash
curl https://your-app.vercel.app/api/blogs/1
```

## Benefits

✅ **Automatic** - Works on Vercel without configuration
✅ **Flexible** - Works in development and production
✅ **No hardcoding** - No localhost URLs in production
✅ **Debugging** - Full logging to track API calls
✅ **Client & Server** - Works for both SSR and client-side

## Quick Deploy Checklist

- [ ] Code pushed to GitHub
- [ ] `getBaseUrl()` function uses `VERCEL_URL`
- [ ] API routes marked with `export const dynamic = "force-dynamic"`
- [ ] Pages using API marked with `export const dynamic = "force-dynamic"`
- [ ] Test build locally: `pnpm build`
- [ ] Deploy to Vercel
- [ ] Check Vercel logs for successful API calls
- [ ] Test the `/blogs` page on your deployed URL

## No Configuration Needed! 🎉

Just push and deploy - Vercel handles the rest automatically using `VERCEL_URL`.
