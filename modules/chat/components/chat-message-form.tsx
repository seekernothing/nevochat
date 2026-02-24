"use client";

import React, { useState, useEffect, useRef } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { SendIcon } from "lucide-react";

interface ChatMessageFormProps {
  initialMessage: string;
  onMessageChange: () => void;
}

const ChatMessageForm = ({
  initialMessage,
  onMessageChange,
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
    <form onSubmit={handleSubmit} className="w-full max-w-3xl px-4 mb-6">
      <div className="relative flex items-end border-4 border-border rounded-base bg-secondary-background shadow-shadow overflow-hidden">
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
          className="flex-1 min-h-[52px] max-h-[200px] resize-none border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 pr-14 text-base font-base overflow-y-auto"
          rows={1}
        />
        <Button
          type="submit"
          size="icon"
          disabled={!message.trim()}
          className="absolute right-2 bottom-2 h-9 w-9 shrink-0 disabled:opacity-40"
        >
          <SendIcon className="h-4 w-4" />
        </Button>
      </div>
    </form>
  );
};

export default ChatMessageForm;
