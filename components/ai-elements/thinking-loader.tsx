import React from 'react';
import { Spinner } from "@/components/ui/spinner";

export const ThinkingLoader = () => {
  return (
    <div className="flex items-center gap-3 px-4 py-2 mt-2 rounded-base border-2 border-border bg-secondary-background shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] w-fit transition-all duration-300">
      <Spinner className="w-4 h-4 text-main" />
      <span 
        className="text-sm font-heading tracking-wide uppercase bg-clip-text text-transparent bg-linear-to-r from-foreground via-chart-4 to-foreground animate-shine"
        style={{ backgroundSize: '200% auto' }}
      >
        AI is thinking...
      </span>
    </div>
  );
};
