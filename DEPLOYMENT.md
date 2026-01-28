# 📤 Git & Vercel Deployment Guide

## Step 1: Install Git (If Not Already Installed)

### Windows
1. Download Git for Windows: https://git-scm.com/download/win
2. Run the installer with default settings
3. Restart VS Code and PowerShell

### Verify Installation
```bash
git --version
```

---

## Step 2: Configure Git

```bash
git config --global user.email "r.bassim@esisa.ac.ma"
git config --global user.name "Rayan Bassim"
```

---

## Step 3: Initialize & Push to GitHub

### Option A: Using VS Code (Easiest)

1. **Open VS Code Source Control**
   - Press `Ctrl+Shift+G` or click the Source Control icon
   
2. **Initialize Repository**
   - Click "Initialize Repository" if not already initialized
   
3. **Stage All Files**
   - Click the "+" button next to "Changes" or press `Ctrl+A` then `Ctrl+Shift+P`
   - Type "Git: Stage All Changes"
   
4. **Commit**
   - Type your commit message: "Initial commit: Student Management System"
   - Press `Ctrl+Enter` to commit
   
5. **Add Remote**
   - Open Terminal: `Ctrl+` ` `
   - Run:
   ```bash
   git remote add origin https://github.com/rbassim-ui/Rayan-students-managements.git
   ```
   
6. **Push to GitHub**
   - Press `Ctrl+Shift+P` and type "Git: Push"
   - Or in terminal:
   ```bash
   git branch -M main
   git push -u origin main
   ```

### Option B: Using PowerShell/Command Line

```bash
# Navigate to your project
cd "c:\Users\Makram\OneDrive\Desktop\student management"

# Initialize git (if not already done)
git init

# Configure your identity
git config user.email "r.bassim@esisa.ac.ma"
git config user.name "Rayan Bassim"

# Add all files
git add .

# Commit
git commit -m "Initial commit: Student Management System for Vercel deployment"

# Add remote
git remote add origin https://github.com/rbassim-ui/Rayan-students-managements.git

# Rename branch to main (if needed)
git branch -M main

# Push to GitHub
git push -u origin main
```

---

## Step 4: Deploy on Vercel

### Option A: Using Vercel Dashboard (Recommended)

1. Go to https://vercel.com
2. Sign up or log in
3. Click "Add New Project"
4. Select "Import Git Repository"
5. Paste your repository URL: `https://github.com/rbassim-ui/Rayan-students-managements.git`
6. Click "Import"
7. Vercel will auto-detect settings (Framework: Node.js)
8. Click "Deploy"
9. Done! 🎉

### Option B: Using Vercel CLI

```bash
# Install Vercel CLI globally
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Production deployment
vercel --prod
```

---

## ✅ Vercel Configuration Status

Your project includes:

✅ **vercel.json** - Optimized for serverless
- Framework detected: Express
- Node.js 18.x runtime
- 30-second timeout
- 1024MB memory
- Proper route handling

✅ **.vercelignore** - Excludes unnecessary files
- Reduces build size
- Faster deployments

✅ **Environment Setup**
- .env.example provided
- Add environment variables in Vercel Dashboard if needed

---

## 🚀 Post-Deployment Checklist

After deploying to Vercel:

1. **Test API Endpoints**
   - Visit: `https://your-vercel-domain.vercel.app/api`
   - Should see health check response

2. **Test Student Operations**
   - Create a student through the UI
   - Search functionality
   - Edit and delete operations

3. **Monitor Logs**
   - Vercel Dashboard → Deployments → Functions
   - Check for any errors

4. **Environment Variables** (if using database)
   - Vercel Dashboard → Settings → Environment Variables
   - Add your database connection string

---

## 🔗 Useful Links

- **GitHub Repository**: https://github.com/rbassim-ui/Rayan-students-managements.git
- **Vercel Dashboard**: https://vercel.com/dashboard
- **Vercel Docs**: https://vercel.com/docs
- **Express on Vercel**: https://vercel.com/guides/using-express-with-vercel

---

## ⚠️ Important Notes

1. **Authentication**: Make sure you're logged into GitHub
2. **Repository Visibility**: Check if repo is public/private in GitHub settings
3. **Build Errors**: Check Vercel deployment logs for detailed error messages
4. **Cold Starts**: First request may take longer (serverless behavior)

---

## 📝 Troubleshooting

### "Permission denied" when pushing
```bash
# Regenerate SSH keys or use personal access token
# Go to GitHub Settings → Developer Settings → Personal Access Tokens
git remote set-url origin https://your-token@github.com/rbassim-ui/Rayan-students-managements.git
```

### "Cannot find module" on Vercel
- Check `package.json` has all dependencies
- Run locally: `npm install` then `npm run dev`

### CORS errors
- Already handled in API with `cors()` middleware
- Vercel handles routing properly with vercel.json

### Database connection issues
- Use cloud database (MongoDB Atlas, Supabase, etc.)
- Add connection string to Vercel environment variables

---

Good luck with your deployment! 🚀
