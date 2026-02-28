"use client";

import { motion } from "framer-motion";
import { MessageSquare, Sparkles } from "lucide-react";

export function NeonChatMock() {
  return (
    <motion.div
      animate={{ y: [0, -12, 0] }}
      transition={{
        duration: 5,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      style={{ willChange: "transform" }}
      className="relative w-full max-w-lg mx-auto"
    >
      {/* Main Container */}
      <div className="rounded-base border-2 border-border bg-secondary-background p-4 shadow-shadow flex flex-col gap-4 aspect-square max-h-[500px] overflow-hidden relative z-10">
        {/* Top Bar Navigation Mock */}
        <div className="flex items-center justify-between border-b-2 border-border pb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-main border-2 border-border flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-main-foreground" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold leading-none">Nevo AI</span>
              <span className="text-xs text-muted-foreground mt-1">Online</span>
            </div>
          </div>
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full border-2 border-border bg-chart-3" />
            <div className="w-3 h-3 rounded-full border-2 border-border bg-chart-4" />
            <div className="w-3 h-3 rounded-full border-2 border-border bg-chart-1" />
          </div>
        </div>

        {/* Chat Messages Mock */}
        <div className="flex-1 flex flex-col gap-4 justify-end">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="self-end bg-main text-main-foreground rounded-base rounded-tr-sm px-4 py-2 border-2 border-border shadow-shadow max-w-[80%]"
          >
            <p className="text-sm font-medium">
              Explain quantum computing in simple terms.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.5 }}
            className="self-start bg-background text-foreground rounded-base rounded-tl-sm px-4 py-2 border-2 border-border shadow-shadow max-w-[80%] relative"
          >
            <p className="text-sm font-medium">
              Think of quantum bits like coins spinning in the air — they can
              be heads, tails, or both at once. This lets quantum computers
              solve certain problems exponentially faster.
            </p>
            {/* Typing Indicator dots mock */}
            <div className="absolute -bottom-6 left-2 flex gap-1 opacity-0 animate-pulse">
              <div className="w-1.5 h-1.5 bg-foreground rounded-full" />
              <div className="w-1.5 h-1.5 bg-foreground rounded-full delay-75" />
              <div className="w-1.5 h-1.5 bg-foreground rounded-full delay-150" />
            </div>
          </motion.div>
        </div>

        {/* Input Bar Mock */}
        <div className="mt-4 pt-4 border-t-2 border-border flex items-center gap-2">
          <div className="flex-1 bg-background border-2 border-border rounded-full h-10 px-4 flex items-center">
            <span className="text-sm text-foreground/50">
              Type your command...
            </span>
          </div>
          <div className="w-10 h-10 rounded-full bg-main border-2 border-border flex items-center justify-center shadow-shadow">
            <MessageSquare className="w-4 h-4 text-main-foreground" />
          </div>
        </div>
      </div>

      {/* Decorative background glow */}
      <div className="absolute -inset-1 bg-main opacity-20 blur-3xl rounded-base -z-10" />
    </motion.div>
  );
}
