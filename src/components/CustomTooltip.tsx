import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"; // Ajuste o caminho conforme sua estrutura

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
    top: "top-0 left-1/2 transform -translate-x-1/2 -translate-y-full",
    bottom: "bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full",
    left: "left-0 top-1/2 transform -translate-y-1/2 -translate-x-full",
    right: "right-0 top-1/2 transform -translate-y-1/2 translate-x-full",
  };

  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent
          className={`bg-purple-600 text-white p-2 rounded-md shadow-lg ${placementClasses[placement]}`}
        >
          {content}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default CustomTooltip;
