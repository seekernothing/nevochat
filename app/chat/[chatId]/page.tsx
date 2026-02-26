import ActiveChatLoader from "@/modules/messages/components/active-chat-loader";
import MessageWithForm from "@/modules/messages/components/message-with-form";
import React from "react";

const Page = async ({ params }: { params: Promise<{ chatId: string }> }) => {
  const { chatId } = await params;

  // Apply specific sizing to fill the dashboard layout remainder perfectly
  return (
    <div className="flex flex-col h-full w-full absolute inset-0">
      <ActiveChatLoader chatId={chatId} />
      <MessageWithForm chatId={chatId} />
    </div>
  );
};

export default Page;
