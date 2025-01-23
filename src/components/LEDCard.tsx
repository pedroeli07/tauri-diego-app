// src/components/LEDCard.tsx

import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { Button } from "./ui/button"; // Replace with your button component
import CustomSlider from "./ui/custom-slider2"; // Replace with your slider component
import LEDIcon from "./LEDIcon"; // Updated LEDIcon component
import { Power, PowerOff } from 'lucide-react';
import CustomTooltip from './CustomTooltip';
import { Card, CardContent } from "./ui/card";
import { Input } from "./ui/input";
import { LED } from "@/lib/types";

interface LEDCardProps {
  leds: LED[];
  isConnected: boolean;
  isRecording: boolean;
  handleLEDToggle: (id: number) => void;
  handleLEDSetIntensity: (id: number, intensity: number) => void;
  isProductionMode: boolean;
}

const LEDCard: React.FC<LEDCardProps> = ({
  leds,
  isConnected,
  isRecording,
  handleLEDToggle,
  handleLEDSetIntensity,
  isProductionMode
}) => {
  const [tempLEDValues, setTempLEDValues] = useState<Record<number, number>>({});

  // Monitora mudanças em 'leds' para detectar reset
  useEffect(() => {
    const isReset = leds.every((led) => led.status === "OFF" && led.intensity === 0);
    if (isReset) {
      setTempLEDValues({}); // Reseta tempLEDValues se todos os LEDs estiverem desligados e com intensidade 0
    }
  }, [leds]);
  /**
   * Function to calculate the border and shadow color based on intensity.
   */
  const getStyles = (led: LED): React.CSSProperties => {
    const intensity = led.intensity / 100; // Normalizar intensidade (0 a 1)
    const baseColor = led.status === "ON" 
      ? `hsl(270, 100%, ${30 + intensity * 20}%)` // Cor com base na intensidade
      : "rgba(50, 50, 50, 1)"; // Cinza escuro para OFF
  
    return {
      borderColor: baseColor, // Cor da borda
      boxShadow: led.status === "ON" 
        ? `0 4px 10px rgba(128, 0, 255, ${intensity}), 0 10px 20px rgba(128, 0, 255, ${intensity * 0.8})` 
        : "none", // Sem sombra para OFF
      background: led.status === "ON"
        ? "linear-gradient(to bottom, #1c1c1c, #0a0a0a)" // Gradiente para ON
        : "rgba(30, 30, 30, 1)", // Fundo sólido cinza escuro para OFF
      transition: "all 0.3s ease",
    };
  };

  return (
<div className="w-[550px] h-full py-5 relative mr-8 -mt-14">
  {/* Grid: 2 colunas fixas com espaçamento configurado */}
  <div className="p-1 2xl:p-4 grid grid-cols-1 sm:grid-cols-2 gap-x-2 gap-y-2 w-[90%]">
  {leds.map((led) => {
      return (
        <div key={led.id} className="w-full">
          <div
            style={getStyles(led)}
            className={clsx(
              "w-gull p-2 2xl:p-4 duration-300 flex flex-col space-y-2 overflow-hidden rounded-lg border-double border-4",
              isRecording && "opacity-50 cursor-not-allowed"
            )}
          >
            {/* Card Header */}
            <div className="flex justify-between items-center">
                <h3
                  className={clsx(
                    "text-xl sm:text-2xl font-bold",
                    led.status === "ON" ? "text-violet-700" : "text-gray-700"
                  )}
                >
                  LED {led.id}
                </h3>
              <CustomTooltip
                content={
                  led.status === "ON"
                    ? `Turn Off LED ${led.id}`
                    : `Turn On LED ${led.id}`
                }
                placement="right"
              >
                <Button
                    onClick={() => handleLEDToggle(led.id)}
                    disabled={!isConnected || isProductionMode}
                    variant="ghost"
                    className={clsx(
                      "p-2 transition-all text-lg active:scale-75",
                      led.status === "ON"
                        ? "text-violet-700 hover:text-purple-600"
                        : "text-gray-700 hover:text-violet-400 hover:bg-violet-900"
                    )}
                  >
                    {led.status === "ON" ? <PowerOff size={24} /> : <Power size={24} />}
                  </Button>
              </CustomTooltip>
            </div>
 {/* LED Icon and Status/Intensity Display: Responsive stacking */}
 <div className="flex flex-col items-center text-xl sm:text-2xl w-full">
                <LEDIcon
                  intensity={led.intensity}
                  status={led.status}
                  className="hidden 2xl:flex" // Hide on smaller screens
                />
  {/* Resto do conteúdo, como intensidade e status */}

 {/* Texto do Status (ON/OFF) */}
 <span
    style={{
      color: led.status === "ON"
        ? `hsl(270, 100%, ${90 - (led.intensity / 100) * 50}%)` // Cor dinâmica
        : "rgba(75, 75, 75, 1)", // Cinza escuro para OFF
      textShadow: led.status === "ON"
        ? `0 0 ${Math.max(1, led.intensity / 5)}px rgba(128, 0, 255, ${
            0.1 + (led.intensity / 100) * 0.9
          })` // Efeito de brilho
        : "none",
    }}
    className="text-base sm:text-lg font-extrabold mt-2 sm:mt-0" // Add margin on smaller screens
    >
    {led.status}
  </span>

  {/* Texto da Intensidade */}
  <div
    style={{
      color: led.status === "ON"
        ? `hsl(270, 100%, ${90 - (led.intensity / 100) * 50}%)`
        : "rgba(75, 75, 75, 1)",
      textShadow: led.status === "ON"
        ? `0 0 ${Math.max(1, led.intensity / 5)}px rgba(128, 0, 255, ${
            0.1 + (led.intensity / 100) * 0.9
          })`
        : "none",
    }}
    className="text-base sm:text-lg font-mono w-[3ch] text-center"
  >
    {led.intensity}%
  </div>
</div>


{/* Intensity Slider and Input */}
<div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4">
  <CustomTooltip content="Adjust Intensity (%)" placement="top">
    <CustomSlider
      value={tempLEDValues[led.id] ?? led.intensity}
      onChange={(value: number) =>
        setTempLEDValues((prev) => ({
          ...prev,
          [led.id]: value,
        }))
      }
      min={0}
      max={100}
      step={1}
      disabled={!isConnected || isProductionMode}
      className="w-full  2xl:flex xl:w-1/3 mx-auto"
    />
  </CustomTooltip>
  <CustomTooltip content="Adjust Intensity (%)" placement="top">
    <div className="flex items-center space-x-2 w-full sm:w-1/3 mx-auto">
      <Input
        type="number"
        value={tempLEDValues[led.id] ?? led.intensity}
        onChange={(e) =>
          setTempLEDValues((prev) => ({
            ...prev,
            [led.id]: Math.min(100, Math.max(0, parseFloat(e.target.value) || 0)),
          }))
        }
        className="w-full text-sm bg-gray-700 text-white rounded-md appearance-none"
        min={0}
        max={100}
        step={1}
        disabled={!isConnected || isProductionMode}
      />
      <span className="text-gray-400">%</span>
    </div>
  </CustomTooltip>
</div>

{/* Update Button */}
<Button
  onClick={() => {
    handleLEDSetIntensity(led.id, tempLEDValues[led.id] ?? led.intensity);
    setTempLEDValues((prev) => ({
      ...prev,
      [led.id]: tempLEDValues[led.id],
    }));
  }}
  disabled={!isConnected || isProductionMode}
  className={clsx(
    "w-1/2 mx-auto px-3 py-2 rounded-md transition-all mt-2 sm:mt-0",
    led.status === "ON"
      ? "bg-[#7221bd] hover:bg-[#451f68] text-white" // Cor vibrante para ON
      : "bg-gray-500 hover:bg-gray-600 text-gray-300 opacity-75 active:scale-75 transition-all" // Cinza escuro para OFF
  )}
>
  Update
</Button>
                  </div>
                </div>
              );
            })}
          </div>
          </div>
 
    )
};

export default LEDCard;