// components/LEDCard.tsx
import React from 'react';
import { Button } from '@/components/ui/button';
import CustomTooltip from './CustomTooltip';
import {Power, PowerOff,} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import CustomSlider from "@/components/ui/custom-slider";
import clsx from "clsx"; // Utility for conditional classNames
import LEDIcon from "@/components/LEDIcon";

interface LED {
  id: number;
  status: 'ON' | 'OFF';
  intensity: number;
}

interface LEDCardProps {
  leds: LED[];
  isConnected: boolean;
  isRecording: boolean;
  handleLEDToggle: (id: number) => void;
  tempIntensity: number;
  setTempIntensity: (value: number) => void;
  handleLEDIntensityChange: (id: number, intensity: number) => void;
}

const LEDCard: React.FC<LEDCardProps> = ({
  leds,
  isConnected,
  isRecording,
  handleLEDToggle,
  tempIntensity,
  setTempIntensity,
  handleLEDIntensityChange
}) => {
  return (
    <div className="space-y-4">
      <Card className="bg-gradient-to-b from-[#08060a] via-[#000000] to-[#08010f] rounded-lg border border-gray-700 shadow-xl hover:shadow-2xl transition-shadow">
        <CardHeader className="mb-2">
          <CardTitle className="text-xl text-center text-gray-100">LEDs</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {leds.map((led) => (
              <div key={led.id} className="flex flex-col space-y-2">
                {/* LED Card */}
                <div
                  className={clsx(
                    "p-4 rounded-md transition-all duration-300 flex flex-col space-y-4 overflow-hidden bg-gradient-to-b from-gray-800 via-black to-gray-900 border-2",
                    led.status === "ON" ? "border-purple-500" : "border-gray-700",
                    isRecording && "opacity-50 cursor-not-allowed"
                  )}
                >
                  {/* LED Header with Toggle Button */}
                  <div className="flex justify-between items-center">
                    <h3 className="text-2xl font-bold text-white">LED {led.id}</h3>
                    <Button
                      onClick={() => handleLEDToggle(led.id)}
                      disabled={!isConnected || isRecording}
                      variant="ghost"
                      className={clsx(
                        "p-2 transition-all text-lg",
                        led.status === "ON" ? "text-purple-500 hover:text-purple-600" : "text-gray-500 hover:text-gray-400"
                      )}
                      aria-label={`Toggle LED ${led.id}`}
                    >
                      {led.status === "ON" ? <PowerOff size={24} /> : <Power size={24} />}
                    </Button>
                  </div>

                  {/* LED Icon Display */}
                  <div className="flex justify-center text-2xl w-full h-full animate-blink">
                    <LEDIcon intensity={led.intensity} />
                    <div className="flex items-center space-x-2">
                      <span className={`text-[#7221bd] text-lg font-extrabold`}>
                        {led.status}
                      </span>
                    </div>
                  </div>

                  {/* Intensity Slider and Input */}
                  <div className="flex items-center space-x-4">
                    <CustomTooltip content="Adjust Intensity (%)" placement="top">
                      <CustomSlider
                        value={tempIntensity}
                        onChange={setTempIntensity}
                        min={0}
                        max={100}
                        step={0.1}
                        disabled={!isConnected || led.status === "OFF" || isRecording}
                      />
                    </CustomTooltip>
                    <CustomTooltip content="Set Intensity (%)" placement="top">
                      <div className="relative">
                        <Input
                          type="number"
                          value={tempIntensity}
                          onChange={(e) =>
                            setTempIntensity(
                              Math.min(100, Math.max(0, parseFloat(e.target.value) || 0))
                            )
                          }
                          className="w-20 text-sm bg-gray-700 text-white rounded-md appearance-none"
                          min={0}
                          max={100}
                          step={0.1}
                          disabled={!isConnected || led.status === "OFF" || isRecording}
                          style={{ MozAppearance: "textfield" }}
                          onWheel={(e) => e.currentTarget.blur()}
                        />
                        <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs">%</span>
                      </div>
                    </CustomTooltip>
                  </div>

                  {/* Update LED Button */}
                  <Button
                    onClick={() => handleLEDIntensityChange(led.id, tempIntensity)}
                    className="px-3 py-2 bg-[#7221bd] hover:bg-[#451f68] text-white rounded-md"
                    disabled={!isConnected || led.status === "OFF" || isRecording}
                  >
                    Update
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LEDCard;
