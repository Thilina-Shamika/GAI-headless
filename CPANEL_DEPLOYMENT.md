# cPanel Deployment Guide for Next.js Application

## Prerequisites

- Node.js 18+ enabled in cPanel
- Git repository with your code
- cPanel 130.0.14 or higher

## Step 1: Prepare Your Repository

### 1.1 Commit All Changes
```bash
git add .
git commit -m "Prepare for cPanel deployment"
git push origin main
```

### 1.2 Ensure .cpanel.yml Exists
The `.cpanel.yml` file is already created in your project root with the correct configuration.

## Step 2: Configure cPanel Node.js

### 2.1 Access Node.js Settings
1. Log into your cPanel
2. Go to **Software** → **Node.js**
3. Create a new Node.js application

### 2.2 Application Settings
- **Node.js Version:** 18.x or higher
- **Application Mode:** production
- **Application Root:** `/` (root of public_html)
- **Application Startup File:** `server.js`
- **Application URL:** Your domain (e.g., `https://yourdomain.com`)

### 2.3 Environment Variables
Set these in cPanel Node.js environment variables:
```
NODE_ENV=production
PORT=3000
NEXT_PUBLIC_SITE_URL=https://your-domain.com
WP_GRAPHQL_ENDPOINT=your-wordpress-graphql-endpoint
WP_REST_BASE=your-wordpress-rest-endpoint
WP_HEADER_URL=your-header-api-endpoint
WP_SERVICES_URL=your-services-api-endpoint
WP_MEDIA_HOSTS=your-media-hosts
```

## Step 3: Deploy via Git

### 3.1 Connect Git Repository
1. In cPanel, go to **Git Version Control**
2. Add your repository
3. Set deployment branch to `main`

### 3.2 Deploy
1. Click **Deploy** in Git Version Control
2. cPanel will automatically:
   - Pull your latest code
   - Run the deployment tasks from `.cpanel.yml`
   - Build your Next.js application
   - Set up the Node.js application

## Step 4: Verify Deployment

### 4.1 Check Application Status
1. Go to **Node.js** in cPanel
2. Verify your application is running
3. Check the logs for any errors

### 4.2 Test Your Website
1. Visit your domain
2. Ensure all pages load correctly
3. Check that images and assets are working

## Troubleshooting

### Common Issues

1. **"No uncommitted changes" error:**
   ```bash
   git add .
   git commit -m "Deploy to cPanel"
   git push origin main
   ```

2. **Build failures:**
   - Check Node.js version (should be 18+)
   - Verify all dependencies in package.json
   - Check cPanel Node.js logs

3. **Port conflicts:**
   - Ensure PORT=3000 in environment variables
   - Check if another app is using port 3000

4. **File permission errors:**
   - The .cpanel.yml file sets correct permissions automatically
   - If issues persist, manually set permissions in cPanel File Manager

### Environment Variables Issues

If your WordPress API endpoints aren't working:
1. Double-check all environment variables in cPanel Node.js settings
2. Ensure URLs are correct and accessible
3. Test API endpoints manually

### Build Process Issues

If the build fails:
1. Check cPanel Node.js logs
2. Verify all dependencies are in package.json
3. Ensure Next.js configuration is correct

## File Structure After Deployment

```
/public_html/
├── server.js          ← Main application file
├── package.json       ← Dependencies
├── node_modules/      ← Dependencies
├── .next/            ← Build output
│   ├── standalone/
│   └── static/
├── public/           ← Static assets
└── .cpanel.yml       ← Deployment configuration
```

## Success Checklist

- [ ] Repository has no uncommitted changes
- [ ] .cpanel.yml file exists and is valid
- [ ] Node.js application created in cPanel
- [ ] Environment variables set correctly
- [ ] Git deployment successful
- [ ] Application running on port 3000
- [ ] Website accessible via browser
- [ ] All pages and assets loading correctly

## Support

If you encounter issues:
1. Check cPanel Node.js logs
2. Verify Git deployment logs
3. Ensure all environment variables are set
4. Test locally first with `npm run build && npm start`
