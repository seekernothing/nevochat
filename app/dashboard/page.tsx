import { redirect } from "next/navigation";
import { getCurrentUser } from "@/modules/authentication/action";
import UserButton from "@/modules/authentication/components/user-button";

export default async function DashboardPage() {
  const { user } = await getCurrentUser();

  if (!user) {
    redirect("/sign-in");
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="flex h-16 items-center border-b px-4 md:px-6">
        <div className="ml-auto flex items-center space-x-4">
          <UserButton user={user} />
        </div>
      </header>
      <main className="flex-1 p-4 md:p-6 flex items-center justify-center">
        <h1 className="text-4xl font-heading uppercase tracking-tight text-foreground">
          Welcome to Dashboard
        </h1>
      </main>
    </div>
  );
}
