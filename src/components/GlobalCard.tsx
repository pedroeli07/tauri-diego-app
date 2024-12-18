// src/components/GlobalCard.tsx

import React from "react";
import clsx from "clsx";
import { Button } from "@/components/ui/button";
import CustomTooltip from "@/components/CustomTooltip";
import { Power, PowerOff } from "lucide-react";
import { motion } from "framer-motion";

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
  isConnected: boolean;
  isUpdating: boolean; // Novo prop para indicar se está atualizando
  havePowerButton?: boolean;
  haveUpdateButton?: boolean;
}

/**
 * GlobalCard Component
 * Um componente de cartão reutilizável para diferentes dispositivos.
 */
const GlobalCard: React.FC<GlobalCardProps> = ({
  title,
  id,
  type,
  status,
  intensity = 0,
  speed,
  direction,
  icon,
  onToggle,
  onUpdate,
  children,
  isConnected,
  isUpdating,
  havePowerButton = true,
  haveUpdateButton = true,
}) => {
  /**
   * Função para calcular box-shadow baseado na intensidade.
   */
  const calculateBoxShadow = () => {
    if (status === "OFF" || intensity === 0) {
      return "0 0 5px rgba(0, 0, 0, 0)";
    }

    const shadowIntensity = (intensity / 100) * 20;

    return `0 0 ${shadowIntensity}px rgba(128, 0, 255, 0.7), 0 ${shadowIntensity / 2}px ${shadowIntensity}px rgba(128, 0, 255, 0.7)`;
  };

  return (
    <motion.div
      style={{
        boxShadow: calculateBoxShadow(),
      }}
      className={clsx(
        "p-4 rounded-md transition-all duration-300 flex flex-col space-y-4 overflow-hidden bg-gradient-to-b from-gray-800 via-black to-gray-700 border-2",
        status === "ON" ? "border-purple-500" : "border-gray-700"
      )}
    >
      {/* Seção do Cabeçalho */}
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-bold text-white">{title}</h3>
        {havePowerButton && (
          <CustomTooltip content={`Turn ${type} ${id} ${status === "ON" ? "Off" : "On"}`} placement="top">
            <Button
              onClick={onToggle}
              variant="ghost"
              className={clsx(
                "p-2 transition-all text-lg",
                status === "ON" ? "text-purple-500 hover:text-purple-600" : "text-gray-500 hover:text-gray-400"
              )}
            >
              {status === "ON" ? <PowerOff size={24} /> : <Power size={24} />}
            </Button>
          </CustomTooltip>
        )}
      </div>

      {/* Ícone Animado */}
      <div className="flex justify-center">{icon}</div>

      {/* Efeito de Piscar */}
      <motion.div
        className="w-full h-2 rounded-full"
        animate={{
          opacity: [1, 0.5, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          backgroundColor: "rgba(128, 0, 255, 0.6)",
        }}
      />

      {/* Controles Personalizados */}
      {children && <div className="flex flex-col space-y-4">{children}</div>}

      {/* Botão de Update */}
      {haveUpdateButton && (
        <CustomTooltip content={`Update ${type}`} placement="bottom">
          <Button
            onClick={onUpdate}
            className={`mt-4 px-4 py-2 rounded-lg text-white ${
              isUpdating ? "bg-purple-800 cursor-not-allowed" : "bg-purple-500 hover:bg-purple-600 cursor-pointer"
            }`}
            disabled={isUpdating}
          >
            {isUpdating ? "Updating..." : "Update"}
          </Button>
        </CustomTooltip>
      )}
    </motion.div>
  );
};

export default GlobalCard;
