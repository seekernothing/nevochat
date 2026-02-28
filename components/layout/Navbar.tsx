"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { NevoChatLogo } from "@/components/ui/NevoChatLogo";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import React from "react";

export function Navbar() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="sticky top-0 z-50 w-full border-b-[3px] border-border bg-background/90 backdrop-blur-md shadow-[0_3px_0px_0px_var(--border)]"
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo — always visible on all devices */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0">
          <NevoChatLogo size={32} />
          <span className="text-xl font-heading tracking-tight uppercase text-foreground" style={{ textShadow: "2px 2px 0px var(--main)" }}>
            NevoChat
          </span>
        </Link>

        {/* Vertical Separator — Left */}
        <div className="hidden md:block h-8 border-l-[3px] border-border ml-4" />

        {/* Navigation Menu — centered on desktop */}
        <div className="hidden md:flex absolute left-1/2 -translate-x-1/2">
          <NavigationMenu>
            <NavigationMenuList className="gap-2">
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent text-foreground hover:bg-main hover:text-main-foreground border-2 border-transparent hover:border-border font-bold">
                  Products
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <a
                          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-main/20 border-2 border-border p-6 no-underline outline-none focus:shadow-md"
                          href="/"
                        >
                          <div className="mb-2 mt-4 text-lg font-heading text-main uppercase">
                            Nevo AI
                          </div>
                          <p className="text-sm font-bold leading-tight text-muted-foreground">
                            The core intelligence engine powering your
                            conversations.
                          </p>
                        </a>
                      </NavigationMenuLink>
                    </li>
                    <ListItem href="/docs" title="Documentation">
                      Comprehensive guides and API references.
                    </ListItem>
                    <ListItem href="/integrations" title="Integrations">
                      Connect NevoChat with your favorite tools.
                    </ListItem>
                    <ListItem href="/enterprise" title="Enterprise">
                      Advanced security and custom features.
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent text-foreground hover:bg-main hover:text-main-foreground border-2 border-transparent hover:border-border font-bold">
                  Resources
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    <ListItem title="Blog" href="/blog">
                      Latest news, updates, and articles.
                    </ListItem>
                    <ListItem title="Community" href="/community">
                      Join our Discord and connect with others.
                    </ListItem>
                    <ListItem title="Help Center" href="/help">
                      Find answers to common questions.
                    </ListItem>
                    <ListItem title="Status" href="/status">
                      Real-time system and API status.
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent text-foreground hover:bg-main hover:text-main-foreground border-2 border-transparent hover:border-border font-bold">
                  Company
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[300px] gap-3 p-4">
                    <ListItem title="About Us" href="/about">
                      Learn about our mission and team.
                    </ListItem>
                    <ListItem title="Careers" href="/careers">
                      We&apos;re hiring! View open positions.
                    </ListItem>
                    <ListItem title="Contact" href="/contact">
                      Get in touch with our team.
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    href="/pricing"
                    className="group inline-flex h-10 w-max items-center justify-center rounded-base bg-transparent px-4 py-2 text-sm font-bold transition-colors hover:bg-main hover:text-main-foreground border-2 border-transparent hover:border-border focus:outline-none"
                  >
                    Pricing
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Vertical Separator — Right */}
        <div className="hidden md:block h-8 border-l-[3px] border-border mr-4" />

        {/* Right side: Sign In + Mobile Menu */}
        <nav className="flex items-center gap-3">
          <Button
            asChild
            variant="default"
            className="hidden sm:inline-flex shadow-[4px_4px_0px_0px_var(--border)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_var(--border)] transition-all font-black text-main-foreground bg-main border-2 border-border uppercase tracking-widest"
          >
            <Link href="/sign-in">Sign In</Link>
          </Button>

          {/* Mobile Hamburger */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="neutral"
                  size="icon"
                  className="h-10 w-10 border-2 border-border shadow-shadow"
                >
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle mobile menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-[300px] sm:w-[400px] border-l-2 border-border bg-background flex flex-col p-8 pt-12"
              >
                {/* Mobile Sheet Header */}
                <div className="flex items-center gap-3 mb-10 pb-6 border-b-2 border-border">
                  <NevoChatLogo size={36} />
                  <span className="text-xl font-heading tracking-tight uppercase text-muted-foreground">
                    NevoChat
                  </span>
                </div>

                {/* Mobile Links */}
                <nav className="flex flex-col gap-2">
                  {[
                    { label: "Products", href: "/" },
                    { label: "Resources", href: "/resources" },
                    { label: "Company", href: "/company" },
                    { label: "Pricing", href: "/pricing" },
                  ].map(({ label, href }) => (
                    <Link
                      key={label}
                      href={href}
                      className="text-2xl font-heading font-bold border-b-2 border-border py-4 hover:text-main hover:translate-x-2 transition-all"
                    >
                      {label}
                    </Link>
                  ))}

                  <Button
                    asChild
                    size="lg"
                    variant="default"
                    className="mt-8 h-12 shadow-[4px_4px_0px_0px_var(--border)] font-black text-main-foreground bg-main border-2 border-border uppercase tracking-widest text-lg"
                  >
                    <Link href="/sign-in">Sign In</Link>
                  </Button>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      </div>
    </motion.header>
  );
}

const ListItem = ({
  className,
  title,
  children,
  ...props
}: React.ComponentPropsWithoutRef<"a"> & { title: string }) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          className={`block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-main hover:text-main-foreground border-2 border-transparent hover:border-border focus:bg-main focus:text-main-foreground ${className ?? ""}`}
          {...props}
        >
          <div className="text-sm font-heading leading-none uppercase tracking-wide">
            {title}
          </div>
          <p className="line-clamp-2 text-sm font-medium leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
};
