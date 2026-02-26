import {
  convertToModelMessages,
  streamText,
  type UIMessage,
  type ModelMessage,
} from "ai";
import db from "@/lib/db";
import { MessageRole, MessageType } from "@prisma/client";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { CHAT_SYSTEM_PROMPT } from "@/lib/prompt";
import { NextRequest } from "next/server";

// ── OpenRouter provider ──────────────────────────────────────────────
const provider = createOpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY,
});

// ── Types ────────────────────────────────────────────────────────────
interface StoredMessage {
  id: string;
  content: string;
  messageRole: MessageRole;
  createdAt: Date;
}

interface UIPart {
  type: string;
  text?: string;
}

interface ChatRequestBody {
  chatId: string;
  messages: UIMessage | UIMessage[];
  model: string;
  skipUserMessage?: boolean;
}

// ── Helpers ──────────────────────────────────────────────────────────

/**
 * Converts a stored DB message into the UI message format
 * that the AI SDK's `convertToModelMessages` expects.
 */
function convertStoredMessageToUI(msg: StoredMessage): UIMessage | null {
  try {
    const parts: UIPart[] = JSON.parse(msg.content);
    const validParts = parts.filter((part) => part.type === "text");

    if (validParts.length === 0) return null;

    return {
      id: msg.id,
      role: msg.messageRole.toLowerCase() as UIMessage["role"],
      parts: validParts as UIMessage["parts"],
    };
  } catch {
    // Fallback: treat content as plain text
    return {
      id: msg.id,
      role: msg.messageRole.toLowerCase() as UIMessage["role"],
      parts: [{ type: "text" as const, text: msg.content }],
    };
  }
}

/**
 * Serialises a UI message's parts array to JSON for DB storage.
 */
function extractPartsAsJSON(message: UIMessage): string {
  if (message.parts && Array.isArray(message.parts)) {
    return JSON.stringify(message.parts);
  }

  const content =
    typeof (message as unknown as { content: string }).content === "string"
      ? (message as unknown as { content: string }).content
      : "";

  return JSON.stringify([{ type: "text", text: content }]);
}

// ── POST handler ─────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  try {
    const {
      chatId,
      messages: newMessages,
      model,
      skipUserMessage,
    }: ChatRequestBody = await req.json();

    // 1. Load previous messages from DB (if continuing a chat)
    const previousMessages: StoredMessage[] = chatId
      ? await db.message.findMany({
          where: { chatId },
          orderBy: { createdAt: "asc" },
        })
      : [];

    // 2. Convert stored messages → UI format
    const uiMessages: UIMessage[] = previousMessages
      .map(convertStoredMessageToUI)
      .filter((msg): msg is UIMessage => msg !== null);

    // 3. Normalise incoming messages to an array
    const normalizedNewMessages: UIMessage[] = Array.isArray(newMessages)
      ? newMessages
      : [newMessages];

    // 4. Merge history + new messages
    const allUIMessages: UIMessage[] = [
      ...uiMessages,
      ...normalizedNewMessages,
    ];

    // 5. Convert to model messages (with fallback)
    let modelMessages: ModelMessage[];

    try {
      modelMessages = await convertToModelMessages(allUIMessages);
    } catch {
      // Fallback: manually map to simple role/content format
      modelMessages = allUIMessages
        .map((msg) => ({
          role: msg.role as "user" | "assistant",
          content: msg.parts
            .filter(
              (p): p is { type: "text"; text: string } => p.type === "text",
            )
            .map((p) => p.text)
            .join("\n"),
        }))
        .filter((m) => m.content) as ModelMessage[];
    }

    // 6. Stream the response
    const result = streamText({
      model: provider.chat(model),
      messages: modelMessages,
      system: CHAT_SYSTEM_PROMPT,
    });

    // 7. Return streaming response & persist messages on finish
    return result.toUIMessageStreamResponse({
      sendReasoning: true,
      originalMessages: allUIMessages,
      onFinish: async ({ responseMessage }) => {
        try {
          const messagesToSave: {
            chatId: string;
            content: string;
            messageRole: MessageRole;
            model: string;
            messageType: MessageType;
          }[] = [];

          // Save the latest user message (unless skipped)
          if (!skipUserMessage) {
            const latestUserMessage =
              normalizedNewMessages[normalizedNewMessages.length - 1];

            if (latestUserMessage?.role === "user") {
              messagesToSave.push({
                chatId,
                content: extractPartsAsJSON(latestUserMessage),
                messageRole: MessageRole.USER,
                model,
                messageType: MessageType.NORMAL,
              });
            }
          }

          // Save the assistant response
          if (responseMessage?.parts && responseMessage.parts.length > 0) {
            messagesToSave.push({
              chatId,
              content: extractPartsAsJSON(responseMessage as UIMessage),
              messageRole: MessageRole.ASSISTANT,
              model,
              messageType: MessageType.NORMAL,
            });
          }

          if (messagesToSave.length > 0) {
            await db.message.createMany({ data: messagesToSave });
          }
        } catch (error) {
          console.error("❌ Error saving messages:", error);
        }
      },
    });
  } catch (error) {
    console.error("❌ API Route Error:", error);

    const message =
      error instanceof Error ? error.message : "Internal server error";

    return new Response(
      JSON.stringify({
        error: message,
        details: String(error),
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}
