"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { NevoChatLogo } from "@/components/ui/NevoChatLogo";
import { Separator } from "@/components/ui/separator";
import { Github } from "lucide-react";

export function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="border-t-2 border-border bg-background"
    >
      <div className="container mx-auto px-4 py-12">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <NevoChatLogo size={28} />
              <span
                className="text-lg font-heading tracking-tight uppercase text-foreground"
                style={{ textShadow: "2px 2px 0px var(--main)" }}
              >
                NevoChat
              </span>
            </Link>
            <p className="text-sm text-muted-foreground font-medium leading-relaxed max-w-[250px]">
              All open-source AI models in one beautiful chat interface. Free,
              fast, and private.
            </p>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="font-heading text-sm uppercase tracking-wider mb-4">
              Product
            </h3>
            <ul className="space-y-2.5">
              {[
                { label: "Features", href: "#" },
                { label: "Models", href: "#" },
                { label: "Pricing", href: "/pricing" },
                { label: "Changelog", href: "#" },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground font-medium hover:text-main transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h3 className="font-heading text-sm uppercase tracking-wider mb-4">
              Resources
            </h3>
            <ul className="space-y-2.5">
              {[
                { label: "Documentation", href: "#" },
                { label: "Help Center", href: "#" },
                { label: "Community", href: "#" },
                { label: "Blog", href: "#" },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground font-medium hover:text-main transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="font-heading text-sm uppercase tracking-wider mb-4">
              Legal
            </h3>
            <ul className="space-y-2.5">
              {[
                { label: "Privacy Policy", href: "#" },
                { label: "Terms of Service", href: "#" },
                { label: "Cookie Policy", href: "#" },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground font-medium hover:text-main transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator className="mb-6" />

        {/* Bottom Section */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm font-medium text-muted-foreground">
            © {new Date().getFullYear()} NevoChat. All rights reserved.
          </p>

          <div className="flex items-center gap-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-base border-2 border-border shadow-shadow flex items-center justify-center bg-background hover:bg-main hover:text-main-foreground transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}
