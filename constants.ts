import { AiTool, ToolCategory } from './types';

export const AI_TOOLS: AiTool[] = [
  {
    id: '1',
    name: 'Gemini',
    description: 'Google’s most capable AI model, built from the ground up to be multimodal.',
    url: 'https://gemini.google.com',
    category: ToolCategory.CHATBOT,
    icon: '✨',
    popular: true
  },
  {
    id: '2',
    name: 'ChatGPT',
    description: 'Conversational AI capable of answering follow-up questions, admitting mistakes, and rejecting inappropriate requests.',
    url: 'https://chat.openai.com',
    category: ToolCategory.CHATBOT,
    icon: '🤖',
    popular: true
  },
  {
    id: '3',
    name: 'Claude',
    description: 'A next-generation AI assistant built for work and trained to be safe, accurate, and secure.',
    url: 'https://claude.ai',
    category: ToolCategory.CHATBOT,
    icon: '🧠',
    popular: true
  },
  {
    id: '5',
    name: 'GitHub Copilot',
    description: 'Your AI pair programmer. Get suggestions for whole lines or entire functions right inside your editor.',
    url: 'https://github.com/features/copilot',
    category: ToolCategory.CODING,
    icon: '💻',
    popular: true
  },
  {
    id: '6',
    name: 'Perplexity',
    description: 'A conversational search engine that answers queries using natural language and predictive text.',
    url: 'https://perplexity.ai',
    category: ToolCategory.PRODUCTIVITY,
    icon: '🔍'
  },
  {
    id: '11',
    name: 'Cursor',
    description: 'The AI-first code editor. Built to make you extraordinarily productive.',
    url: 'https://cursor.sh',
    category: ToolCategory.CODING,
    icon: '⚡'
  },
  {
    id: '13',
    name: 'NotebookLM',
    description: 'An AI-first notebook grounded in your own documents, designed to help you think faster.',
    url: 'https://notebooklm.google.com/',
    category: ToolCategory.PRODUCTIVITY,
    icon: '📓',
    popular: true
  }
];

export const HERO_TITLE = "Discover the Best AI Tools";
export const HERO_SUBTITLE = "A curated collection of tools to supercharge your workflow.";