// src/components/GlobalModal.tsx

'use client';

import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface GlobalModalProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const GlobalModal: React.FC<GlobalModalProps> = ({ title, isOpen, onClose, children }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      // Armazenar o elemento que estava ativo antes do modal ser aberto
      previousActiveElement.current = document.activeElement as HTMLElement;
      // Adicionar listener para tecla ESC
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          onClose();
        }
      };
      document.addEventListener("keydown", handleKeyDown);

      // Definir foco no modal
      modalRef.current?.focus();

      // Remover listener quando o modal for fechado
      return () => {
        document.removeEventListener("keydown", handleKeyDown);
        // Restaurar o foco no elemento anterior
        previousActiveElement.current?.focus();
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      onClick={onClose} // Fechar modal ao clicar fora
    >
      <div
        className="bg-gray-800 rounded-lg shadow-lg w-11/12 max-w-md p-4 relative"
        onClick={(e) => e.stopPropagation()} // Impedir fechamento ao clicar dentro do modal
        ref={modalRef}
        tabIndex={-1} // Permitir foco
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-2">
          <h2 id="modal-title" className="text-lg font-semibold text-white">
            {title}
          </h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-gray-400 hover:text-white"
            aria-label="Fechar Modal"
          >
            <X />
          </Button>
        </div>

        {/* Content */}
        <div className="mt-2">
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default GlobalModal;
