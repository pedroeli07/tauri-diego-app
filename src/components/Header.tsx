// src/components/Header.tsx
import React from "react";
import Image from "next/image";
import { Minus, Maximize, X } from "lucide-react";
import {
  Dialog,
  DialogFooter,
  DialogHeader,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";

interface HeaderProps {
  onMinimize: () => void;
  onMaximize: () => void;
  onClose: () => void;
  isCloseModalOpen: boolean;
  setIsCloseModalOpen: (open: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({
  onMinimize,
  onMaximize,
  onClose,
  isCloseModalOpen,
  setIsCloseModalOpen,
}) => {
  return (
    <div 
      data-tauri-drag-region
      className="flex items-center justify-between bg-gradient-radial from-[#0a0a0a] via-[#161515e8] to-[#0c0c0c] select-none h-12 px-2 lg:px-4">
      
      {/* Logo e Área de Título com Área de Arrasto */}
      <div className="flex items-center">
        <Image
          src="/DcubeD_white.svg"
          alt="DCUBED Logo"
          width={30} // Reduzido para telas menores
          height={30} // Reduzido para telas menores
          className="mr-2 lg:mr-4"
        />
        <span className="lg:inline text-white font-bold tracking-widest text-lg">
          DCubed - ISM Controller
        </span>
      </div>

      {/* Botões de Controle da Janela */}
      <div className="flex items-center space-x-1 lg:space-x-2">
        <button
          onClick={onMinimize}
          className="p-1 lg:p-2 text-gray-500 hover:text-gray-300 focus:outline-none cursor-pointer"
          aria-label="Minimize"
        >
          <Minus size={18}  /> {/* Ajuste de tamanho */}
        </button>
        <button
          onClick={onMaximize}
          className="p-1 lg:p-2 text-gray-500 hover:text-gray-300 focus:outline-none cursor-pointer"
          aria-label="Maximize"
        >
          <Maximize size={18}  /> {/* Ajuste de tamanho */}
        </button>
        <button
          onClick={() => setIsCloseModalOpen(true)}
          className="p-1 lg:p-2 text-gray-500 hover:text-red-500 focus:outline-none cursor-pointer"
          aria-label="Close"
        >
          <X size={18}  /> {/* Ajuste de tamanho */}
        </button>
      </div>

      {/* Diálogo de Confirmação de Fechamento */}
      <Dialog open={isCloseModalOpen} onOpenChange={setIsCloseModalOpen}>
        <DialogContent className="bg-gradient-to-br from-[#000000] via-[#111111] to-[#0b020f] text-white border-2 border-gray-900 rounded-2xl">
          <DialogHeader>
            <DialogTitle>Close Application</DialogTitle>
            <DialogDescription>
              Are you sure you want to close the application? Any unsaved
              changes will be lost.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              className="bg-white hover:bg-gray-300 hover:text-gray-900 text-black"
              variant="ghost"
              onClick={() => setIsCloseModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={onClose}
              className="bg-red-700 hover:bg-red-800 text-white"
            >
              Yes, Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Header;
