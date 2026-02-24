# 🚀 Quick Start - Ideal React + Backend Setup

Your application now has an **ideal production-ready architecture** with separated frontend and backend!

## What Changed

✅ **Frontend (React):** No API keys exposed  
✅ **Backend (Node.js):** Handles all API calls securely  
✅ **Communication:** HTTP requests via `/api/chat` endpoint  
✅ **Environment Separation:** Public vs. Private configuration

## File Structure

```
.env                 ← Public config (safe to commit)
.env.local          ← Private config (DO NOT commit, in .gitignore)
api/server.js       ← Backend API server
components/
  ├── ChatResponse.ts    ← Now calls backend API
  ├── Chat.tsx          ← Chat UI
  └── ...
```

## Quick Start (3 Steps)

### Step 1: Install Dependencies ✅

```bash
npm install
```

_(Already done! Backend packages installed)_

### Step 2: Verify `.env.local`

Check that `.env.local` has your GitHub token:

```env
GITHUB_TOKEN=your_token_here
PORT=3001
```

### Step 3: Start Everything

```bash
# Run frontend AND backend together
npm run dev:all
```

Or run separately in different terminals:

```bash
# Terminal 1: Frontend (port 3000)
npm run dev

# Terminal 2: Backend (port 3001)
npm run server
```

## How It Works

1. **Frontend sends chat request:**
   - React component calls `chatWithAI(userMessage, systemPrompt)`
   - Makes HTTP POST to `http://localhost:3001/api/chat`

2. **Backend receives and processes:**
   - Express server routes to `/api/chat` handler
   - Uses `GITHUB_TOKEN` from `.env.local` (secure!)
   - Calls OpenAI/GitHub Models API
   - Returns response

3. **Frontend displays result:**
   - Chat component shows AI response to user
   - Timestamp and formatting applied

## Environment Variables

### `.env` (Public - Committed to Git)

```env
VITE_GOOGLE_MAPS_API_KEY=...      # Public key
VITE_API_BASE_URL=http://localhost:3001    # Backend URL
```

### `.env.local` (Private - Never Committed)

```env
GITHUB_TOKEN=...    # Secret token
PORT=3001          # Backend port
```

## Security Improvements

| Before                     | After                               |
| -------------------------- | ----------------------------------- |
| ❌ API keys in browser     | ✅ Keys only on backend             |
| ❌ Secrets in JS bundle    | ✅ Secrets in server environment    |
| ❌ Limited scalability     | ✅ Backend independently deployable |
| ❌ Browser-side processing | ✅ Secure server-side processing    |

## Useful Commands

```bash
npm run dev         # Frontend only
npm run server      # Backend only
npm run dev:all     # Both frontend + backend
npm run build       # Build React for production
```

## Troubleshooting

**Q: "Cannot find module 'express'"**

```bash
npm install express cors dotenv
```

**Q: Backend not responding?**

- Run `npm run server` in separate terminal
- Check `VITE_API_BASE_URL` in `.env`
- Verify `.env.local` exists with `GITHUB_TOKEN`

**Q: CORS errors?**

- Backend has CORS enabled automatically
- Check backend is running on correct port

**Q: Changes to `.env.local` not working?**

- Restart backend server: `npm run server`
- Frontend dev server auto-reloads

## Production Deployment

When deploying:

1. **Frontend (React build)**

   ```bash
   npm run build
   # Deploy `dist/` folder to hosting (Vercel, Netlify, etc.)
   ```

2. **Backend (Node.js)**

   ```bash
   # Deploy to server with node installed
   # Set environment variables on server
   # Run: node api/server.js
   ```

3. **Update `.env` in frontend**
   ```env
   VITE_API_BASE_URL=https://your-api-domain.com
   ```

## Files Reference

- [BACKEND_SETUP.md](./BACKEND_SETUP.md) - Detailed backend documentation
- [api/server.js](./api/server.js) - Backend API implementation
- [components/ChatResponse.ts](./components/ChatResponse.ts) - Frontend API client
- [components/Chat.tsx](./components/Chat.tsx) - Chat UI component

## Next Steps

1. ✅ Dependencies installed
2. ✅ `.env` configured
3. ✅ `.env.local` created
4. **👉 Run `npm run dev:all` to start!**

---

**Questions?** Check [BACKEND_SETUP.md](./BACKEND_SETUP.md) for detailed documentation.
