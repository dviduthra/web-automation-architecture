require("dotenv").config({
  path: require("path").resolve(__dirname, "../../.env"),
});
const { GoogleGenAI } = require("@google/genai");
const manifest = require("./manifest.json");

// It receives a plain English Gherkin step and figures out
// which Page Object method to call without any manual mapping
class AgenticExecutor {
  constructor(pageObjects) {
    // pageObjects is an object containing initialized Page Object instances
    // passed in from hooks.js so the executor can call methods on them
    this.pageObjects = pageObjects;

    // initialize the new Google GenAI SDK
    this.ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

    // Cache to avoid repeated API calls for same step
    this.instructionCache = new Map();
  }

  // Builds the prompt that gets sent to Gemini
  // Two parts: manifest (what methods exist) + gherkin step (what to map)
  buildPrompt(stepText) {
    return `
You are a test automation interpreter.
You will receive a Gherkin step and a manifest of available Page Object methods.
Your job is to return a JSON object telling which method to call.

Available Page Object methods:
${JSON.stringify(manifest, null, 2)}

Gherkin step: "${stepText}"

Rules:
- Return ONLY valid JSON, no explanation, no markdown, no code blocks
- If the step is an assertion (Then/And) still map it to the correct method
- Extract any arguments from the Gherkin step and put them in args array
- If no method matches, return { "class": null, "method": null, "args": [] }

Response format:
{
    "class": "PageObjectClassName",
    "method": "methodName",
    "args": ["arg1", "arg2"]
}`;
  }

  // Sends the prompt to Gemini and parses the response back to JSON
  async getAIInstruction(stepText, retries = 2) {
    // Check cache first to avoid unnecessary API calls
    if (this.instructionCache.has(stepText)) {
      console.log(`Using cached instruction for: "${stepText}"`);
      return this.instructionCache.get(stepText);
    }

    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        // this.ai.models.generateContent is the correct method in @google/genai
        const response = await this.ai.models.generateContent({
          model: "gemini-1.5-pro",
          contents: this.buildPrompt(stepText),
        });

        // In @google/genai the text is nested inside candidates
        const text = response.candidates[0].content.parts[0].text;

        // Gemini sometimes wraps JSON in markdown code blocks
        // even when told not to — strip them just in case
        const cleaned = text
          .replace(/```json/g, "")
          .replace(/```/g, "")
          .trim();

        const instruction = JSON.parse(cleaned);

        // Cache the result for future use
        this.instructionCache.set(stepText, instruction);

        return instruction;
      } catch (error) {
        // If rate limited and retries remaining, wait and try again
        if (error.message.includes("429") && attempt < retries) {
          console.warn(
            `Rate limited — waiting 60s before retry ${attempt}/${retries}`,
          );
          await new Promise((resolve) => setTimeout(resolve, 60000));
        } else {
          throw error;
        }
      }
    }
  }

  // The main method called from steps.js for every Gherkin line
  async execute(stepText) {
    console.log(`\n AI Interpreting: "${stepText}"`);

    const instruction = await this.getAIInstruction(stepText);
    console.log(
      `Mapped to: ${instruction.class}.${instruction.method}(${instruction.args.join(", ")})`,
    );

    // If Gemini couldn't match the step, warn and skip
    // instead of crashing the whole test run
    if (!instruction.class || !instruction.method) {
      console.warn(`No method found for step: "${stepText}" — skipping`);
      return;
    }

    // Find the Page Object instance by class name string
    const targetPageObject = this.pageObjects[instruction.class];

    if (!targetPageObject) {
      throw new Error(
        `Page Object "${instruction.class}" not found. Check manifest.json and hooks.js`,
      );
    }

    // Dynamically call the method with spread args
    // ...instruction.args spreads ["standard_user", "secret_sauce"] as individual arguments
    await targetPageObject[instruction.method](...instruction.args);
  }
}

module.exports = AgenticExecutor;
