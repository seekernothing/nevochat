import { redirect } from "next/navigation";
import { getCurrentUser } from "@/modules/authentication/action";
import ChatMessageView from "@/modules/chat/components/chat-message-view";

export default async function DashboardPage() {
  const { user } = await getCurrentUser();

  if (!user) {
    redirect("/sign-in");
  }

  return (
    <div className="flex h-full items-center justify-center">
      <ChatMessageView user={user} />
    </div>
  );
}
