// src/components/LoadingOverlay.tsx
import Image from "next/image";
import React from "react";

interface LoadingOverlayProps {
  isLoading: boolean;
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ isLoading }) => {
  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80">
      <div className="flex flex-col items-center animate-fade-in">
        {/* Ícone sem fundo */}
        <Image
          src="/Square310x310Logo.png" // Certifique-se de que o logo está no formato PNG sem fundo na pasta `public`
          alt="Logo"
          className="w-56 h-56 animate-bounce-slow"
          width={400}
          height={400}
        />
        {/* Spinner Minimalista */}
        <div className="w-32 h-32 mt-6 border-4 border-gray-300 border-t-transparent rounded-full animate-spin-slow"></div>
        {/* Texto */}
        <span className="text-gray-200 mt-6 text-3xl font-bold tracking-wide">
          Connecting...
        </span>
      </div>
    </div>
  );
};

export default LoadingOverlay;
