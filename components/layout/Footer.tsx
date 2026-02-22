"use client";

import { motion } from "framer-motion";

export function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="border-t-2 border-border bg-background py-8"
    >
      <div className="container mx-auto px-4 flex flex-col items-center justify-center space-y-4">
        <p className="text-sm font-medium text-muted-foreground text-center">
          © {new Date().getFullYear()} NevoChat. All rights reserved. Built with
          precision.
        </p>
        <div className="flex gap-4 text-sm font-bold opacity-70 hover:opacity-100 transition-opacity">
          <a href="#" className="hover:underline hover:text-main">
            Privacy
          </a>
          <span>•</span>
          <a href="#" className="hover:underline hover:text-main">
            Terms
          </a>
          <span>•</span>
          <a href="#" className="hover:underline hover:text-main">
            Contact
          </a>
        </div>
      </div>
    </motion.footer>
  );
}
