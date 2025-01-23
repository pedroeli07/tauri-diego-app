import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { Button } from "./ui/button";
import CustomSlider from "./ui/custom-slider";
import CustomTooltip from "./CustomTooltip";
import { Input } from "./ui/input";
import MotorIcon from "./MotorIcon";
import { Power, PowerOff } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Switch } from "./ui/switch"; // Importando o switch do ShadCN

interface Motor {
  id: number;
  status: "ON" | "OFF";
  speed: number;
  direction: "CW" | "CCW";
}

interface MotorCardProps {
  motors: Motor[];
  isConnected: boolean;
  isRecording: boolean;
  handleMotorToggle: (id: number) => void;
  handleMotorSetSpeed: (id: number, speed: number) => void;
  handleMotorSetDirection: (id: number, direction: "CW" | "CCW") => void;
  isProductionMode: boolean;
}

const MotorCard: React.FC<MotorCardProps> = ({
  motors,
  isConnected,
  isRecording,
  handleMotorToggle,
  handleMotorSetSpeed,
  handleMotorSetDirection,
  isProductionMode,
}) => {

  const [tempMotorValues, setTempMotorValues] = useState<Record<
    number,
    { speed: number; direction: "CW" | "CCW" }
  >>({});
  

  useEffect(() => {
    // Initialize tempMotorValues with current motor values
    const initialTempMotorValues = motors.reduce((acc, motor) => {
      acc[motor.id] = { speed: motor.speed, direction: motor.direction };
      return acc;
    }, {} as Record<number, { speed: number; direction: "CW" | "CCW" }>);
    setTempMotorValues(initialTempMotorValues);
  }, [motors]);


  const getStyles = (motor: Motor): React.CSSProperties => {
    const normalizedSpeed = motor.speed / 5000; // Normalize speed (0 to 1)
    const baseColor = motor.status === "ON" ? `hsl(210, 100%, 50%)` : "#2a2a2a"; // Azul em vez de roxo

    return {
      borderColor: baseColor,
      boxShadow:
        motor.status === "ON"
          ? `0 4px 10px rgba(93, 169, 233, ${normalizedSpeed}), 0 10px 20px rgba(93, 169, 233, ${
              normalizedSpeed * 0.8
            })`
          : "none",
      background: motor.status === "ON" ? "linear-gradient(to bottom, #1c1c1c, #0a0a0a)" : "#1a1a1a",
      transition: "all 0.3s ease",
    };
  };



  
  return (
    <div className="space-y-2 px-4 py-4 -mt-8">
      <Card className="bg-transparent border-none">
        <CardContent>
          <div className="w-full grid grid-cols-1 gap-4 p-2">
            {motors.map((motor) => {
              const tempSpeed = tempMotorValues[motor.id]?.speed ?? motor.speed;
              const tempDirection = tempMotorValues[motor.id]?.direction ?? motor.direction;

              return (
                <div
                  key={motor.id}
                  style={getStyles(motor)}
                  className={clsx(
                    "p-2 duration-300 flex flex-col bg-gradient-to-b from-[#0a0a0a] via-[#070707] to-[#000000] rounded-lg border-double border-4 w-full",
                    isRecording && "opacity-50 cursor-not-allowed"
                  )}
                >
                  {/* Linha Superior */}
                  <div className="flex justify-between items-center">
                    <h3
                      className={clsx(
                        "text-lg sm:text-xl font-bold ml-2",
                        motor.status === "ON" ? "text-blue-500" : "text-gray-700"
                      )}
                    >
                      Motor {motor.id}
                    </h3>

                    <div className="flex items-center space-x-4 sm:space-x-6">
                      <span
                        style={{
                          color: motor.status === "ON" ? "#5DA9E9" : "rgba(75, 75, 75, 1)",
                          textShadow:
                            motor.status === "ON"
                              ? `0 0 5px rgba(93, 169, 233, 0.7)`
                              : "none",
                        }}
                        className="text-sm sm:text-base font-bold"
                      >
                        {motor.status}
                      </span>
                      <span
                        style={{
                          color: motor.status === "ON" ? "#5DA9E9" : "rgba(75, 75, 75, 1)",
                          textShadow:
                            motor.status === "ON"
                              ? `0 0 5px rgba(93, 169, 233, 0.7)`
                              : "none",
                        }}
                        className="text-sm sm:text-base font-bold"
                      >
                        {motor.speed}Hz
                      </span>
                      <span
                        style={{
                          color: motor.status === "ON" ? "#5DA9E9" : "rgba(75, 75, 75, 1)",
                          textShadow:
                            motor.status === "ON"
                              ? `0 0 5px rgba(93, 169, 233, 0.7)`
                              : "none",
                        }}
                        className="text-sm sm:text-base font-bold"
                      >
                        {motor.direction}
                      </span>
                    </div>

                    <CustomTooltip
                      content={
                        motor.status === "ON"
                          ? `Turn Off Motor ${motor.id}`
                          : `Turn On Motor ${motor.id}`
                      }
                      placement="left"
                    >
                      <Button
                        onClick={() => handleMotorToggle(motor.id)}
                        disabled={!isConnected || isProductionMode}
                        variant="ghost"
                        className={clsx(
                          "p-1 sm:p-2 text-md active:scale-75 transition-all",
                          motor.status === "ON"
                            ? "text-blue-500 hover:text-blue-400"
                            : "text-gray-700 hover:text-blue-300 hover:bg-blue-900"
                        )}
                      >
                        {motor.status === "ON" ? <PowerOff size={20} /> : <Power size={20} />}
                      </Button>
                    </CustomTooltip>
                  </div>

                  {/* Configurações do Motor */}
                  <div
                    className={clsx(
                      "grid gap-2 sm:gap-4",
                      "2xl:grid-cols-3 grid-cols-2 items-center"
                    )}
                  >
                    <MotorIcon
                      speed={motor.speed}
                      direction={motor.direction}
                      status={motor.status}
                    />

                  

                    <div
                      className={clsx(
                        "flex  gap-2 sm:gap-4",
                        "2xl:flex-row items-center justify-center mr-36"
                      )}
                    >
                      <CustomTooltip content="Set Speed (Hz)" placement="top">
                        <div className="flex items-center space-x-2">
                          <Input
                            type="number"
                            value={tempSpeed}
                            onChange={(e) => {
                              const value = Math.min(
                                5000,
                                Math.max(0, parseInt(e.target.value) || 0)
                              );
                              setTempMotorValues((prev) => ({
                                ...prev,
                                [motor.id]: { ...prev[motor.id], speed: value },
                              }));
                            }}
                            className="w-[90px] text-xs sm:text-sm bg-gray-700 text-white rounded-md appearance-none"
                            min={0}
                            max={5000}
                            step={100}
                            disabled={!isConnected || isProductionMode}
                          />
                          <span className="text-gray-400 text-xs sm:text-sm ml-4">Hz</span>
                        </div>
                      </CustomTooltip>

                      <div className="flex items-center space-x-2">
                        <CustomTooltip content="Toggle Direction">
                          <Switch
                            checked={tempDirection === "CW"}
                            onCheckedChange={(checked) => {
                              const newDirection = checked ? "CW" : "CCW";
                              setTempMotorValues((prev) => ({
                                ...prev,
                                [motor.id]: {
                                  ...prev[motor.id],
                                  direction: newDirection,
                                },
                              }));
                            }}
                            className={clsx(
                              "bg-gray-600 border-2 border-gray-700 hover:bg-blue-500",
                              "focus:outline-none focus:ring-2 focus:ring-blue-400",
                              "transition-all duration-300"
                            )}
                            aria-label="Direction Toggle"
                          />
                        </CustomTooltip>
                        <span
                          style={{
                            color: motor.status === "ON" ? "#5DA9E9" : "rgba(75, 75, 75, 1)",
                            textShadow:
                              motor.status === "ON"
                                ? `0 0 5px rgba(93, 169, 233, 0.7)`
                                : "none",
                          }}
                          className="text-sm sm:text-base font-bold"
                        >
                          {tempDirection}
                        </span>
                      </div>

                      <Button
                        onClick={() => {
                          handleMotorSetSpeed(motor.id, tempSpeed);
                          handleMotorSetDirection(motor.id, tempDirection);
                          setTempMotorValues((prev) => ({
                            ...prev,
                            [motor.id]: { speed: tempSpeed, direction: tempDirection },
                          }));
                        }}
                        disabled={!isConnected || isProductionMode}
                        className={clsx(
                          "px-3 py-2 rounded-md transition-all mt-2 sm:mt-0",
                          motor.status === "ON"
                            ? "bg-blue-500 hover:bg-blue-600 text-white"
                            : "bg-gray-500 hover:bg-gray-600 text-gray-300 opacity-75 active:scale-75"
                        )}
                      >
                        Update
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MotorCard;