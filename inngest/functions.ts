import db from "@/lib/database";
import { inngest } from "./client";
import { generateText } from "ai";
import { createOllama } from "ollama-ai-provider-v2";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { createOpenAI } from "@ai-sdk/openai";
import { createAnthropic } from "@ai-sdk/anthropic";

const ollama = createOllama({ baseURL: "http://localhost:11434/api" });
const google = createGoogleGenerativeAI();
const openai = createOpenAI();
const anthropic = createAnthropic();

export const execute = inngest.createFunction(
  { id: "execute-local-ai", retries: 0 },
  { event: "execute/ai" },
  async ({ event, step }) => {
    const { steps: ollamaSteps } = await step.ai.wrap(
      "ollama-generate-text",
      generateText,
      {
        model: ollama("gemma3:4b"),
        prompt: "what makes the best slushie?",
      }
    );
    const { steps: geminiSteps } = await step.ai.wrap(
      "gemini-generate-text",
      generateText,
      {
        system:
          "You are a chef, your job is to generate a recipe for a vegetarian lasagna recipe for 4 people.",
        prompt: "Write a vegetarian lasagna recipe for 4 people.",
        model: google("gemini-2.5-flash"),
      }
    );
    const { steps: openAISteps } = await step.ai.wrap(
      "openai-generate-text",
      generateText,
      {
        system:
          "You are a chef, your job is to generate a recipe for a vegetarian lasagna recipe for 4 people.",
        prompt: "Write a vegetarian lasagna recipe for 4 people.",
        model: openai("gpt-5-2025-08-07"),
      }
    );
    const { steps: anthropicSteps } = await step.ai.wrap(
      "anthropic-generate-text",
      generateText,
      {
        system:
          "You are a chef, your job is to generate a recipe for a vegetarian lasagna recipe for 4 people.",
        prompt: "Write a vegetarian lasagna recipe for 4 people.",
        model: anthropic("claude-haiku-4-5-20251001"),
      }
    );
    return {
      ollamaSteps,
      geminiSteps,
      openAISteps,
      anthropicSteps,
    };
  }
);
