// components/Header.tsx
import Image from 'next/image';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import React from "react";
import { X, Minus , Maximize, Minimize} from "lucide-react";
import { Button } from "@/components/ui/button";



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
  setIsCloseModalOpen
}) => {
  return (
    <div
      data-tauri-drag-region
      className="flex items-center justify-between px-4 py-2 bg-gradient-radial from-[#0a0a0a] via-[#202020] to-[#19191a] select-none"
    >
      {/* Logo and Title */}
      <div className="flex items-center">
        <Image
          src="/DcubeD_white.svg"
          alt="DCUBED Logo"
          width={40}
          height={40}
          className="mr-2"
        />
        <span className="text-white font-bold tracking-widest text-lg">
          DCubed - ISM Controller
        </span>
      </div>

      {/* Window Control Buttons */}
      <div className="flex items-center space-x-2">
        {/* Minimize Button */}
        <button
          onClick={onMinimize}
          className="p-2 text-gray-500 hover:text-gray-300 focus:outline-none"
          aria-label="Minimize"
        >
          <Minus size={20} />
        </button>
        {/* Maximize Button */}
        <button
          onClick={onMaximize}
          className="p-2 text-gray-500 hover:text-gray-300 focus:outline-none"
          aria-label="Maximize"
        >
          <Maximize size={20} />
        </button>
        {/* Close Button */}
        <button
          onClick={() => setIsCloseModalOpen(true)}
          className="p-2 text-gray-500 hover:text-red-500 focus:outline-none"
          aria-label="Close"
        >
          <X size={20} />
        </button>
      </div>

      {/* Close Confirmation Dialog */}
      <Dialog open={isCloseModalOpen} onOpenChange={setIsCloseModalOpen}>
        <DialogContent className="bg-gradient-to-br from-[#000000] via-[#111111] to-[#0b020f] text-white border-2 border-gray-900 rounded-2xl">
          <DialogHeader>
            <DialogTitle>Close Application</DialogTitle>
            <DialogDescription>
              Are you sure you want to close the application? Any unsaved changes will be lost.
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
