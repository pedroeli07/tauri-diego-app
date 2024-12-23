import React from "react";
import { motion, Variants } from "framer-motion";
import Image from "next/image";
import { LightBarrierStatus } from "@/lib/types";

interface LightBarrierIconProps {
  status: LightBarrierStatus; // Usa o enum Status
  isDisconnected?: boolean; // Adiciona o estado desconectado
}

const LightBarrierIcon: React.FC<LightBarrierIconProps> = ({ status, isDisconnected }) => {
  const isActive = status === LightBarrierStatus.ACTIVE && !isDisconnected;

  const glowColor = isActive ? "#22c55e" : "#ef4444"; // Verde para ACTIVE, Vermelho para INACTIVE

  const glowVariants: Variants = isDisconnected
    ? {} // Sem animação quando desconectado
    : {
        animate: {
          boxShadow: [
            `0 0 12px 6px ${glowColor}`,
            `0 0 8px 4px ${glowColor}`,
          ],
          transition: {
            duration: 1.5,
            repeat: Infinity,
            repeatType: "reverse",
          },
        },
      };

  return (
    <motion.div
      className="relative flex items-center justify-center overflow-visible bg-transparent rounded-full w-16 h-16"
      variants={glowVariants}
      animate={!isDisconnected ? "animate" : undefined} // Apenas anima se não estiver desconectado
    >
      <Image
        src="/LBicon.svg"
        alt="Light Barrier Icon"
        className="relative z-10 w-full h-full object-contain"
        style={{
          filter: isDisconnected ? "none" : `drop-shadow(0 0 6px ${glowColor})`,
        }}
        width={64}
        height={64}
      />
    </motion.div>
  );
};


export default LightBarrierIcon;
