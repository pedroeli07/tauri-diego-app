//src/components/GlobalCard.tsx
import React from "react";
import clsx from "clsx";
import { Button } from "@/components/ui/button";
import CustomTooltip from "@/components/CustomTooltip";
import { Power, PowerOff } from "lucide-react";

interface GlobalCardProps {
  title: string;
  id: number;
  type: "LED" | "MOTOR" | string;
  status: "ON" | "OFF";
  intensity?: number;
  speed?: number;
  direction?: "CW" | "CCW";
  icon: React.ReactNode;
  onToggle: () => void;
  onUpdate: () => void;
  children: React.ReactNode;
}

const GlobalCard: React.FC<GlobalCardProps> = ({
  title,
  id,
  type,
  status,
  intensity,
  speed,
  direction,
  icon,
  onToggle,
  onUpdate,
  children,
}) => {
  return (
    <div
      className={clsx( 
        "p-2 rounded-md transition-all duration-300 flex flex-col space-y-2 overflow-hidden bg-gradient-to-b from-gray-800 via-black to-gray-700 border-2 border-gray-700",
        status === "ON" ? "bg-gray-900 border border-gray-800" : "bg-gray-800 border border-gray-700"
      )}
      style={{
        boxShadow:
          status === "ON"
            ? type === "LED"
              ? `0 0 ${intensity! / 4}px ${intensity! / 10}px rgba(128, 0, 255, 0.6),
                 inset 0 0 ${intensity! / 6}px ${intensity! / 20}px rgba(128, 0, 255, 0.3)`
              : type === "MOTOR"
              ? `0 0 ${speed! / 500}px rgba(128, 0, 128, 0.8), 0 0 ${speed! / 400}px rgba(128, 0, 128, 0.9)`
              : "none"
            : "none",
      }}
    >
      {/* Cabeçalho */}
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-bold text-white">{title}</h3>
        <CustomTooltip
          content={`Turn ${type} ${id} ${status === "ON" ? "Off" : "On"}`}
          placement="top"
        >
          <Button
            onClick={onToggle}
            variant="ghost"
            className={clsx(
              "p-2 transition-all text-lg",
              status === "ON" ? "text-purple-400 hover:text-purple-500" : "text-gray-500 hover:text-gray-400"
            )}
          >
            {status === "ON" ? <Power size={24} /> : <PowerOff size={24} />}
          </Button>
        </CustomTooltip>
      </div>

      {/* Ícone Animado */}
      <div className="flex justify-center">
        {icon}
      </div>

    

      {/* Controles Customizados */}
      <div className="flex flex-col space-y-2">{children}</div>

      {/* Botão Update */}
      <CustomTooltip content={`Update ${type}`} placement="top">
        <Button
          onClick={onUpdate}
          className="bg-purple-500 hover:bg-purple-600 text-white text-sm rounded-md px-4 py-1 w-full"
          disabled={status === "OFF"}
        >
          Update
        </Button>
      </CustomTooltip>
    </div>
  );
};

export default GlobalCard;
