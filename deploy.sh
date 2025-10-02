#!/bin/bash

# Plesk Deployment Script for Next.js
echo "Starting deployment to Plesk..."

# Set production environment
export NODE_ENV=production

# Install dependencies
echo "Installing dependencies..."
npm ci --production

# Build the application
echo "Building application..."
npm run build

# The standalone build is already created by Next.js
echo "Standalone build created in .next/standalone/"

# Set proper permissions for deployment files
echo "Setting permissions..."
chmod +x .next/standalone/server.js
chmod 644 .next/standalone/package.json
chmod -R 755 .next/standalone/.next/

echo "Deployment preparation complete!"
echo "Files are ready in .next/standalone/ directory"
echo "Upload the contents of .next/standalone/ to your Plesk domain's httpdocs folder"
echo ""
echo "Required files to upload:"
echo "- server.js (main application file)"
echo "- package.json (dependencies)"
echo "- .next/ (build output)"
echo "- public/ (static assets)"
