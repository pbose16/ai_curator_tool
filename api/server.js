/**
 * Backend API Handler for Chat
 * 
 * This file contains the backend logic for handling chat requests.
 * In a production setup, this would run on a separate server/port.
 * 
 * Setup:
 * 1. npm install express openai cors dotenv
 * 2. Add to package.json scripts: "server": "node api/server.js"
 * 3. Create .env.local (never commit):
 *    GITHUB_TOKEN=your_token_here
 * 4. Run: npm run server
 */

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

// Load environment variables from .env.local
dotenv.config({ path: ".env.local" });

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize OpenAI client (uses GITHUB_TOKEN from .env.local)
const token = process.env.GITHUB_TOKEN;
if (!token) {
  console.warn(
    "WARNING: GITHUB_TOKEN not found in .env.local. Chat API will not work."
  );
}

const client = new OpenAI({
  baseURL: "https://models.github.ai/inference",
  apiKey: token,
});

interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

interface ChatRequest {
  messages: ChatMessage[];
  systemPrompt?: string;
}

/**
 * POST /api/chat - Handle chat requests
 */
app.post("/api/chat", async (req, res) => {
  try {
    const { messages, systemPrompt } = req.body as ChatRequest;

    // Validate input
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Invalid messages format" });
    }

    // Prepare messages with system prompt
    const messagesForAPI = systemPrompt
      ? [{ role: "system" as const, content: systemPrompt }, ...messages]
      : messages;

    // Call OpenAI API
    const response = await client.chat.completions.create({
      messages: messagesForAPI,
      model: "openai/gpt-4.1",
    });

    const content = response.choices[0].message.content;

    res.json({
      content: content || "No response received",
    });
  } catch (error) {
    console.error("Chat API error:", error);
    res.status(500).json({
      error:
        error instanceof Error ? error.message : "Internal server error",
    });
  }
});

/**
 * Health check endpoint
 */
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

// Start server
app.listen(PORT, () => {
  console.log(`🔌 Backend API running at http://localhost:${PORT}`);
  console.log(`📝 Chat endpoint: POST http://localhost:${PORT}/api/chat`);
});
