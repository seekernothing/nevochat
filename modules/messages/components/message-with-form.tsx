"use client";

import React from "react";
import ChatMessageForm from "@/modules/chat/components/chat-message-form";

const MessageWithForm = ({ chatId }: { chatId: string }) => {
  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="flex-1 overflow-y-auto p-4 flex flex-col space-y-4">
        {/* Messages will be rendered here in a future step */}
      </div>
      <div className="w-full">
        <ChatMessageForm />
      </div>
    </div>
  );
};

export default MessageWithForm;
