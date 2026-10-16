import React from 'react';
import { motion } from 'framer-motion';

export default function SmokeWaves({ className = "" }) {
  return (
    <div className={`relative w-full overflow-hidden pointer-events-none select-none ${className}`}>
      {/* Background Soft Smoke Silhouette */}
      <svg
        viewBox="0 0 1440 140"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-24 sm:h-32 md:h-36 block preserve-3d"
        preserveAspectRatio="none"
      >
        {/* Deep cloud layer */}
        <path
          d="M0 140V70C40 60 80 85 120 75C170 60 210 30 260 45C320 62 380 90 440 70C500 50 560 30 620 50C680 70 740 85 800 65C860 45 920 25 980 45C1040 65 1100 85 1160 65C1220 45 1280 30 1340 50C1380 65 1410 60 1440 70V140H0Z"
          fill="#E7DAC4"
          fillOpacity="0.55"
        />

        {/* Foreground rolling cloud puffs */}
        <path
          d="M0 140V85C30 70 70 65 105 80C140 95 180 80 215 70C260 55 300 70 340 90C390 110 440 85 480 75C530 60 580 80 625 95C670 110 720 85 765 75C815 60 865 80 910 95C955 110 1005 85 1050 75C1100 65 1145 80 1190 95C1235 110 1280 85 1320 75C1365 65 1405 80 1440 90V140H0Z"
          fill="#DFCEB3"
          stroke="#4A2E1B"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />

        {/* Swirl and curl line details matching mockup */}
        <g stroke="#6B3C1B" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.85">
          {/* Swirl 1 */}
          <path d="M120 100C130 92 145 95 142 108C140 118 126 118 122 110C118 102 125 92 138 90" />
          {/* Swirl 2 */}
          <path d="M360 105C370 98 385 102 380 112C376 120 365 120 360 114C356 108 362 98 375 96" />
          {/* Swirl 3 */}
          <path d="M640 102C650 95 665 98 662 108C658 116 648 116 642 110C638 104 644 95 655 93" />
          {/* Swirl 4 */}
          <path d="M930 105C940 98 955 102 950 112C946 120 935 120 930 114C926 108 932 98 945 96" />
          {/* Swirl 5 */}
          <path d="M1210 102C1220 95 1235 98 1232 108C1228 116 1218 116 1212 110C1208 104 1214 95 1225 93" />
        </g>
      </svg>
    </div>
  );
}
