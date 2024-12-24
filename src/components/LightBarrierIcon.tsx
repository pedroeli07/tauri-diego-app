import React from "react";
import { motion, Variants } from "framer-motion";
import Image from "next/image";
import { LightBarrierStatus } from "@/lib/types";
import clsx from "clsx";

interface LightBarrierIconProps {
  status: LightBarrierStatus;
  isDisconnected?: boolean;
  className?: string; // Adicionando className
}

const LightBarrierIcon: React.FC<LightBarrierIconProps> = ({
  status,
  isDisconnected,
  className,
}) => {
  const isActive = status === LightBarrierStatus.ACTIVE && !isDisconnected;

  const glowColor = isActive ? "#22c55e" : "#ef4444";

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
      className={clsx(
        "relative flex items-center justify-center overflow-visible bg-transparent rounded-full",
        className || "", // Classes personalizadas externas
        "w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-8 lg:h-8 xl:w-10 xl:h-10 2xl:w-12 2xl:h-12" // Tamanhos responsivos
      )}
      variants={glowVariants}
      animate={!isDisconnected ? "animate" : undefined}
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