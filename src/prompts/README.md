# Prompts Repository

Centralized location for all prompts used throughout the AI Tool Curator application.

## Directory Structure

```
src/prompts/
├── index.ts              # Main prompts file with all prompt definitions
├── USAGE_EXAMPLES.md     # Examples of how to use prompts
└── README.md            # This file
```

## Files

### index.ts

Contains three main categories:

1. **SYSTEM_PROMPTS** - System prompts for different AI assistants
   - `TOOL_CURATOR` - Main curator assistant prompt
   - `TOOL_FINDER` - Tool discovery prompt
   - `LOCATION_SERVICE` - Location-based service prompt

2. **USER_PROMPTS** - Pre-written user prompts for common tasks
   - `SEARCH_TOOLS` - Search AI tools by category
   - `COMPARE_TOOLS` - Compare multiple tools
   - `TOOL_RECOMMENDATION` - Get tool recommendations
   - `LOCATION_TOOLS` - Find tools by location
   - `PRICING_INFO` - Find affordable tools

3. **PROMPT_TEMPLATES** - Dynamic templates with placeholders
   - `DISCOVER_TOOL` - Learn about a specific tool
   - `EVALUATE_TOOL` - Evaluate tool for specific use case
   - `PRICE_COMPARISON` - Compare pricing
   - `FEATURE_ANALYSIS` - Analyze tool features
   - `INTEGRATION_GUIDE` - Integration instructions

### Helper Functions

- `formatPrompt(template, variables)` - Replace {variable} placeholders in templates

## How to Use

### Import in Components

```typescript
import {
  SYSTEM_PROMPTS,
  USER_PROMPTS,
  PROMPT_TEMPLATES,
  formatPrompt,
} from "@/prompts";
```

### Use System Prompts

```typescript
const systemMsg = SYSTEM_PROMPTS.TOOL_CURATOR;
// Send to LLM as system message
```

### Use User Prompts

```typescript
const userMsg = USER_PROMPTS.SEARCH_TOOLS;
// Send to LLM as user message
```

### Format Templates

```typescript
const customPrompt = formatPrompt(PROMPT_TEMPLATES.DISCOVER_TOOL, {
  toolName: "ChatGPT",
  category: "AI",
});
// Output: "Tell me about ChatGPT. What is it? How does it work? Who should use it?"
```

## Adding New Prompts

1. Open `src/prompts/index.ts`
2. Add your prompt to the appropriate category (SYSTEM_PROMPTS, USER_PROMPTS, or PROMPT_TEMPLATES)
3. If it has placeholders like `{variable}`, add it to PROMPT_TEMPLATES and use `formatPrompt()`

Example:

```typescript
export const SYSTEM_PROMPTS = {
  // ... existing prompts
  NEW_PROMPT: "Your new system prompt here",
};
```

## Best Practices

1. ✅ Use descriptive constant names (UPPERCASE_WITH_UNDERSCORES)
2. ✅ Add comments explaining the prompt's purpose
3. ✅ Use templates for dynamic content instead of string concatenation
4. ✅ Keep prompts focused and single-purpose
5. ✅ Review and update prompts based on LLM performance
