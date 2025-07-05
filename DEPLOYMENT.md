# Vercel Deployment Guide for SmartAlert

## Changes Made for Vercel Deployment

### 1. Vite Configuration (vite.config.js)

- Set `base: '/'` for root deployment
- Added build optimizations with chunk splitting
- Added `define: { global: 'globalThis' }` for better browser compatibility
- Configured manual chunks for better performance

### 2. App.jsx Routing

- Removed `basename="/smartalert"` from BrowserRouter
- Routes now work from the root path

### 3. Package.json

- Removed the `homepage` field that was conflicting with deployment

## Deployment Steps

### 1. Environment Variables

Before deploying, make sure to set up your environment variables in Vercel:

- `VITE_FACEBOOK_APP_ID` - Your Facebook App ID
- Add any other environment variables your app needs

### 2. Deploy to Vercel

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)
2. Go to [vercel.com](https://vercel.com) and sign in
3. Click "New Project" and import your repository
4. Vercel will automatically detect it's a Vite project
5. Set your environment variables in the Vercel dashboard
6. Deploy!

### 3. Custom Domain (Optional)

If you want to use a custom domain:

1. Go to your project settings in Vercel
2. Navigate to "Domains"
3. Add your custom domain
4. Update your DNS settings as instructed

## Important Notes

### Build Command

Vercel will automatically use: `npm run build`

### Output Directory

The build outputs to `dist/` folder (already configured)

### Routing

The `vercel.json` file ensures all routes are handled by React Router:

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/"
    }
  ]
}
```

### Environment Variables

- All environment variables must start with `VITE_` to be accessible in your React app
- Set them in Vercel dashboard under Project Settings > Environment Variables

## Troubleshooting

### Build Errors

If you get build errors:

1. Test locally with `npm run build`
2. Check console for specific errors
3. Ensure all imports are correct
4. Verify environment variables are set

### Routing Issues

If routes don't work after deployment:

- Ensure `vercel.json` is in the root directory
- Check that BrowserRouter doesn't have a basename

### Performance

- The build includes automatic code splitting
- Large dependencies are separated into chunks
- CSS is optimized and compressed

## Local Testing

Before deploying, test your build locally:

```bash
npm run build
npm run preview
```

This will serve your production build locally on port 3000.
