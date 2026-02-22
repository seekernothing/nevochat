"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { NeonChatMock } from "@/components/ui/NeonChatMock";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="relative min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center overflow-hidden py-12 md:py-24">
      {/* Background Decor */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20" />

      <div className="container px-4 md:px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex flex-col justify-center space-y-6 text-center lg:text-left"
          >
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="inline-flex items-center rounded-base border-2 border-border bg-main px-4 py-1.5 text-sm font-black uppercase tracking-widest text-main-foreground w-fit mx-auto lg:mx-0 shadow-[4px_4px_0px_0px_var(--border)]"
              >
                <div className="relative flex h-3 w-3 mr-3 items-center justify-center">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-main-foreground opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-main-foreground"></span>
                </div>
                NevoChat v2.0 is Live
              </motion.div>

              <h1 className="font-heading text-4xl sm:text-5xl xl:text-7xl font-bold tracking-tighter">
                Forge Conversations Into{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-main to-main/50">
                  Intelligence
                </span>
                .
              </h1>

              <p className="max-w-[600px] text-muted-foreground md:text-xl lg:text-lg xl:text-xl mx-auto lg:mx-0 font-medium leading-relaxed">
                The premium AI chat interface built for developers. Experience
                persistent memory, lightning-fast responses, and an architecture
                that puts you first.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="lg"
                  className="h-12 px-8 text-base shadow-shadow font-bold bg-main text-main-foreground hover:bg-main/90 border-2 border-border"
                >
                  Get Started for Free
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="lg"
                  variant="neutral"
                  className="h-12 px-8 text-base shadow-shadow font-bold border-2 border-border text-foreground hover:bg-secondary-background"
                >
                  <Link href="/signin">Sign In</Link>
                </Button>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            className="mx-auto w-full max-w-[500px] lg:max-w-none"
          >
            <NeonChatMock />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
