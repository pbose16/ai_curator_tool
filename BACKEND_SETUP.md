# Backend Setup Guide

This application uses a **secure backend architecture** where the React frontend communicates with a Node.js backend server for AI API calls.

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                  React Frontend (Port 3000)                   │
│  - Handles UI and user interactions                           │
│  - Makes HTTP requests to backend API                         │
│  - NO sensitive API keys exposed                              │
└─────────────────────────────────────────────────────────────┘
                            ↓ (fetch)
                   /api/chat POST request
                            ↓
┌─────────────────────────────────────────────────────────────┐
│              Backend Server (Port 3001)                        │
│  - Receives chat requests from frontend                       │
│  - Securely handles API keys from .env.local                  │
│  - Calls OpenAI/GitHub Models API                             │
│  - Returns response to frontend                               │
└─────────────────────────────────────────────────────────────┘
```

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

This will install all dependencies including:

- React and frontend libraries
- Express (backend server)
- OpenAI client library
- CORS and dotenv for server configuration

### 2. Create `.env.local` File

**Copy** `.env.local.example` and create `.env.local`:

```bash
cp .env.local.example .env.local
```

Then edit `.env.local` and add your GitHub token:

```env
GITHUB_TOKEN=your_github_token_here
PORT=3001
```

⚠️ **IMPORTANT:** `.env.local` is in `.gitignore` and won't be committed. Keep your API keys safe!

### 3. File Structure

```
ai_curator_tool/
├── .env                    # Public config (safe to commit)
├── .env.local             # Private config (DO NOT commit)
├── .env.local.example     # Template for .env.local
├── package.json           # Dependencies + scripts
├── api/
│   └── server.js          # Backend API handler
├── components/
│   ├── ChatResponse.ts    # Frontend calls backend API
│   ├── Chat.tsx           # Chat UI component
│   └── ...
└── src/
    └── ...
```

## Running the Application

### Development Mode (Both Frontend & Backend)

```bash
# Run frontend (port 3000) and backend (port 3001) together
npm run dev:all
```

### Individual Commands

```bash
# Terminal 1: Frontend only
npm run dev

# Terminal 2: Backend only
npm run server
```

### Production Build

```bash
# Build React app
npm run build

# Deploy backend separately on your server
node api/server.js
```

## How It Works

1. **Frontend sends request:**

   ```typescript
   const response = await fetch("http://localhost:3001/api/chat", {
     method: "POST",
     body: JSON.stringify({ messages, systemPrompt }),
   });
   ```

2. **Backend receives and processes:**

   ```javascript
   app.post("/api/chat", async (req, res) => {
     // Uses GITHUB_TOKEN from .env.local
     // Calls OpenAI API securely
     // Returns response to frontend
   });
   ```

3. **Frontend displays response to user**

## API Endpoints

### POST `/api/chat`

Send a chat message and get a response.

**Request:**

```json
{
  "messages": [
    {
      "role": "user",
      "content": "What is an AI tool?"
    }
  ],
  "systemPrompt": "You are a helpful AI tool curator..."
}
```

**Response:**

```json
{
  "content": "An AI tool is..."
}
```

### GET `/health`

Check if backend is running.

**Response:**

```json
{
  "status": "ok"
}
```

## Environment Variables

### `.env` (Public - Can be committed)

```env
VITE_GOOGLE_MAPS_API_KEY=...
VITE_API_BASE_URL=http://localhost:3001
```

### `.env.local` (Private - DO NOT commit)

```env
GITHUB_TOKEN=your_token_here
PORT=3001
```

## Troubleshooting

### "Cannot find module 'express'"

```bash
npm install express cors dotenv
```

### Backend not responding

- Check if backend server is running: `npm run server`
- Verify `VITE_API_BASE_URL` in `.env` matches backend URL
- Check port 3001 is not blocked

### GITHUB_TOKEN not working

- Make sure `.env.local` exists and contains valid token
- Restart backend server after changing `.env.local`
- Tokens are environment-specific; regenerate if needed

### CORS errors

- Backend Express server includes CORS middleware
- If issues persist, check `api/server.js` CORS configuration

## Security Benefits

✅ **API keys never exposed in browser**
✅ **Sensitive data stays on backend**
✅ **Frontend communication via secure HTTP**
✅ **Easy token rotation without frontend changes**
✅ **Scalable: Backend can be deployed separately**

## Next Steps

1. Set up `.env.local` with your GitHub token
2. Run `npm install` to install backend dependencies
3. Run `npm run dev:all` to start both frontend and backend
4. Open http://localhost:3000 and test the chat feature

For more info, see [api/server.js](./api/server.js)
