# Plesk Deployment Guide for Next.js Application

## Prerequisites

- Node.js 18+ installed on your Plesk server
- Access to Plesk control panel
- Domain configured in Plesk

## Step 1: Prepare Your Application

1. **Build the application locally:**

   ```bash
   npm run build
   ```

2. **Run the deployment script:**
   ```bash
   ./deploy.sh
   ```

## Step 2: Configure Plesk Node.js Settings

1. **Access Plesk Control Panel**

   - Go to your domain's Node.js settings
   - Navigate to: Websites & Domains > your-domain.com > Node.js

2. **Configure Node.js Settings:**

   - **Node.js Version:** 18.x or higher
   - **Package Manager:** npm
   - **Application Mode:** production
   - **Application Root:** / (root of httpdocs)
   - **Application Startup File:** app.js
   - **Document Root:** /httpdocs

3. **Environment Variables:**
   Add these environment variables in Plesk:
   ```
   NODE_ENV=production
   PORT=3000
   NEXT_PUBLIC_SITE_URL=https://your-domain.com
   ```

## Step 3: Upload Files

1. **Upload the contents of `.next/standalone/` to your domain's httpdocs folder**

   - This includes: app.js, package.json, and the .next folder
   - Make sure all files are uploaded to the root of httpdocs

2. **Set proper permissions:**
   ```bash
   chmod +x app.js
   chmod 644 package.json
   chmod -R 755 .next/
   ```

## Step 4: Configure Domain Settings

1. **Set up domain forwarding (if needed):**

   - In Plesk, go to your domain settings
   - Configure subdomain or domain to point to your Node.js app

2. **SSL Certificate:**
   - Enable SSL certificate for your domain
   - Force HTTPS redirect

## Step 5: Test Deployment

1. **Start the application:**

   - In Plesk Node.js settings, click "Enable Node.js"
   - The application should start automatically

2. **Check logs:**
   - Monitor the application logs in Plesk
   - Look for any error messages

## Troubleshooting

### Common Issues:

1. **"app.js not found" error:**

   - Ensure app.js is in the root of httpdocs
   - Check file permissions (should be executable)

2. **Port conflicts:**

   - Make sure no other application is using port 3000
   - Check Plesk Node.js port settings

3. **Build errors:**

   - Ensure all dependencies are installed
   - Check Node.js version compatibility

4. **Image loading issues:**
   - Verify environment variables are set correctly
   - Check Next.js image configuration

### Environment Variables Required:

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

## File Structure After Deployment:

```
/httpdocs/
├── app.js
├── package.json
├── .next/
│   ├── standalone/
│   └── static/
└── public/
```

## Support

If you encounter issues:

1. Check Plesk Node.js logs
2. Verify all environment variables
3. Ensure proper file permissions
4. Test locally first with `npm run build && npm start`
