import React from "react";
import clsx from "clsx";
import LightBarrierIcon from "./LightBarrierIcon";

enum LightBarrierStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}

interface LightBarrier {
  id: number;
  status: LightBarrierStatus;
  lastChanged: string; // Opcional: Data/hora da última mudança
}

interface LightBarrierCardProps {
  lightBarriers: LightBarrier[];
  isDisconnected: boolean; // Novo: Estado de desconexão
}

const LightBarrierCard: React.FC<LightBarrierCardProps> = ({ lightBarriers, isDisconnected }) => {
  return (
    <div
      className={clsx(
        "w-full rounded-lg border-double border-4 shadow-lg p-4 transition-all",
        isDisconnected
          ? "bg-gray-800 border-gray-700 shadow-none" // Aparência "desligada"
          : "bg-gradient-to-b from-[#0a0a0a] via-[#070707] to-[#000000] border-gray-900"
      )}
    >
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
        {lightBarriers.map((lb) => (
          <div
            key={lb.id}
            className={clsx(
              "flex flex-col items-center justify-center rounded-lg border-2 px-6 py-4 shadow-md w-full transition-all",
              isDisconnected
                ? "border-gray-600 bg-gray-700 text-gray-500" // Aparência desativada
                : lb.status === LightBarrierStatus.ACTIVE
                ? "border-green-500 bg-[#0a0f0a]"
                : "border-red-500 bg-[#2a0a0a]"
            )}
          >
            {/* ID */}
            <span
              className={clsx(
                "text-sm font-bold mb-2",
                isDisconnected
                  ? "text-gray-500"
                  : lb.status === LightBarrierStatus.ACTIVE
                  ? "text-green-400"
                  : "text-red-400"
              )}
            >
              LB {lb.id}
            </span>

            {/* Ícone */}
            <LightBarrierIcon
              status={lb.status}
              isDisconnected={isDisconnected} // Passa o estado desconectado para o ícone
            />

            {/* Status */}
            <span
              className={clsx(
                "mt-2 text-sm font-bold",
                isDisconnected
                  ? "text-gray-500"
                  : lb.status === LightBarrierStatus.ACTIVE
                  ? "text-green-400"
                  : "text-red-400"
              )}
            >
              {isDisconnected ? "DISCONNECTED" : lb.status}
            </span>

            {/* Última mudança (opcional) */}
            {!isDisconnected && (
              <span className="text-gray-500 text-xs">
                {lb.lastChanged}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LightBarrierCard;
