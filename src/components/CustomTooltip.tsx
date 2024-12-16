// src/components/CustomTooltip.tsx

import React from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"; // Ajuste o caminho conforme sua estrutura

interface CustomTooltipProps {
  content: React.ReactNode;
  placement?: "top" | "right" | "bottom" | "left";
  children: React.ReactElement;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({
  content,
  placement = "top",
  children,
}) => {
  return (
    <TooltipProvider delayDuration={0}>
    <Tooltip>
      <TooltipTrigger asChild>
        {children}
      </TooltipTrigger>
      <TooltipContent className="bg-purple-600 text-white">
        {content}
      </TooltipContent>
    </Tooltip>
    </TooltipProvider>
   
  );
};

export default CustomTooltip;
