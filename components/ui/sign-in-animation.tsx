import React from 'react';

export const SignInAnimation = () => {
  return (
    <div className="relative w-full aspect-square max-w-[500px] flex items-center justify-center bg-transparent overflow-visible">
      {/* 
        Changing viewBox to 500 500 scales it naturally to the parent container. 
        Removed max-w-[800px] limit and the harsh patterned background inside the SVG.
      */}
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 500 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="overflow-visible drop-shadow-[6px_6px_0px_rgba(0,0,0,1)]"
      >
        <defs>
          <filter id="neobrutal-shadow">
            <feDropShadow dx="6" dy="6" stdDeviation="0" floodColor="#000" floodOpacity="1" />
          </filter>
        </defs>

        {/* Floating Background Stars */}
        <g className="animate-[pulse_4s_ease-in-out_infinite]" style={{ transformOrigin: "center" }}>
          {/* Star 1 */}
          <path
            d="M 80 120 L 95 160 L 135 175 L 95 190 L 80 230 L 65 190 L 25 175 L 65 160 Z"
            className="fill-main stroke-border animate-[bounce_4s_infinite]"
            strokeWidth="4"
            filter="url(#neobrutal-shadow)"
          />
          {/* Star 2 */}
          <path
            d="M 400 350 L 410 380 L 440 390 L 410 400 L 400 430 L 390 400 L 360 390 L 390 380 Z"
            className="fill-chart-4 stroke-border animate-[bounce_5s_infinite_reverse]"
            strokeWidth="4"
            filter="url(#neobrutal-shadow)"
            style={{ animationDelay: "1s" }}
          />
        </g>

        {/* Central Component Group - Smooth vertical float */}
        <g className="animate-[bounce_6s_ease-in-out_infinite]">
          {/* Main Bubble */}
          <g filter="url(#neobrutal-shadow)" transform="translate(40, 150) rotate(-10)">
            <path
              d="M0 30C0 13.4315 13.4315 0 30 0H140C156.569 0 170 13.4315 170 30V100C170 116.569 156.569 130 140 130H60L15 160L25 125C10 115 0 95 0 70V30Z"
              className="fill-chart-1 stroke-border"
              strokeWidth="5"
            />
            <rect x="35" y="45" width="100" height="12" rx="6" fill="black" />
            <rect x="35" y="75" width="60" height="12" rx="6" fill="black" />
          </g>

          {/* Secondary Bubble (Overlapping) */}
          <g filter="url(#neobrutal-shadow)" transform="translate(280, 220) rotate(15)">
            <path
               d="M160 30C160 13.4315 146.569 0 130 0H30C13.4315 0 0 13.4315 0 30V100C0 116.569 13.4315 130 30 130H100L145 160L135 125C150 115 160 95 160 70V30Z"
              className="fill-chart-2 stroke-border"
              strokeWidth="5"
            />
            <rect x="25" y="45" width="110" height="12" rx="6" fill="black" />
            <rect x="25" y="75" width="80" height="12" rx="6" fill="black" />
          </g>

          {/* Core AI Block (Pulsing and Floating) */}
          <g className="animate-[pulse_3s_ease-in-out_infinite] origin-center" transform="translate(130, 160)">
            <rect width="180" height="180" rx="35" className="fill-chart-5 stroke-border" strokeWidth="6" filter="url(#neobrutal-shadow)"/>
            {/* Smile / Arc */}
            <path d="M 40 80 Q 90 40 140 80" className="stroke-border" strokeWidth="10" strokeLinecap="round" fill="none" />
            {/* Eyes */}
            <circle cx="50" cy="130" r="15" fill="black" className="animate-[pulse_2s_infinite]" />
            <circle cx="130" cy="130" r="15" fill="black" className="animate-[pulse_2s_infinite]" style={{ animationDelay: '0.5s' }} />
            {/* Cheek Line */}
            <rect x="70" y="110" width="40" height="12" fill="black" rx="6" />
          </g>
        </g>
      </svg>
    </div>
  );
};
