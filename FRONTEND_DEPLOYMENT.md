# Frontend-Only Deployment Guide

> **Deploy FashionDeck frontend to Vercel without backend (for UI showcase)**

---

## 🎯 **What You'll Deploy**

- ✅ Next.js frontend on Vercel
- ✅ Landing page
- ✅ Search page UI
- ✅ Components and styling
- ❌ Backend API (not deployed yet - no OpenAI key)
- ❌ ML Service (not deployed yet - no OpenAI key)
- ❌ Functional search (will add later when backend is ready)

---

## ⏱️ **Estimated Time: 10-15 minutes**

---

## 📋 **Prerequisites**

- [ ] Vercel account (create at vercel.com - free)
- [ ] GitHub repository with FashionDeck code
- [ ] Code pushed to GitHub

---

## 🚀 **Step-by-Step Deployment**

### **Step 1: Prepare Frontend for Standalone Deployment**

First, let's make sure the frontend can run without the backend:

1. **Check if frontend has any pages**

   ```bash
   # Navigate to frontend
   cd apps/web

   # Check if src/app directory exists
   ls src/app
   ```

2. **Test build locally** (optional but recommended)

   ```bash
   # From project root
   npm run build --workspace=@fashiondeck/web

   # If build succeeds, you're good to go!
   ```

### **Step 2: Push Code to GitHub**

```bash
# Make sure all code is committed
git status

# If there are uncommitted changes
git add .
git commit -m "Prepare for frontend deployment"
git push origin main
```

### **Step 3: Create Vercel Account**

1. Go to https://vercel.com
2. Click "Sign Up"
3. Sign up with GitHub (recommended for easy integration)
4. Authorize Vercel to access your GitHub repositories

### **Step 4: Import Project to Vercel**

1. **Click "Add New" → "Project"**

2. **Import Git Repository**
   - Find your FashionDeck repository
   - Click "Import"

3. **Configure Project Settings**

   ```yaml
   Framework Preset: Next.js
   Root Directory: apps/web
   Build Command: cd ../.. && npm run build --filter=@fashiondeck/web
   Output Directory: apps/web/.next
   Install Command: npm install
   Node.js Version: 20.x
   ```

4. **Set Environment Variables** (optional for now)
   - Click "Environment Variables"
   - Add: `NEXT_PUBLIC_API_URL` = `http://localhost:3001` (placeholder)
   - Or leave empty for now

5. **Click "Deploy"**

### **Step 5: Wait for Deployment**

- Vercel will build and deploy your frontend
- This takes about 2-5 minutes
- Watch the build logs for any errors

### **Step 6: Get Your Live URL**

Once deployment completes:

- Vercel will show your production URL
- Format: `https://fashiondeck-xxx.vercel.app`
- Click "Visit" to see your live site!

---

## ✅ **Verification**

Visit your Vercel URL and check:

- [ ] Landing page loads
- [ ] Styling looks correct
- [ ] Navigation works
- [ ] Search page loads
- [ ] No console errors (open DevTools)
- [ ] Mobile responsive (test on phone or DevTools)

**Note**: Search functionality won't work yet (no backend), but the UI should be fully visible!

---

## 🎨 **What You Can Showcase**

Even without the backend, you can show:

- ✅ Beautiful landing page
- ✅ Modern UI design
- ✅ Responsive layout
- ✅ Component structure
- ✅ User flow (prompt input → results page)

---

## 🔄 **Auto-Deployment**

Now that Vercel is connected:

- Every push to `main` branch will auto-deploy
- Preview deployments for pull requests
- Instant rollback if needed

---

## 📝 **Next Steps (When You Get OpenAI Key)**

1. Deploy databases (PostgreSQL + Redis) on Railway
2. Deploy ML Service with OpenAI key
3. Deploy Backend API
4. Update frontend `NEXT_PUBLIC_API_URL` in Vercel
5. Full application will be functional!

---

## 🚨 **Troubleshooting**

### **Build Fails**

1. **Check build logs** in Vercel dashboard
2. **Common issues**:
   - Missing dependencies: Run `npm install` locally
   - TypeScript errors: Run `npm run type-check` locally
   - Build command wrong: Verify root directory is `apps/web`

3. **Fix locally and push**:
   ```bash
   # Fix the issue
   git add .
   git commit -m "Fix build issue"
   git push origin main
   # Vercel will auto-redeploy
   ```

### **Page Not Found**

- Make sure `apps/web/src/app/page.tsx` exists
- Check that Next.js is using App Router (not Pages Router)

### **Styling Issues**

- Verify Tailwind CSS is configured
- Check `tailwind.config.js` exists
- Ensure `globals.css` is imported

---

## 💡 **Tips**

1. **Custom Domain** (optional)
   - Go to Vercel project settings
   - Click "Domains"
   - Add your custom domain
   - Follow DNS configuration instructions

2. **Preview Deployments**
   - Every branch gets a preview URL
   - Great for testing before merging to main

3. **Environment Variables**
   - Can be different for Production, Preview, Development
   - Update anytime in Vercel dashboard

---

## ✅ **Success!**

Your frontend is now live at: `https://your-project.vercel.app`

Share this URL to showcase your UI! 🎉

When you get your OpenAI API key, come back to `DEPLOYMENT.md` to deploy the full stack.
