import { redirect } from "next/navigation";
import { getCurrentUser } from "@/modules/authentication/action";

export default async function DashboardPage() {
  const { user } = await getCurrentUser();

  if (!user) {
    redirect("/sign-in");
  }

  return (
    <div className="flex h-full items-center justify-center">
      <div className="flex flex-col items-center gap-4 text-center">
        <h1 className="text-4xl md:text-5xl font-heading uppercase tracking-tight text-foreground">
          Welcome to Nevochat
        </h1>
        <p className="font-base text-lg text-foreground/80 max-w-md">
          Create a new chat from the sidebar or select an existing one to get
          started.
        </p>
      </div>
    </div>
  );
}
