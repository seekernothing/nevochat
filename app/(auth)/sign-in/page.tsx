"use client";

import Image from "next/image";
import Link from "next/link";
import { signIn } from "@/lib/auth-client";
import { NevoChatLogo } from "@/components/ui/NevoChatLogo";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
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
      {/* Background grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,#000_40%,transparent_100%)] opacity-20 pointer-events-none" />

      {/* Left Section: Feature highlights (Hidden on mobile) */}
      <div className="hidden lg:flex flex-1 items-center justify-center p-8 lg:p-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-md space-y-8"
        >
          {/* Large branding */}
          <div>
            <h1 className="text-4xl xl:text-5xl font-heading tracking-tighter mb-4">
              Your AI,{" "}
              <span className="text-main">Your Way.</span>
            </h1>
            <p className="text-muted-foreground text-lg font-medium leading-relaxed">
              Open-source models, intelligent conversations, and seamless
              history — all in one place.
            </p>
          </div>

          {/* Feature list */}
          <div className="space-y-4">
            {[
              {
                icon: "🧠",
                title: "Chain-of-Thought Reasoning",
                desc: "Watch AI think step-by-step before answering.",
              },
              {
                icon: "⚡",
                title: "Lightning Fast Responses",
                desc: "Real-time streaming with zero lag.",
              },
              {
                icon: "🔒",
                title: "Private & Secure",
                desc: "Your conversations stay yours. Always.",
              },
            ].map((item) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                className="flex items-start gap-4 border-2 border-border rounded-base p-4 bg-secondary-background shadow-shadow"
              >
                <span className="text-2xl shrink-0">{item.icon}</span>
                <div>
                  <p className="font-heading text-sm">{item.title}</p>
                  <p className="text-sm text-muted-foreground font-medium">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Social proof */}
          <div className="flex items-center gap-3">
            <div className="flex -space-x-3">
              {[
                "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
              ].map((src, i) => (
                <div key={i} className="relative w-8 h-8 rounded-full border-2 border-border shadow-shadow overflow-hidden bg-secondary-background">
                  <Image src={src} alt="User Avatar" fill className="object-cover" />
                </div>
              ))}
            </div>
            <p className="text-sm text-muted-foreground font-medium">
              Trusted by developers worldwide
            </p>
          </div>
        </motion.div>
      </div>

      {/* Right Section: Sign In Form */}
      <div className="flex-1 flex items-center justify-center p-4 lg:p-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-full max-w-md"
        >
          {/* Logo + Brand */}
          <div className="flex flex-col items-center mb-4">
            <Link href="/" className="flex items-center gap-3 mb-3 group">
              <div className="transition-transform group-hover:-rotate-12 bg-main border-2 border-border p-2 rounded-base shadow-shadow">
                <NevoChatLogo size={36} />
              </div>
              <span
                className="text-2xl font-heading uppercase tracking-tight text-foreground"
                style={{ textShadow: "2px 2px 0px var(--main)" }}
              >
                NevoChat
              </span>
            </Link>
            <div className="inline-flex items-center rounded-full border-4 border-foreground bg-[#c4f092] px-4 py-1.5 text-xs font-black uppercase tracking-[0.2em] text-foreground shadow-[3px_3px_0px_0px_var(--foreground)] -rotate-2 mb-2 z-20">
              Welcome back
            </div>
          </div>

          {/* Sign In Card */}
          <Card className="relative w-full border-4 border-foreground rounded-xl shadow-[8px_8px_0px_0px_var(--foreground)] bg-white overflow-hidden">
            <CardHeader className="text-center pt-6 pb-6 px-8 border-b-4 border-foreground bg-[#fdf8e6]">
              <CardTitle className="text-3xl font-black uppercase tracking-widest text-foreground">
                Sign In
              </CardTitle>
              <CardDescription className="text-foreground font-bold text-sm mt-2 tracking-wide">
                Choose a provider to continue
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4 pt-6 pb-6 px-8 bg-white">
              {/* Google — fully rounded pill */}
              <Button
                variant="neutral"
                className="w-full gap-3 font-black h-14 text-base border-4 border-foreground rounded-full shadow-[4px_4px_0px_0px_var(--foreground)] hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none transition-all bg-white text-foreground"
                onClick={() => handleSocialSignIn("google")}
              >
                <div className="flex items-center justify-center bg-transparent">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="w-5 h-5 mr-1">
                    <path fill="#000000" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" />
                  </svg>
                </div>
                Continue with Google
              </Button>

              {/* GitHub — fully rounded pill */}
              <Button
                variant="neutral"
                className="w-full gap-3 font-black h-14 text-base border-4 border-foreground rounded-full shadow-[4px_4px_0px_0px_var(--foreground)] hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none transition-all bg-white text-foreground"
                onClick={() => handleSocialSignIn("github")}
              >
                <div className="flex items-center justify-center bg-transparent">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 h-6 mr-1">
                    <path fill="#000000" d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </div>
                Continue with GitHub
              </Button>
            </CardContent>

            <CardFooter className="flex flex-col gap-3 border-t-4 border-foreground px-8 py-5 bg-white">
              <p className="text-[12px] text-foreground font-bold text-center leading-relaxed max-w-[320px]">
                By signing in, you agree to our{" "}
                <Link
                  href="/terms"
                  className="font-black text-[#0ea5e9] hover:text-[#0284c7] underline decoration-2 underline-offset-4 transition-colors"
                >
                  Terms
                </Link>{" "}
                and{" "}
                <Link
                  href="/privacy"
                  className="font-black text-[#0ea5e9] hover:text-[#0284c7] underline decoration-2 underline-offset-4 transition-colors"
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
              className="inline-flex items-center gap-2 px-5 py-2 bg-white border-4 border-foreground rounded-full shadow-[4px_4px_0px_0px_var(--foreground)] text-xs font-black text-foreground hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none transition-all uppercase tracking-widest"
            >
              ← Back to Home
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
