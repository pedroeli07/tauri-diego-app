// src/components/LightBarrierCard.tsx
import React from "react";
import clsx from "clsx";
import GlobalCard from "@/components/GlobalCard";
import CustomTooltip from "@/components/CustomTooltip";
import Blink from "@/components/Blink";

interface LightBarrierCardProps {
  lightBarrier: {
    id: number;
    status: "OK" | "ERROR";
    lastChanged: string;
  };
  onUpdate?: () => void; // Opcional, pois Light Barriers são apenas indicadores
}

const LightBarrierCard: React.FC<LightBarrierCardProps> = ({ lightBarrier }) => {
  const { id, status } = lightBarrier;

  return (
    <GlobalCard
      title={`Light Barrier ${id}`}
      id={id}
      type="LIGHT_BARRIER"
      status={status === "OK" ? "ON" : "OFF"}
      icon={
        <div className="w-12 h-12 flex items-center justify-center rounded-full bg-purple-700">
          {/* Ícone Personalizado para Light Barrier */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {status === "OK" ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            )}
          </svg>
        </div>
      }
      onToggle={() => {}} // Light Barriers não têm toggle
      onUpdate={() => {}} // Light Barriers não têm update
    >
      {/* Efeitos de Piscar nos Textos */}
      <div className="grid grid-cols-2 gap-2 items-center">
        <Blink className="text-purple-500 font-bold">
          {status === "OK" ? "OK" : "ERROR"}
        </Blink>
        {/* Poderia adicionar outras informações, se necessário */}
      </div>

      {/* Controles Customizados (Nenhum Controle Necessário) */}
      <div className="flex flex-col space-y-4 mt-4">
        {/* Placeholder para futuros controles, se necessário */}
      </div>
    </GlobalCard>
  );
};

export default LightBarrierCard;
