import Image from "next/image";
import React from "react";
import MotorSVG from "../../public/download-removebg-preview.png"; // Ajuste o caminho conforme necessário


interface MotorIconProps {
  speed: number; // Velocidade do motor (0 a 5000 RPM)
  direction: "CW" | "CCW"; // Direção: Horário (CW) ou Anti-Horário (CCW)
  status: "ON" | "OFF"; // Status do motor
}

const MotorIcon: React.FC<MotorIconProps> = ({ speed, direction, status }) => {
  // Calcula o tempo da rotação baseado na velocidade: mais rápido, menor duração
  const rotationDuration = status === "ON" ? Math.max(2, 10 - speed / 1000) : 0;

  return (
    <div
      style={{
        width: "100px",
        height: "100px",
        position: "relative",
        display: "inline-block",
        background: "none", // Sem fundo
        animation: status === "ON"
          ? `spin ${rotationDuration}s linear infinite ${direction === "CCW" ? "reverse" : "normal"}`
          : "none",
        transformOrigin: "center",
      }}
    >
      {/* Imagem do Motor */}
      <Image
        src={MotorSVG}
        alt="Motor Icon"
        style={{
          width: "100%",
          height: "100%",
          opacity: status === "ON" ? 1 : 0.5,
          filter: status === "ON" ? "drop-shadow(0 0 10px rgba(128, 0, 255, 0.7))" : "none",
        }}
      />

      {/* Indicador de Direção */}
      <div
        style={{
          position: "absolute",
          bottom: "-20px",
          left: "50%",
          transform: "translateX(-50%)",
          color: status === "ON" ? "blue" : "gray",
          fontSize: "12px",
        }}
      >
        
      </div>

      {/* Animação CSS */}
      <style>
        {`
          @keyframes spin {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(360deg);
            }
          }
        `}
      </style>
    </div>
  );
};

export default MotorIcon;
