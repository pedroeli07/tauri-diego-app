// src/components/SpaceAppBar.tsx
import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { Minus, Maximize, X } from "lucide-react";
import Image from "next/image";
import Box from "@mui/material/Box";

interface SpaceAppBarProps {
  onMinimize: () => void;
  onMaximize: () => void;
  onClose: () => void;
}

const SpaceAppBar: React.FC<SpaceAppBarProps> = ({
  onMinimize,
  onMaximize,
  onClose,
}) => {
  const handleDrag = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    // Certifique-se de não interferir nos botões de controle
    const target = e.target as HTMLElement;
    if (target.closest("button")) return;

    let offsetX = e.clientX;
    let offsetY = e.clientY;

    const handleMouseMove = async (moveEvent: MouseEvent) => {
      const newX = moveEvent.screenX - offsetX;
      const newY = moveEvent.screenY - offsetY;

      // Importação dinâmica de appWindow e PhysicalPosition
      const { appWindow, PhysicalPosition } = await import("@tauri-apps/api/window");
      await appWindow.setPosition(new PhysicalPosition(newX, newY));
    };

    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  return (
    <AppBar
    className="bg-gradient-to-tr from-[#1b1b1b] via-[#18041d] to-[#1b1b1b]"
      position="static"
      sx={{
       
        boxShadow: "none",
        borderBottom: "1px solid #333",
        cursor: "move",
      }}
    >
      <Toolbar
        variant="dense"
        onMouseDown={handleDrag} // Apenas a Toolbar é arrastável
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingX: "1rem",
          userSelect: "none", // Evita seleção de texto
        }}
      >
        {/* Logo e Título */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Image
            src="/DcubeD_white.svg"
            alt="DCUBED Logo"
            width={40}
            height={40}
            className="mr-2"
          />
          <Typography
            variant="h6"
            component="div"
            sx={{
              color: "#fff",
              fontWeight: "bold",
              letterSpacing: "0.1em",
            }}
          >
            DCubed - ISM Controller
          </Typography>
        </Box>

        {/* Botões de Controle */}
        <div className="flex items-center absolute right-0">
          <Box>
            <IconButton
              className="hover:text-gray-600"
              onClick={(e) => {
                e.stopPropagation();
                onMinimize();
              }}
              sx={{ color: "#aaa" }}
            >
              <Minus size={20} />
            </IconButton>
            <IconButton
              className="hover:text-gray-600"
              onClick={(e) => {
                e.stopPropagation();
                onMaximize();
              }}
              sx={{ color: "#aaa" }}
            >
              <Maximize size={20} />
            </IconButton>
            <IconButton
              className="hover:text-red-400"
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
              sx={{ color: "#aaa" }}
            >
              <X size={20} />
            </IconButton>
          </Box>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default SpaceAppBar;
