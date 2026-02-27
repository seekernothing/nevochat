import React from 'react';

export const GeneratingLoader = () => {
  return (
    <div className="flex items-center px-4 py-2 mt-2 rounded-base border-2 border-border bg-secondary-background shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] w-fit transition-all duration-300">
      <span 
        className="text-sm font-heading tracking-wide uppercase bg-clip-text text-transparent bg-linear-to-r from-foreground via-main to-foreground animate-shine"
        style={{ backgroundSize: '200% auto' }}
      >
        Generating chat...
      </span>
    </div>
  );
};
