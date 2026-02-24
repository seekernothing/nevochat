"use client";

import React, { useState } from "react";
import ChatWelcomeTabs from "./chat-welcome-tabs";
import ChatMessageForm from "./chat-message-form";
import { useAIModels } from "@/modules/ai-agent/hook/ai-agent";

interface ChatMessageViewProps {
  user: { name?: string } | null;
}

const ChatMessageView = ({ user }: ChatMessageViewProps) => {
  const [selectedMessage, setSelectedMessage] = useState("");
  const [selectedModelId, setSelectedModelId] = useState<string | null>(null);
  const { data, isLoading, isError } = useAIModels();

  const models = data?.models || [];

  const handleMessageSelect = (message: string) => {
    setSelectedMessage(message);
  };

  const handleMessageChange = () => {
    setSelectedMessage("");
  };

  return (
    <div className="flex flex-col items-center justify-center h-full space-y-10">
      <ChatWelcomeTabs
        userName={user?.name || "User"}
        onMessageSelect={handleMessageSelect}
      />
      <div className="w-full max-w-3xl px-4 flex flex-col gap-3">
        <ChatMessageForm
          initialMessage={selectedMessage}
          onMessageChange={handleMessageChange}
          models={models}
          isLoading={isLoading}
          isError={isError}
          selectedModelId={selectedModelId}
          onModelSelect={setSelectedModelId}
        />
      </div>
    </div>
  );
};

export default ChatMessageView;
