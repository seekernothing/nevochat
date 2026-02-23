"use client";

import Image from "next/image";
import Link from "next/link";
import { signIn } from "@/lib/auth-client";
import { NevoChatLogo } from "@/components/ui/NevoChatLogo";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function SignInPage() {
  const handleSocialSignIn = async (provider: "google" | "github") => {
    await signIn.social({
      provider,
      callbackURL: "/dashboard",
    });
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(var(--border)_1px,transparent_1px),linear-gradient(to_right,var(--border)_1px,transparent_1px)] bg-size-[4rem_4rem] opacity-[0.03]" />

      {/* Decorative floating elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-main/10 border-2 border-border rounded-base rotate-12 hidden lg:block" />
      <div className="absolute bottom-32 right-16 w-16 h-16 bg-main/20 border-2 border-border rounded-full hidden lg:block" />
      <div className="absolute top-40 right-32 w-12 h-12 bg-main/15 border-2 border-border rounded-base -rotate-6 hidden lg:block" />

      <div className="w-full max-w-md relative z-10">
        {/* Logo + Brand */}
        <div className="flex flex-col items-center mb-8">
          <Link href="/" className="flex items-center gap-3 mb-4 group">
            <div className="transition-transform group-hover:-rotate-12">
              <NevoChatLogo size={48} />
            </div>
            <span className="text-3xl font-heading uppercase tracking-tight text-foreground">
              NevoChat
            </span>
          </Link>
          <p className="text-sm text-muted-foreground font-bold uppercase tracking-widest">
            Welcome back
          </p>
        </div>

        {/* Sign In Card */}
        <Card className="relative">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl uppercase tracking-wide">
              Sign In
            </CardTitle>
            <CardDescription className="text-muted-foreground font-bold">
              Choose a provider to continue
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-3">
            <Button
              variant="neutral"
              className="w-full gap-3 font-bold h-12 text-base"
              onClick={() => handleSocialSignIn("google")}
            >
              <Image
                src="/google.svg"
                alt="Google"
                width={20}
                height={20}
                className="dark:invert"
              />
              Continue with Google
            </Button>
            <Button
              variant="neutral"
              className="w-full gap-3 font-bold h-12 text-base"
              onClick={() => handleSocialSignIn("github")}
            >
              <Image
                src="/github.svg"
                alt="GitHub"
                width={20}
                height={20}
                className="dark:invert"
              />
              Continue with GitHub
            </Button>
          </CardContent>

          <CardFooter className="flex justify-center">
            <p className="text-xs text-muted-foreground text-center">
              By signing in, you agree to our{" "}
              <Link
                href="/terms"
                className="font-bold text-main underline underline-offset-4 hover:text-foreground transition-colors"
              >
                Terms
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                className="font-bold text-main underline underline-offset-4 hover:text-foreground transition-colors"
              >
                Privacy Policy
              </Link>
            </p>
          </CardFooter>
        </Card>

        {/* Back to Home */}
        <div className="text-center mt-6">
          <Link
            href="/"
            className="text-sm font-bold text-muted-foreground hover:text-foreground transition-colors uppercase tracking-wide"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
