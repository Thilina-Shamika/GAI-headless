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

# Create deployment directory structure
echo "Preparing deployment files..."
mkdir -p .next/standalone/.next
cp -r .next/static .next/standalone/.next/

# Copy necessary files for standalone deployment
cp package.json .next/standalone/
cp app.js .next/standalone/

# Set proper permissions
chmod +x app.js

echo "Deployment preparation complete!"
echo "Files are ready in .next/standalone/ directory"
echo "Upload the contents of .next/standalone/ to your Plesk domain's httpdocs folder"
