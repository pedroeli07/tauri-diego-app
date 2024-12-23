import React, { useState } from "react";
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
  handleMotorSet: (id: number, speed: number, direction: "CW" | "CCW") => void;
  isProductionMode: boolean;
}

const MotorCard: React.FC<MotorCardProps> = ({
  motors,
  isConnected,
  isRecording,
  handleMotorToggle,
  handleMotorSet,
  isProductionMode,
}) => {
  const [tempMotorValues, setTempMotorValues] = useState<
    Record<number, { speed: number; direction: "CW" | "CCW" }>
  >({});

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
          <div className="w-auto grid grid-cols-1 gap-4 p-2">
            {motors.map((motor) => {
              const tempSpeed = tempMotorValues[motor.id]?.speed ?? motor.speed;
              const tempDirection =
                tempMotorValues[motor.id]?.direction ?? motor.direction;

              return (
                <div
                  key={motor.id}
                  style={getStyles(motor)}
                  className={clsx(
                    "p-2 duration-300 flex flex-col space-y-4 bg-gradient-to-b from-[#0a0a0a] via-[#070707] to-[#000000] rounded-lg border-double border-4 w-auto",
                    isRecording && "opacity-50 cursor-not-allowed"
                  )}
                >
                  {/* Linha Superior */}
                  <div className="flex justify-between items-center">
                    {/* Título e Status */}
                    <h3
                      className={clsx(
                        "text-xl sm:text-2xl font-bold ml-2",
                        motor.status === "ON" ? "text-blue-500" : "text-gray-700" // Azul substituindo roxo
                      )}
                    >
                      Motor {motor.id}
                    </h3>

                    {/* Textos de Status, Velocidade e Direção */}
                    <div className="flex items-center space-x-4">
                      <span
                        style={{
                          color:
                            motor.status === "ON"
                              ? "#5DA9E9"
                              : "rgba(75, 75, 75, 1)",
                          textShadow:
                            motor.status === "ON"
                              ? `0 0 5px rgba(93, 169, 233, 0.7)`
                              : "none",
                        }}
                        className="text-base sm:text-lg font-extrabold"
                      >
                        {motor.status}
                      </span>
                      <span
                        style={{
                          color:
                            motor.status === "ON"
                              ? "#5DA9E9"
                              : "rgba(75, 75, 75, 1)",
                          textShadow:
                            motor.status === "ON"
                              ? `0 0 5px rgba(93, 169, 233, 0.7)`
                              : "none",
                        }}
                        className="text-base sm:text-lg font-extrabold"
                      >
                        {motor.speed} Hz
                      </span>
                      <span
                        style={{
                          color:
                            motor.status === "ON"
                              ? "#5DA9E9"
                              : "rgba(75, 75, 75, 1)",
                          textShadow:
                            motor.status === "ON"
                              ? `0 0 5px rgba(93, 169, 233, 0.7)`
                              : "none",
                        }}
                        className="text-base sm:text-lg font-extrabold"
                      >
                        {motor.direction}
                      </span>
                    </div>

                    {/* Botão de Ligar/Desligar */}
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
                          "p-2 text-lg active:scale-75 transition-all",
                          motor.status === "ON"
                            ? "text-blue-500 hover:text-blue-400"
                            : "text-gray-700 hover:text-blue-300 hover:bg-blue-900"
                        )}
                      >
                        {motor.status === "ON" ? <PowerOff size={24} /> : <Power size={24} />}
                      </Button>
                    </CustomTooltip>
                  </div>

                  {/* Grid Principal */}
                  <div className="grid grid-cols-3 items-center gap-4 ">
                    {/* Ícone do Motor */}
                    <MotorIcon
                      speed={motor.speed}
                      direction={motor.direction}
                      status={motor.status}
                    />

                    {/* Slider de Velocidade */}
                    <CustomTooltip content="Adjust Speed (Hz)" placement="top">
                      <CustomSlider
                        value={tempSpeed}
                        onChange={(value) =>
                          setTempMotorValues((prev) => ({
                            ...prev,
                            [motor.id]: { ...prev[motor.id], speed: value },
                          }))
                        }
                        min={0}
                        max={5000}
                        step={100}
                        disabled={!isConnected || isProductionMode}
                        className="w-full bg-[#5DA9E9] text-[#5DA9E9]"
                      />
                    </CustomTooltip>

                    {/* Input de Velocidade com texto Hz */}
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
                          className="w-20 text-sm bg-gray-700 text-white rounded-md appearance-none"
                          min={0}
                          max={5000}
                          step={100}
                          disabled={!isConnected || isProductionMode}
                        />
                        <span className="text-gray-400">Hz</span>
                      </div>
                    </CustomTooltip>
                  </div>

                  {/* Linha Inferior */}
                  <div className="flex justify-between items-center">
                    {/* Switch para Direção */}
                    <div className="flex items-center space-x-4 ">
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
                            "bg-gray-600 border-2 border-gray-700 hover:bg-blue-500", // Azul no hover
                            "focus:outline-none focus:ring-2 focus:ring-blue-400", // Azul no foco
                            "transition-all duration-300 ml-4"
                          )}
                          aria-label="Direction Toggle"
                        />
                      </CustomTooltip>
                      <span className="text-sm text-gray-400">{tempDirection}</span>
                    </div>

                    {/* Botão de Atualizar */}
                    <Button
                      onClick={() => {
                        handleMotorSet(motor.id, tempSpeed, tempDirection);
                        setTempMotorValues((prev) => {
                          const updatedValues = { ...prev };
                          delete updatedValues[motor.id];
                          return updatedValues;
                        });
                      }}
                      disabled={!isConnected || isProductionMode}
                      className={clsx(
                        "px-3 py-2 rounded-md transition-all",
                        motor.status === "ON"
                          ? "bg-blue-500 hover:bg-blue-600 text-white"
                          : "bg-gray-500 hover:bg-gray-600 text-gray-300 opacity-75 active:scale-75 transition-all"
                      )}
                    >
                      Update
                    </Button>
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