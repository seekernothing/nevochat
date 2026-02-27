"use client";

import Image from "next/image";
import Link from "next/link";
import { signIn } from "@/lib/auth-client";
import { NevoChatLogo } from "@/components/ui/NevoChatLogo";
import { Button } from "@/components/ui/button";
import { SignInAnimation } from "@/components/ui/sign-in-animation";
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
    <div className="min-h-screen bg-background flex flex-col lg:flex-row relative overflow-hidden">
      {/* Background grid pattern spanning both sections smoothly */}
      <div className="absolute inset-0 bg-[linear-gradient(var(--border)_1px,transparent_1px),linear-gradient(to_right,var(--border)_1px,transparent_1px)] bg-size-[4rem_4rem] opacity-[0.03] pointer-events-none" />

      {/* Left Section: Graphic Animation (Hidden on mobile) */}
      <div className="hidden lg:flex flex-1 items-center justify-center p-8 lg:p-16 relative z-10 w-full max-w-3xl mx-auto">
        <SignInAnimation />
      </div>

      {/* Right Section: Sign In Form */}
      <div className="flex-1 flex items-center justify-center p-4 lg:p-12 relative z-10">
        <div className="w-full max-w-md">
          {/* Logo + Brand */}
          <div className="flex flex-col items-center mb-8">
            <Link href="/" className="flex items-center gap-3 mb-4 group">
              <div className="transition-transform group-hover:-rotate-12 bg-main border-4 border-border p-2 rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <NevoChatLogo size={48} />
              </div>
              <span className="text-4xl font-heading uppercase tracking-tight text-foreground" style={{ textShadow: "2px 2px 0px var(--main)"}}>
                NevoChat
              </span>
            </Link>
            <p className="text-sm text-foreground font-bold uppercase tracking-widest bg-chart-1/30 px-3 py-1 border-2 border-border rounded-base rotate-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              Welcome back
            </p>
          </div>

          {/* Sign In Card */}
          <Card className="relative w-full rounded-none border-4 border-border shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-white">
            <CardHeader className="text-center bg-chart-4/10 border-b-4 border-border pb-6">
              <CardTitle className="text-3xl font-heading uppercase tracking-wide">
                Sign In
              </CardTitle>
              <CardDescription className="text-foreground font-bold text-base mt-2">
                Choose a provider to continue
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4 pt-8 pb-6 px-6">
              <Button
                variant="neutral"
                className="w-full gap-3 font-heading h-14 text-lg border-2 border-border shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all bg-white"
                onClick={() => handleSocialSignIn("google")}
              >
                <Image
                  src="/google.svg"
                  alt="Google"
                  width={24}
                  height={24}
                  className="dark:invert"
                />
                Continue with Google
              </Button>
              <Button
                variant="neutral"
                className="w-full gap-3 font-heading h-14 text-lg border-2 border-border shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all bg-white"
                onClick={() => handleSocialSignIn("github")}
              >
                <Image
                  src="/github.svg"
                  alt="GitHub"
                  width={24}
                  height={24}
                  className="dark:invert"
                />
                Continue with GitHub
              </Button>
            </CardContent>

            <CardFooter className="flex justify-center border-t-2 border-border p-4 bg-muted/20">
              <p className="text-xs text-foreground font-base text-center max-w-[280px]">
                By signing in, you agree to our{" "}
                <Link
                  href="/terms"
                  className="font-bold text-chart-2 hover:text-main underline decoration-2 underline-offset-4 transition-colors"
                >
                  Terms
                </Link>{" "}
                and{" "}
                <Link
                  href="/privacy"
                  className="font-bold text-chart-2 hover:text-main underline decoration-2 underline-offset-4 transition-colors"
                >
                  Privacy Policy
                </Link>
              </p>
            </CardFooter>
          </Card>

          {/* Back to Home */}
          <div className="text-center mt-8">
            <Link
              href="/"
              className="inline-block px-6 py-2 bg-main border-2 border-border rounded-base shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-sm font-heading text-foreground hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all uppercase tracking-wide"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
