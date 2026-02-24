import React, { useState, useRef, useEffect } from "react";
import { Send, Loader, AlertCircle } from "lucide-react";
import { chatWithAI, ChatMessage } from "./ChatResponse";
import { SYSTEM_PROMPTS, formatPrompt } from "../src/prompts";

interface Message extends ChatMessage {
  id: string;
  timestamp: Date;
}

export const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "Hello! I'm your AI Tool Curator assistant. Ask me anything about AI tools, features, pricing, or recommendations.",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to latest message
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    setError(null);

    // Add user message to chat
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      // Call the AI service
      const response = await chatWithAI(
        inputValue,
        SYSTEM_PROMPTS.TOOL_CURATOR,
      );

      // Add assistant message to chat
      const assistantMessage: Message = {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        content: response,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to get response";
      setError(errorMessage);
      console.error("Chat error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: "welcome",
        role: "assistant",
        content:
          "Hello! I'm your AI Tool Curator assistant. Ask me anything about AI tools, features, pricing, or recommendations.",
        timestamp: new Date(),
      },
    ]);
    setError(null);
  };

  return (
    <div className="flex flex-col h-screen bg-[#0f172a]">
      {/* Header */}
      <div className="bg-[#1e293b] border-b border-white/10 p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">AI Tool Curator Chat</h1>
        <button
          onClick={clearChat}
          className="px-3 py-1 text-sm bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
        >
          Clear Chat
        </button>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-2xl rounded-lg p-4 ${
                message.role === "user"
                  ? "bg-primary text-black rounded-br-none"
                  : "bg-[#1e293b] text-white border border-white/10 rounded-bl-none"
              }`}
            >
              <p className="text-sm whitespace-pre-wrap">{message.content}</p>
              <span className="text-xs mt-2 block opacity-70">
                {message.timestamp.toLocaleTimeString()}
              </span>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-[#1e293b] text-white border border-white/10 rounded-lg rounded-bl-none p-4">
              <div className="flex items-center gap-2">
                <Loader className="w-5 h-5 animate-spin text-primary" />
                <span className="text-sm">AI is thinking...</span>
              </div>
            </div>
          </div>
        )}

        {error && (
          <div className="flex justify-start">
            <div className="bg-red-900/20 border border-red-500/50 text-red-100 rounded-lg rounded-bl-none p-4 max-w-2xl">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5" />
                <div>
                  <p className="font-semibold text-sm">Error</p>
                  <p className="text-sm">{error}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="bg-[#1e293b] border-t border-white/10 p-4">
        <div className="flex gap-3 max-w-4xl mx-auto">
          <textarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask about AI tools, features, pricing... (Shift+Enter for new line)"
            className="flex-1 bg-[#0f172a] text-white border border-white/10 rounded-lg p-3 resize-none focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20"
            rows={3}
            disabled={isLoading}
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isLoading}
            className="bg-primary hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed text-black font-bold px-6 py-3 rounded-lg transition-colors flex items-center gap-2 self-end"
          >
            {isLoading ? (
              <Loader className="w-5 h-5 animate-spin" />
            ) : (
              <Send className="w-5 h-5" />
            )}
            {!isLoading && "Send"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
