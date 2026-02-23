import { redirect } from "next/navigation";
import { getCurrentUser } from "@/modules/authentication/action";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = await getCurrentUser();

  if (user) {
    redirect("/dashboard");
  }

  return <div className="min-h-screen bg-background">{children}</div>;
}
