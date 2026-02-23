"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";
import React from "react";
import { BellIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="flex h-16 w-full shrink-0 flex-row justify-between items-center border-b-4 border-border bg-main px-4 py-2 transition-[width] ease-linear">
      <div className="flex items-center gap-4">
        <SidebarTrigger className="-ml-1 text-main-foreground hover:bg-main-foreground/10" />
        <span className="font-heading text-lg uppercase tracking-tight">
          Nevochat
        </span>
      </div>

      <div className="flex items-center gap-4">
        <Button
          variant="noShadow"
          size="icon"
          className="bg-transparent hover:bg-main-foreground/10 text-main-foreground"
        >
          <BellIcon className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
};

export default Header;
