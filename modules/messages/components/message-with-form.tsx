"use client";
import { useChat, type UIMessage } from "@ai-sdk/react";
import { useGetChatById } from "@/modules/chat/hooks/chat";
import { Fragment, useState, useEffect, useMemo, useRef } from "react";

import {
  Reasoning,
  ReasoningContent,
  ReasoningTrigger,
} from "@/components/ai-elements/reasoning";
import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import {
  Message,
  MessageContent,
  MessageResponse,
} from "@/components/ai-elements/message";
import {
  PromptInput,
  PromptInputBody,
  PromptInputButton,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputFooter,
  PromptInputTools,
} from "@/components/ai-elements/prompt-input";

import { Spinner } from "@/components/ui/spinner";
import { ModelSelector } from "@/modules/chat/components/model-selector";
import { useAIModels } from "@/modules/ai-agent/hook/ai-agent";
import { useChatStore } from "@/modules/chat/store/chat-store";
import { useSearchParams, useRouter } from "next/navigation";

import { RotateCcwIcon, StopCircleIcon } from "lucide-react";

export const MessageWithForm = ({ chatId }: { chatId: string }) => {
  const { data: models, isPending: isModelLoading } = useAIModels();
  const { data, isPending } = useGetChatById(chatId);
  const { hasChatBeenTriggered, markChatAsTriggered } = useChatStore();

  const [selectedModel, setSelectedModel] = useState(data?.data?.model);
  const [input, setInput] = useState("");

  const hasAutoTriggered = useRef(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const shouldAutoTrigger = searchParams.get("autoTrigger") === "true";

  const initialMessages: UIMessage[] = useMemo(() => {
    if (!data?.data?.messages) return [];

    return data.data.messages
      .filter((msg: any) => msg.content && msg.content.trim() !== "" && msg.id)
      .map((msg: any) => {
        try {
          const parts = JSON.parse(msg.content);

          return {
            id: msg.id,
            role: msg.messageRole.toLowerCase() as any,
            content: msg.content,
            parts: Array.isArray(parts)
              ? parts
              : [{ type: "text", text: msg.content }],
            createdAt: msg.createdAt ? new Date(msg.createdAt) : undefined,
          } as UIMessage;
        } catch (error) {
          return {
            id: msg.id,
            role: msg.messageRole.toLowerCase() as any,
            content: msg.content,
            parts: [{ type: "text", text: msg.content }],
            createdAt: msg.createdAt ? new Date(msg.createdAt) : undefined,
          } as UIMessage;
        }
      });
  }, [data]);
  const {
    stop,
    messages,
    status,
    sendMessage,
    regenerate,
    error,
    setMessages,
  } = useChat({
    messages: initialMessages,
  });

  const hasSynced = useRef(false);

  useEffect(() => {
    if (!isPending && !hasSynced.current) {
      setMessages(initialMessages as any);
      hasSynced.current = true;
    }
  }, [isPending, initialMessages, setMessages]);

  useEffect(() => {
    if (data?.data?.model && !selectedModel) {
      setSelectedModel(data.data.model);
    }
  }, [data, selectedModel]);

  useEffect(() => {
    if (hasAutoTriggered.current) return;
    if (!shouldAutoTrigger) return;
    if (hasChatBeenTriggered(chatId)) return;
    if (!selectedModel) return;
    if (initialMessages.length === 0) return;

    const lastMessage = initialMessages[initialMessages.length - 1];

    if (lastMessage.role !== "user") return;

    hasAutoTriggered.current = true;
    markChatAsTriggered(chatId);

    sendMessage(
      { text: null } as any,
      {
        body: {
          model: selectedModel,
          chatId,
          skipUserMessage: true,
        },
      } as any,
    );

    router.replace(`/chat/${chatId}`, { scroll: false });
  }, [
    shouldAutoTrigger,
    chatId,
    selectedModel,
    initialMessages,
    markChatAsTriggered,
    hasChatBeenTriggered,
    sendMessage,
    router,
  ]);

  if (isPending) {
    return (
      <div className="flex items-center justify-center h-full">
        <Spinner />
      </div>
    );
  }

  const handleSubmit = (messageData?: any, event?: any) => {
    if (!input.trim() && !messageData?.text?.trim()) return;

    sendMessage(
      { text: messageData?.text || input } as any,
      {
        body: {
          model: selectedModel,
          chatId,
        },
      } as any,
    );

    setInput("");
  };

  const handleRetry = () => {
    regenerate();
  };

  const handleStop = () => {
    stop();
  };

  const messageToRender = messages;

  return (
    <div className="max-w-4xl mx-auto p-6 relative size-full h-[calc(100vh-4rem)]">
      <div className="flex flex-col h-full">
        <Conversation className={"h-full"}>
          <ConversationContent>
            {messageToRender.length === 0 ? (
              <>
                <div className="flex flex-col items-center justify-center h-full gap-3">
                  <span className="text-5xl">💬</span>
                  <h3 className="text-xl font-heading text-foreground">
                    Start a conversation...
                  </h3>
                  <p className="text-sm text-foreground/60 font-base">
                    Type a message below to begin chatting
                  </p>
                </div>
              </>
            ) : (
              messageToRender.map((message: any) => {
                const partsToRender = message.parts || [
                  { type: "text", text: message.content },
                ];
                return (
                  <Fragment key={message.id}>
                    {partsToRender.map((part: any, i: number) => {
                      switch (part.type) {
                        case "text":
                          return (
                            <Message
                              from={message.role}
                              key={`${message.id}-${i}`}
                            >
                              <MessageContent>
                                <MessageResponse>{part.text}</MessageResponse>
                              </MessageContent>
                            </Message>
                          );

                        case "reasoning":
                          return (
                            <Reasoning
                              className="max-w-2xl px-4 py-4 border border-muted rounded-md bg-muted/50"
                              key={`${message.id}-${i}`}
                            >
                              <ReasoningTrigger />
                              <ReasoningContent className="mt-2 italic font-light text-muted-foreground">
                                {part.text}
                              </ReasoningContent>
                            </Reasoning>
                          );
                      }
                    })}
                  </Fragment>
                );
              })
            )}
            {status === "streaming" && (
              <div className="flex items-center gap-2 px-4 py-2 rounded-base border-2 border-border bg-main/10 w-fit">
                <Spinner />
                <span className="text-sm font-base text-foreground">
                  AI is thinking...
                </span>
              </div>
            )}
            {error && (
              <div className="p-4 mt-2 bg-secondary-background text-foreground border-2 border-border rounded-base shadow-shadow flex flex-col gap-2">
                <p className="text-sm font-heading">
                  ⚠️ Message failed to send
                </p>
                <p className="text-sm font-base leading-relaxed">
                  {error.message}
                </p>
                {error.message.includes("data policy") && (
                  <p className="text-xs mt-1 font-base">
                    You need to enable free models in your OpenRouter Privacy
                    settings:{" "}
                    <a
                      href="https://openrouter.ai/settings/privacy"
                      target="_blank"
                      className="underline font-heading hover:text-main transition-colors"
                    >
                      openrouter.ai/settings/privacy
                    </a>
                  </p>
                )}
              </div>
            )}
          </ConversationContent>
          <ConversationScrollButton />
        </Conversation>

        <PromptInput onSubmit={handleSubmit as any} className={"mt-4"}>
          <PromptInputBody>
            <PromptInputTextarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              // disabled={status === "" }
            />
          </PromptInputBody>
          <PromptInputFooter>
            <PromptInputTools className={"flex items-center gap-2"}>
              {isModelLoading ? (
                <Spinner />
              ) : (
                <ModelSelector
                  models={models?.models || []}
                  selectedModelId={selectedModel}
                  onModelSelect={setSelectedModel}
                />
              )}
              {status === "streaming" ? (
                <PromptInputButton onClick={handleStop}>
                  <StopCircleIcon size={16} />
                  <span>Stop</span>
                </PromptInputButton>
              ) : (
                messageToRender.length > 0 && (
                  <PromptInputButton onClick={handleRetry}>
                    <RotateCcwIcon size={16} />
                    <span>Retry</span>
                  </PromptInputButton>
                )
              )}
            </PromptInputTools>

            <PromptInputSubmit status={status} />
          </PromptInputFooter>
        </PromptInput>
      </div>
    </div>
  );
};

export default MessageWithForm;
