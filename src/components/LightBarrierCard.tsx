import React, { useEffect } from "react";
import clsx from "clsx";
import LightBarrierIcon from "./LightBarrierIcon";

enum LightBarrierStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}

interface LightBarrier {
  id: number;
  status: LightBarrierStatus;
  lastChanged: string;
}

interface LightBarrierCardProps {
  lightBarriers: LightBarrier[];
  isConnected: boolean;
  handleLightBarrierUpdate: (id: number, status: LightBarrierStatus) => void;
}

const LightBarrierCard: React.FC<LightBarrierCardProps> = ({
  lightBarriers,
  isConnected,
  handleLightBarrierUpdate,
}) => {
  useEffect(() => {
    // Opcional: Resetar todas as barreiras para INACTIVE na conexão
    if (isConnected) {
      lightBarriers.forEach(lb => {
        handleLightBarrierUpdate(lb.id, LightBarrierStatus.INACTIVE);
      });
    }
  }, [isConnected]);

  return (
    <div className="bg-transparent border-none w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full mt-5">
        {lightBarriers.map((lb) => (
          <div
            key={lb.id}
            className={clsx(
              "flex flex-col items-center justify-center rounded-lg border-2 px-4 py-4 shadow-md w-full h-28 xl:h-36",
              lb.status === LightBarrierStatus.ACTIVE
                ? "border-green-500"
                : "border-red-500"
            )}
          >
            {/* ID */}
            <span
              className={clsx(
                "text-xs sm:text-sm xl:text-base font-bold mb-1 xl:mb-2",
                lb.status === LightBarrierStatus.ACTIVE
                  ? "text-green-400"
                  : "text-red-400"
              )}
            >
              LB {lb.id}
            </span>

            {/* Ícone: Removido em telas menores que xl */}
            <div className="hidden xl:block">
              <LightBarrierIcon
                status={lb.status}
                className="w-12 h-12 sm:w-16 sm:h-16"
              />
            </div>

            {/* Status */}
            <span
              className={clsx(
                "mt-1 xl:mt-2 text-xs  xl:text-sm font-bold",
                lb.status === LightBarrierStatus.ACTIVE
                  ? "text-green-400"
                  : "text-red-400"
              )}
            >
              {lb.status}
            </span>

            {/* Última mudança */}
            <span className="text-gray-500 text-xs  xl:text-sm">
              {lb.lastChanged}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LightBarrierCard;
