/**
 * Shared Prompts Repository
 * Contains all prompts used throughout the application
 * Import and use these prompts from any component
 */

export const SYSTEM_PROMPTS = {
  TOOL_CURATOR:
    "You are an AI Tool Curator assistant. Help users discover and evaluate AI tools based on their needs. Provide detailed information about tool features, pricing, use cases, and recommendations.",

  TOOL_FINDER:
    "You are a helpful assistant specializing in finding the right AI tools. Ask clarifying questions about the user's needs and recommend the most suitable tools with explanations.",

  LOCATION_SERVICE:
    "You are a location services expert. Help users find services and tools available in their selected location. Provide relevant recommendations based on geographic region.",
} as const;

export const USER_PROMPTS = {
  SEARCH_TOOLS:
    "Find AI tools that help with {category}. Include features, pricing, and use cases.",

  COMPARE_TOOLS:
    "Compare these AI tools: {tools}. Show pros, cons, and best use cases for each.",

  TOOL_RECOMMENDATION:
    "Based on my needs ({requirements}), what AI tools would you recommend?",

  LOCATION_TOOLS: "What AI tools and services are available in {location}?",

  PRICING_INFO:
    "Show me affordable AI tools in the {category} category with pricing details.",

  SERVICE_FINDER_PROMPT:
    "write me a prompt which will find and list me top 10 {serviceplaceHolder} from a {location} within a radius of {distance}km. The list should list down the name, contact number, address, gmap location link and instagram page link",
} as const;

export const PROMPT_TEMPLATES = {
  /**
   * Generic template for tool discovery
   * Usage: formatPrompt(PROMPT_TEMPLATES.DISCOVER_TOOL, { toolName: 'ChatGPT', category: 'AI' })
   */
  DISCOVER_TOOL:
    "Tell me about {toolName}. What is it? How does it work? Who should use it?",

  EVALUATE_TOOL:
    "Evaluate {toolName} for {useCase}. Is it suitable? What are alternatives?",

  PRICE_COMPARISON: "Compare pricing between {tools}. Which offers best value?",

  FEATURE_ANALYSIS:
    "What features does {toolName} have? How does it compare to competitors?",

  INTEGRATION_GUIDE:
    "How can I integrate {toolName} with {platform}? Step-by-step guide.",
} as const;

/**
 * Helper function to format prompts with variables
 * @param template - Prompt template with {variable} placeholders
 * @param variables - Object with key-value pairs to replace
 * @returns Formatted prompt string
 *
 * Example:
 * formatPrompt(PROMPT_TEMPLATES.DISCOVER_TOOL, { toolName: 'ChatGPT', category: 'AI' })
 */
export const formatPrompt = (
  template: string,
  variables: Record<string, string>,
): string => {
  return template.replace(/{(\w+)}/g, (match, key) => variables[key] || match);
};

/**
 * Get all available prompts organized by category
 */
export const getAllPrompts = () => ({
  system: SYSTEM_PROMPTS,
  user: USER_PROMPTS,
  templates: PROMPT_TEMPLATES,
});
