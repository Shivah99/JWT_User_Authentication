# MongoDB Atlas Setup Guide

Follow these steps to set up your MongoDB Atlas cloud database:

## 1. Create a MongoDB Atlas Account

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)
2. Sign up for a free account
3. Complete the registration process

## 2. Create a New Cluster

1. Click "Build a Cluster"
2. Select the FREE tier option
3. Choose a cloud provider (AWS, Google Cloud, or Azure)
4. Select a region closest to you
5. Click "Create Cluster" (this may take a few minutes)

## 3. Set Up Database Access

1. In the left sidebar, click "Database Access"
2. Click "Add New Database User"
3. Create a username and password
   - Make sure to use a secure password
   - Save this password as you'll need it for your connection string
4. Set user privileges to "Atlas admin"
5. Click "Add User"

## 4. Set Up Network Access

1. In the left sidebar, click "Network Access"
2. Click "Add IP Address"
3. To allow access from anywhere, click "Allow Access from Anywhere"
   - For production applications, you would restrict this to specific IPs
4. Click "Confirm"

## 5. Get Your Connection String

1. Return to your cluster view by clicking "Clusters" in the left sidebar
2. Click "Connect"
3. Click "Connect your application"
4. Copy the connection string
5. Replace `<username>` and `<password>` with your actual database username and password

## 6. Update Your Application Configuration

1. Open the `config.js` file in your project
2. Replace the placeholder MongoDB URI with your actual connection string
3. Make sure to keep your connection string private and never commit it to public repositories

## Testing Your Connection

After configuring your connection string in the application, run your server:

