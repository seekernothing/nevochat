"use client";

import React, { useState, useEffect, useRef } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { SendIcon, Plus } from "lucide-react";
import { ModelSelector } from "./model-selector";
import { Skeleton } from "@/components/ui/skeleton";

interface ChatMessageFormProps {
  initialMessage: string;
  onMessageChange: () => void;
  models: any[];
  isLoading: boolean;
  isError: boolean;
  selectedModelId: string | null;
  onModelSelect: (id: string) => void;
}

const ChatMessageForm = ({
  initialMessage,
  onMessageChange,
  models,
  isLoading,
  isError,
  selectedModelId,
  onModelSelect,
}: ChatMessageFormProps) => {
  const [message, setMessage] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (initialMessage) {
      setMessage(initialMessage);
      textareaRef.current?.focus();
    }
  }, [initialMessage]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    // Placeholder: send message logic will go here
    console.log("Sending message:", message);
    setMessage("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
    onMessageChange();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full mb-6">
      <div className="relative flex flex-col border-4 border-border rounded-[24px] bg-secondary-background shadow-shadow overflow-hidden p-2 transition-all focus-within:ring-2 focus-within:ring-black focus-within:ring-offset-2">
        <Textarea
          ref={textareaRef}
          placeholder="Message NevoChat..."
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
            // Auto-resize: reset height then expand to scrollHeight
            const ta = textareaRef.current;
            if (ta) {
              ta.style.height = "auto";
              ta.style.height = `${ta.scrollHeight}px`;
            }
          }}
          onKeyDown={handleKeyDown}
          className="flex-1 min-h-[52px] max-h-[250px] resize-none border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 px-3 py-3 text-base font-base overflow-y-auto"
          rows={1}
        />

        <div className="flex items-center justify-between mt-1 px-1">
          <div className="flex items-center gap-2 text-muted-foreground">
            {/* Left side tools (e.g. upload) */}
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-9 w-9 rounded-full text-foreground/70 hover:text-foreground hover:bg-main/20"
            >
              <Plus className="h-5 w-5" />
            </Button>
          </div>

          <div className="flex items-center gap-2">
            {/* Model Selector placed inside the form */}
            {isLoading ? (
              <Skeleton className="h-9 w-32 rounded-full" />
            ) : isError ? (
              <span className="text-xs text-red-500 font-base px-2">
                Failed to load
              </span>
            ) : (
              <ModelSelector
                models={models}
                selectedModelId={selectedModelId}
                onModelSelect={onModelSelect}
                className="rounded-full shadow-none border-0 bg-main/10 hover:bg-main/20 hover:translate-x-0 hover:translate-y-0 text-foreground"
              />
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              size="icon"
              disabled={!message.trim()}
              className="h-10 w-10 shrink-0 rounded-full transition-all disabled:opacity-40"
            >
              <SendIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default ChatMessageForm;
