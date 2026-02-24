import OpenAI from "openai";

export interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

/**
 * Main chat function that sends messages to the AI and returns the response
 * @param messages - Array of chat messages with role and content
 * @param systemPrompt - Optional system prompt to set the AI behavior
 * @returns The AI response content
 */
export async function main(
  messages: ChatMessage[],
  systemPrompt?: string,
): Promise<string> {
  const token = import.meta.env.VITE_GITHUB_TOKEN;
  const endpoint = "https://models.github.ai/inference";
  const model = "openai/gpt-4.1";

  if (!token) {
    throw new Error("VITE_GITHUB_TOKEN is not set in .env");
  }

  const client = new OpenAI({
    baseURL: endpoint,
    apiKey: token,
  });

  // Prepare messages with system prompt if provided
  const messagesForAPI: ChatMessage[] = systemPrompt
    ? [{ role: "system", content: systemPrompt }, ...messages]
    : messages;

  const response = await client.chat.completions.create({
    messages: messagesForAPI,
    model: model,
  });

  const content = response.choices[0].message.content;
  return content || "No response received";
}

/**
 * Convenience function for simple single-message queries
 * @param userMessage - The user's message
 * @param systemPrompt - Optional system prompt
 * @returns The AI response
 */
export async function chatWithAI(
  userMessage: string,
  systemPrompt?: string,
): Promise<string> {
  return main([{ role: "user", content: userMessage }], systemPrompt);
}

