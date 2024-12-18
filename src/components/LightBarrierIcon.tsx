//SRC/components/LightBarrierIcon
import React from 'react';
import { motion, Variants } from 'framer-motion';
import Image from 'next/image';

enum Status {
    OK = "OK",
    ERROR = "ERROR",
    WARNING = "WARNING",
  }
  
interface LightBarrierIconProps {
    status: Status; // Usa o enum Status

   color?: string; // Base color for glow
   glowIntensity?: number; // Intensity of the glow effect
   glowSpeed?: number; // Speed of glow animation
   
}

const LightBarrierIcon: React.FC<LightBarrierIconProps> = ({
   status,
   color = '#FFFFFF',
   glowIntensity = 1.5,
   glowSpeed = 2,
}) => {
   const getGlowColor = () => {
      if (status === 'OK') return color;
      if (status === 'WARNING') return '#f59e0b';
      return '#6b7280'; // Gray for ERROR
   };

   const glowVariants: Variants = {
      animate: {
         boxShadow: [
            `0 0 ${glowIntensity * 10}px ${glowIntensity * 5}px ${getGlowColor()}`,
            `0 0 ${glowIntensity * 5}px ${glowIntensity * 2}px ${getGlowColor()}`,
         ],
         transition: {
            duration: glowSpeed,
            repeat: Infinity,
            repeatType: 'reverse',
         },
      },
   };

   return (
      <motion.div
         className="relative w-15 h-15 flex items-center justify-center overflow-visible bg-transparent rounded-t-full"
         variants={glowVariants}
         animate="animate"
      >
         {/* SVG sem fundo */}
         <Image
            src="/LBicon.svg"
            alt="Light Barrier Icon"
            width="60"
            height="60"
            className="relative z-10"
            style={{ filter: 'drop-shadow(0 0 8px rgba(235, 195, 245, 0.2))' }}
         />

         {/* Feixe de luz animado */}
         {status === 'OK' && (
   <motion.div
      className="absolute left-0 w-full h-2 bg-gradient-to-r from-transparent via-[#FFFFFF] to-transparent opacity-80"
      initial={{ y: '0%' }} // Começa no topo
      animate={{
         y: ['0%', '100%', '0%'], // Vai até o fundo e volta
      }}
      transition={{
         duration: glowSpeed * 2, // Duração ajustável
         ease: 'easeInOut', // Movimento suave
         repeat: Infinity, // Movimento contínuo
         repeatType: 'mirror', // Espelha o movimento no retorno
      }}
      style={{
         boxShadow: `0 0 12px 6px ${getGlowColor()}`, // Mantém o glow
      }}
   />
)}
      </motion.div>
   );
};

export default LightBarrierIcon;
