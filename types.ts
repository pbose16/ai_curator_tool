export enum ToolCategory {
  ALL = 'All',
  CHATBOT = 'Chatbot',
  CODING = 'Coding',
  IMAGE = 'Image Generation',
  VIDEO = 'Video',
  AUDIO = 'Audio',
  WRITING = 'Writing',
  PRODUCTIVITY = 'Productivity'
}

export interface AiTool {
  id: string;
  name: string;
  description: string;
  url: string;
  category: ToolCategory;
  icon: string; // URL to an icon or emoji
  popular?: boolean;
}