import Header from "@/modules/chat/components/header";
import ChatSidebar from "@/modules/chat/components/chatsidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/sign-in");
  }

  // Placeholder for chats fetching logic, replacing with empty for now.
  const chats: any[] = [];

  return (
    <SidebarProvider>
      <div className="flex h-dvh w-full bg-background font-base text-foreground selection:bg-main selection:text-main-foreground overflow-hidden">
        <ChatSidebar user={session.user} chats={chats} />
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden w-full h-full">
          <Header />
          <main className="flex-1 overflow-y-auto relative p-4 lg:p-6 pb-safe mb-8 md:mb-0">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
