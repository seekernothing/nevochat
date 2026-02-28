"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function CTASection() {
  return (
    <section className="py-24 bg-secondary-background relative border-t-2 border-border overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:3rem_3rem] opacity-[0.04]" />

      <div className="container px-4 md:px-6 mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center justify-center text-center space-y-8 max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center rounded-base border-2 border-border bg-main px-4 py-1.5 text-sm font-black uppercase tracking-widest text-main-foreground shadow-shadow">
            Free & Open Source
          </div>

          <h2 className="text-3xl font-heading sm:text-4xl md:text-5xl xl:text-6xl text-foreground tracking-tight">
            Chat with the Best{" "}
            <span className="text-main">Open-Source AI Models</span>
          </h2>

          <p className="text-muted-foreground md:text-xl font-medium max-w-[500px]">
            Join NevoChat today — it&apos;s free, fast, and built for people who
            love great conversations.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                asChild
                size="lg"
                className="h-14 px-10 text-lg font-heading bg-main text-main-foreground border-2 border-border shadow-[6px_6px_0px_0px_var(--border)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[8px_8px_0px_0px_var(--border)] transition-all uppercase tracking-wide"
              >
                <Link href="/sign-in" className="flex items-center gap-2">
                  Get Started Free
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
            </motion.div>
          </div>

          <p className="text-muted-foreground text-sm font-medium">
            No credit card • No API keys • Just sign in and chat
          </p>
        </motion.div>
      </div>
    </section>
  );
}
