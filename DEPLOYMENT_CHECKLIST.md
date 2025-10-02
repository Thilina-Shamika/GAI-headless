# Plesk Deployment Checklist

## ✅ Pre-Deployment Steps

1. **Build Successfully Completed** ✅

   - Application builds without errors
   - Standalone output generated
   - Static assets optimized

2. **Files Created for Plesk:**
   - ✅ `app.js` - Node.js server entry point
   - ✅ `plesk.json` - Plesk configuration
   - ✅ `.htaccess` - Apache rewrite rules
   - ✅ `deploy.sh` - Deployment script
   - ✅ `PLESK_DEPLOYMENT.md` - Detailed deployment guide

## 🚀 Deployment Steps

### Step 1: Upload Files to Plesk

1. Upload the contents of `.next/standalone/` to your domain's `httpdocs` folder
2. Ensure these files are in the root of `httpdocs`:
   - `app.js`
   - `package.json`
   - `.next/` folder
   - `public/` folder (if exists)

### Step 2: Configure Plesk Node.js

1. Go to **Websites & Domains** > **your-domain.com** > **Node.js**
2. Set these values:
   - **Node.js Version:** 18.x or higher
   - **Package Manager:** npm
   - **Application Mode:** production
   - **Application Root:** / (root of httpdocs)
   - **Application Startup File:** app.js
   - **Document Root:** /httpdocs

### Step 3: Set Environment Variables

In Plesk Node.js settings, add these environment variables:

```
NODE_ENV=production
PORT=3000
NEXT_PUBLIC_SITE_URL=https://globalallianceimmigration.com
WP_GRAPHQL_ENDPOINT=https://xenodochial-kalam.84-46-242-169.plesk.page/graphql
WP_REST_BASE=https://xenodochial-kalam.84-46-242-169.plesk.page/wp-json/wp/v2
WP_HEADER_URL=https://xenodochial-kalam.84-46-242-169.plesk.page/wp-json/wp/v2/header
WP_SERVICES_URL=https://xenodochial-kalam.84-46-242-169.plesk.page/wp-json/wp/v2/services
WP_MEDIA_HOSTS=xenodochial-kalam.84-46-242-169.plesk.page
```

### Step 4: Set File Permissions

Run these commands in Plesk File Manager or SSH:

```bash
chmod +x app.js
chmod 644 package.json
chmod -R 755 .next/
```

### Step 5: Enable Node.js

1. Click **"Enable Node.js"** in Plesk
2. The application should start automatically
3. Check the logs for any errors

## 🔧 Troubleshooting

### If you get "app.js not found":

- Ensure `app.js` is in the root of `httpdocs`
- Check file permissions (should be executable)

### If you get port conflicts:

- Make sure no other app is using port 3000
- Check Plesk Node.js port settings

### If images don't load:

- Verify environment variables are set
- Check WordPress API endpoints are accessible

### If build fails:

- Ensure Node.js 18+ is installed
- Check all dependencies are available
- Verify Next.js configuration

## 📁 Final File Structure in Plesk:

```
/httpdocs/
├── app.js                    ← Node.js entry point
├── package.json             ← Dependencies
├── .next/                   ← Next.js build output
│   ├── standalone/         ← Standalone server files
│   └── static/             ← Static assets
├── public/                  ← Public assets (if any)
└── .htaccess               ← Apache rules
```

## ✅ Success Indicators

- Application starts without errors
- All pages load correctly
- Images display properly
- WordPress API connections work
- No console errors in browser

## 📞 Support

If issues persist:

1. Check Plesk Node.js logs
2. Verify all environment variables
3. Test WordPress API endpoints
4. Ensure proper file permissions
