"use client";

import { useState, useEffect } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useAIModels } from "@/modules/ai-agent/hook/ai-agent";
import { Spinner } from "@/components/ui/spinner";
import { ModelSelector } from "./model-selector";
import { useCreateChat } from "../hooks/chat";
import { toast } from "sonner";

interface ChatMessageFormProps {
  initialMessage?: string;
  onMessageChange?: (message: string) => void;
}

const ChatMessageForm = ({
  initialMessage,
  onMessageChange,
}: ChatMessageFormProps) => {
  const { data: models, isPending: isModelsPending } = useAIModels();

  const [selectedModel, setSelectedModel] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const { mutateAsync, isPending: isChatPending } = useCreateChat();

  useEffect(() => {
    if (models?.models?.length && !selectedModel) {
      setSelectedModel(models.models[0].id);
    }
  }, [models, selectedModel]);

  useEffect(() => {
    if (initialMessage) {
      setMessage(initialMessage);
      onMessageChange?.("");
    }
  }, [initialMessage, onMessageChange]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || isChatPending || !selectedModel) return;

    try {
      await mutateAsync({ content: message, model: selectedModel });
      toast.success("Message sent successfully");
      setMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
      // Toast is already handled in the hook onError, but we can have it here too or rely on hook
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-4 pb-6">
      <form onSubmit={handleSubmit}>
        <div className="relative rounded-2xl border-4 border-border shadow-shadow transition-all bg-secondary-background focus-within:ring-2 focus-within:ring-black focus-within:ring-offset-2">
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message here..."
            className="min-h-[60px] max-h-[200px] resize-none border-0 bg-transparent px-4 py-3 text-base focus-visible:ring-0 focus-visible:ring-offset-0"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e);
              }
            }}
          />

          <div className="flex items-center justify-between gap-2 px-3 py-2 border-t-2 border-border">
            {/* Model Selector */}
            <div className="flex items-center gap-1">
              {isModelsPending ? (
                <Spinner />
              ) : (
                <ModelSelector
                  models={models?.models || []}
                  selectedModelId={selectedModel}
                  onModelSelect={setSelectedModel}
                  className="ml-1"
                />
              )}
            </div>

            <Button
              type="submit"
              disabled={!message.trim() || isChatPending}
              size="sm"
              variant={message.trim() ? "default" : "neutral"}
              className="h-8 w-8 p-0 rounded-full"
            >
              {isChatPending ? (
                <Spinner className="text-primary-foreground" />
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  <span className="sr-only">Send message</span>
                </>
              )}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ChatMessageForm;
