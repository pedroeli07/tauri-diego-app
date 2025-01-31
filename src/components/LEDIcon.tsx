// src/components/LEDIcon.tsx

import React from "react";

interface LEDIconProps {
  intensity: number; // LED intensity (0 to 100)
  status: "ON" | "OFF"; // LED status
  className: string; // Additional CSS classes

}

/**
 * A component that renders an LED icon with a glow effect based on the `intensity` prop.
 * The `intensity` prop is a number between 0 and 100, where 0 is off and 100 is maximum brightness.
 * @param {{ intensity: number, status: "ON" | "OFF" }} props
 * @returns {React.ReactElement}
 */
const LEDIcon: React.FC<LEDIconProps> = ({ intensity, status, className }) => {
  /**
   * Function to determine the fill color based on intensity and status.
   */
  const getColor = (): string => {
    if (status === "OFF") {
      return "rgba(75, 75, 75, 1)"; // Gray color when OFF
    }
    // Calculate color based on intensity using HSL (Hue: 270 for violet)
    const lightness = 90 - (intensity / 100) * 50; // From 90% (very light) to 40% (vibrant)
    return `hsl(270, 100%, ${lightness}%)`;
  };

  /**
   * Function to determine the shadow opacity based on intensity.
   */
  const getShadowOpacity = (): number => {
    if (status === "OFF") return 0;
    // Opacity ranges from 0.1 (intensity 0) to 1 (intensity 100)
    return 0.1 + (intensity / 100) * 0.9;
  };

  /**
   * Function to determine the responsive size classes.
   */
  const getSizeClasses = (): string => {
    return "w-16 h-16 sm:w-16 sm:h-16 md:w-24 md:h-24 hidden 2xl:flex";
  };

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 55.91 55.91"
      className={`${getSizeClasses()} mx-auto`}
      style={{
        filter:
          status === "ON"
            ? `drop-shadow(0 0 ${Math.max(1, intensity / 5)}px rgba(128, 0, 255, ${getShadowOpacity()}))`
            : "none",
      }}
    >
      <path
        fill={getColor()}
        d="M55.703,29.779c-0.217-0.391-0.569-0.673-0.998-0.797l-18.135-5.2v-10.62c0-0.396-0.219-0.758-0.568-0.942
         c-0.125-0.066-0.26-0.096-0.396-0.109c-0.002,0-0.004-0.002-0.006-0.002l-2.146-0.398c0.943-0.386,2.207-0.381,3.299,0.071
         c0.63,0.245,1.244,0.703,1.896,1.188c0.889,0.661,1.807,1.343,2.986,1.68c3.655,0.887,7.141-1.318,9.688-2.93
         c0.33-0.21,0.428-0.648,0.219-0.98c-0.209-0.331-0.647-0.43-0.979-0.22c-2.33,1.476-5.523,3.495-8.566,2.757
         c-0.084-0.025-0.166-0.065-0.25-0.096c3.582,0.567,6.867-1.7,9.279-3.374c0.324-0.224,0.402-0.666,0.18-0.988
         c-0.225-0.323-0.666-0.403-0.987-0.179c-2.267,1.573-5.367,3.724-8.441,3.114c-0.912-0.22-1.748-0.789-2.559-1.34
         c-0.722-0.49-1.468-0.998-2.271-1.272c-1.883-0.688-4.094-0.377-5.377,0.756c-0.412,0.364-0.719,0.8-0.924,1.292l-3.412-0.633
         c-0.162-0.031-0.332-0.002-0.477,0.079l-7.129,4.003c-0.166,0.093-0.275,0.249-0.326,0.424c-0.08,0.151-0.125,0.319-0.125,0.494
         v2.991L2.134,13.663c-0.154-0.045-0.311-0.067-0.467-0.067c-0.736,0-1.395,0.495-1.6,1.204c-0.123,0.428-0.074,0.878,0.141,1.268
         c0.217,0.39,0.57,0.672,0.998,0.796l17.973,5.153v10.757c0,0.485,0.328,0.908,0.797,1.031l8.283,2.157V21.148h0.77v14.863
         c0.02-0.005,0.041-0.004,0.061-0.01c0.037-0.012,0.07-0.035,0.105-0.051c0.059-0.025,0.117-0.045,0.17-0.082l6.744-4.614
         c0.289-0.198,0.463-0.527,0.463-0.879v-3.127l17.207,4.934c0.885,0.254,1.818-0.277,2.066-1.137
         C55.968,30.619,55.918,30.169,55.703,29.779z"
      />
    </svg>
  );
};

export default LEDIcon;