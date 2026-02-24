/\*\*

- Example: How to use prompts throughout the application
-
- Import and use the prompts like this:
  \*/

import {
SYSTEM_PROMPTS,
USER_PROMPTS,
PROMPT_TEMPLATES,
formatPrompt,
} from './index';

// Example 1: Using system prompts
export const example1 = () => {
const systemPrompt = SYSTEM_PROMPTS.TOOL_CURATOR;
console.log('System prompt:', systemPrompt);
// Output: "You are an AI Tool Curator assistant..."
};

// Example 2: Using user prompts
export const example2 = () => {
const userPrompt = USER_PROMPTS.SEARCH_TOOLS;
console.log('User prompt:', userPrompt);
// Output: "Find AI tools that help with {category}..."
};

// Example 3: Formatting prompts with variables
export const example3 = () => {
const formattedPrompt = formatPrompt(PROMPT_TEMPLATES.DISCOVER_TOOL, {
toolName: 'ChatGPT',
category: 'AI Assistant',
});
console.log('Formatted prompt:', formattedPrompt);
// Output: "Tell me about ChatGPT. What is it? How does it work? Who should use it?"
};

// Example 4: Using in a React component
export const ComponentExample = () => {
const handleSearch = (toolName: string) => {
const prompt = formatPrompt(PROMPT_TEMPLATES.DISCOVER_TOOL, {
toolName,
category: 'Development',
});
// Send prompt to your API/LLM
console.log('Sending to API:', prompt);
};

return null;
};

/\*\*

- Quick Use Guide:
-
- Import in any component:
- import { SYSTEM_PROMPTS, USER_PROMPTS, PROMPT_TEMPLATES, formatPrompt } from '@/prompts';
-
- Or from the component:
- import { SYSTEM_PROMPTS } from '../prompts';
-
- Then use like:
- const prompt = SYSTEM_PROMPTS.TOOL_CURATOR;
- const customPrompt = formatPrompt(PROMPT_TEMPLATES.DISCOVER_TOOL, { toolName: 'MyTool' });
  \*/
