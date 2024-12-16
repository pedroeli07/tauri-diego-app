import React from "react";

interface MotorIconProps {
  speed: number; // Velocidade do motor (0 a 5000 RPM)
  direction: "CW" | "CCW"; // Direção: Horário (CW) ou Anti-Horário (CCW)
  status: "ON" | "OFF"; // Status do motor
}

const MotorIcon: React.FC<MotorIconProps> = ({ speed, direction, status }) => {
  const rotation = status === "ON" ? (direction === "CW" ? speed : -speed) : 0;

  return (
    <div
      style={{
        width: "100px",
        height: "100px",
        position: "relative",
        display: "inline-block",
        animation: rotation
          ? `spin ${Math.max(1, 5000 / speed)}s linear infinite`
          : undefined,
        transformOrigin: "center",
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        version="1.0"
        viewBox="0 0 1234 1234"
        className="w-full h-full"
        style={{
          fill: status === "ON" ? "rgba(128, 0, 255, 0.7)" : "gray",
          filter: `drop-shadow(0 0 ${speed / 50}px rgba(128, 0, 255, ${
            status === "ON" ? 0.5 : 0
          }))`,
        }}
      >
        {/* Adicione aqui o SVG do motor */}
        <path
          fillOpacity=".1"
          d="M412.4 664c0 9.6.2 13.6.3 8.7.2-4.8.2-12.6 0-17.5-.1-4.8-.3-.8-.3 8.8m68.1..."
        />
        {/* Inclua outros elementos do seu SVG */}
      </svg>
      {/* Indicador de direção */}
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
        {direction === "CW" ? "↻ CW" : "↺ CCW"}
      </div>
    </div>
  );
};

export default MotorIcon;
