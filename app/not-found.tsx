import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-[100dvh] flex flex-col items-center justify-center p-4 bg-background w-full relative overflow-hidden">
      {/* Background Decor Elements - Scaled down */}
      <div className="absolute top-16 left-8 md:left-16 w-24 h-24 md:w-28 md:h-28 bg-chart-2 rounded-full border-4 border-border shadow-[var(--shadow)] opacity-70 animate-pulse" />
      <div className="absolute bottom-16 right-8 md:right-16 w-20 h-20 md:w-24 md:h-24 bg-chart-4 rounded-base border-4 border-border shadow-[var(--shadow)] opacity-70 rotate-12" />
      <div className="absolute top-32 right-1/4 w-10 h-10 md:w-12 md:h-12 bg-chart-1 rounded-base border-4 border-border shadow-[var(--shadow)] opacity-80 -rotate-12 animate-bounce" />
      
      {/* Main Card - Scaled down */}
      <div className="relative z-10 border-4 border-border bg-main rounded-base p-8 md:p-12 max-w-xl w-full mx-4 text-center shadow-[var(--shadow)] transition-transform hover:-translate-y-1 duration-300">
        
        {/* Floating Accents - Scaled down */}
        <div className="absolute -top-6 -left-6 w-12 h-12 md:w-14 md:h-14 bg-chart-3 border-4 border-border rounded-full shadow-[var(--shadow)] flex items-center justify-center">
            <span className="text-xl md:text-2xl" aria-hidden="true">👀</span>
        </div>
        <div className="absolute -bottom-6 -right-6 w-12 h-12 md:w-14 md:h-14 bg-chart-1 border-4 border-border rounded-base shadow-[var(--shadow)] flex items-center justify-center -rotate-12">
            <span className="text-xl md:text-2xl" aria-hidden="true">🚀</span>
        </div>
        
        <h1 
          className="text-[96px] md:text-[144px] font-heading font-black leading-none text-main-foreground mb-2"
          style={{ textShadow: "4px 4px 0px var(--border)" }}
        >
          404
        </h1>
        
        <div className="h-2 bg-foreground w-24 md:w-32 mx-auto mb-6 md:mb-8 border border-border" />
        
        <h2 className="text-2xl md:text-4xl font-heading font-bold text-main-foreground mb-4 md:mb-6 uppercase tracking-wider">
          Lost in Space!
        </h2>
        
        <p className="text-base md:text-lg font-base font-medium text-main-foreground/90 mb-8 mx-auto max-w-md leading-relaxed">
          The page you're looking for doesn't exist or has wandered off into the digital void. Let's get you back on track.
        </p>
        
        <Button 
          asChild 
          className="h-auto text-lg px-8 py-5 bg-secondary-background text-foreground font-heading border-4 border-border shadow-[var(--shadow)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
        >
          <Link href="/">
            GO BACK HOME
          </Link>
        </Button>
      </div>
    </div>
  );
}
