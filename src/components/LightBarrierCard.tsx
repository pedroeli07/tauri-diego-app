import React, { useEffect } from "react";
import clsx from "clsx";
import LightBarrierIcon from "./LightBarrierIcon";
import { useMediaQuery } from "react-responsive";

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
    // Optional: Reset all barriers to INACTIVE on connection
    if (isConnected) {
      lightBarriers.forEach((lb) => {
        handleLightBarrierUpdate(lb.id, LightBarrierStatus.INACTIVE);
      });
    }
  }, [isConnected]);

  const isScreenLargerThan2xl = useMediaQuery({ minWidth: "1536px" });

  return (
    <div className="bg-transparent border-none w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full -mt-5">
        {lightBarriers.map((lb) => (
          <div
            key={lb.id}
            className={clsx(
              "flex flex-col items-center justify-center rounded-lg border-2 px-4 py-2 shadow-md w-full", // Reduced height
              lb.status === LightBarrierStatus.ACTIVE
                ? "border-green-500"
                : "border-red-500"
            )}
          >
            {/* ID */}
            <span
              className={clsx(
                "text-xs sm:text-sm xl:text-sm 2xl:text-base font-bold mb-1 xl:mb-2",
                lb.status === LightBarrierStatus.ACTIVE
                  ? "text-green-400"
                  : "text-red-400"
              )}
            >
              LB {lb.id}
            </span>

            {/* Icon: Hide on smaller screens and adjust size */}
            <div className={clsx("hidden 2xl:block")}>
              <LightBarrierIcon
                status={lb.status}
                className="w-8 h-8 sm:w-10 sm:h-10" // Reduced icon size
              />
            </div>

            {/* Status: Reduced text size on smaller screens */}
            <span
              className={clsx(
                "mt-1 xl:mt-2 text-xs 2xl:text-sm font-bold",
                lb.status === LightBarrierStatus.ACTIVE
                  ? "text-green-400"
                  : "text-red-400"
              )}
            >
              {lb.status}
            </span>

            {/* Last changed */}
            <span className="text-gray-500 text-xs">
              {lb.lastChanged}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LightBarrierCard;