"use client";

interface NevoChatLogoProps {
  size?: number;
  className?: string;
}

export function NevoChatLogo({ size = 36, className }: NevoChatLogoProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 240 240"
      width={size}
      height={size}
      className={className}
      aria-label="NevoChat Logo"
    >
      <path
        d="M 80 22 H 160 A 40 40 0 0 1 200 62 V 142 A 40 40 0 0 1 160 182 H 90 L 40 218 L 60 176.6 A 40 40 0 0 1 40 142 V 62 A 40 40 0 0 1 80 22 Z"
        fill="none"
        stroke="var(--foreground)"
        strokeWidth="16"
        strokeLinejoin="round"
      />
      <circle cx="80" cy="142" r="8" fill="oklch(76.26% 0.21309 132.4002)" />
      <circle cx="160" cy="62" r="8" fill="oklch(76.26% 0.21309 132.4002)" />
      <path
        d="M 80 122 V 62 L 160 142 V 82"
        fill="none"
        stroke="oklch(76.26% 0.21309 132.4002)"
        strokeWidth="16"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
