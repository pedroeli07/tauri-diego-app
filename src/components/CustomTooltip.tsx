import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface CustomTooltipProps {
  content: React.ReactNode;
  placement?: "top" | "right" | "bottom" | "left"; // Permite definir a posição
  children: React.ReactElement;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({
  content,
  placement = "top", // Define o padrão como "top"
  children,
}) => {
  // Mapeamento para classes de posição
  const placementClasses = {
    top: "top-[-10px] left-1/2 transform -translate-x-1/2 -translate-y-full",
    bottom: "bottom-[10px] left-1/2 transform -translate-x-1/2 translate-y-full",
    left: "left-[-10px] top-1/2 transform -translate-y-1/2 -translate-x-full",
    right: "right-[10px] top-1/2 transform -translate-y-1/2 translate-x-full",
  };

  return (
    <TooltipProvider delayDuration={400}> {/* Delay de 200ms */}
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent
          className={`z-50 w-auto max-w-xs bg-gray-800 text-white text-sm p-2 rounded-lg shadow-md ${placementClasses[placement]}`}
        >
          <div className="whitespace-nowrap">{content}</div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default CustomTooltip;
