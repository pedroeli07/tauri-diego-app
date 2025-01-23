// src/app/(main)/layout.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Sidebar from '@/components/sidebar';
import Header from '@/components/Header';
import { appWindow as TauriAppWindow } from "@tauri-apps/api/window";

// Import Tauri's appWindow only on the client side
export const useAppWindow = () => {''
  const [appWindowInstance, setAppWindowInstance] = useState<any>(null);
  
  useEffect(() => {
    const loadAppWindow = async () => {
      if (typeof window !== "undefined") {
        const { appWindow } = await import("@tauri-apps/api/window");
        setAppWindowInstance(appWindow);
      }
    };
    loadAppWindow();
  }, []);

  return appWindowInstance;
};

type Props = { children: React.ReactNode };

/**
 * Fecha a aplicação.
 */
export const closeApp = async (appWindow: typeof TauriAppWindow | null) => {
  if (appWindow) {
    try {
      await appWindow.close();
    } catch (error) {
      console.error("Erro ao fechar a janela:", error);
    }
  }
};

/**
 * Minimiza a aplicação.
 */
export const minimizeApp = async (appWindow: typeof TauriAppWindow | null) => {
  if (appWindow) {
    try {
      await appWindow.minimize();
    } catch (error) {
      console.error("Erro ao minimizar a janela:", error);
    }
  }
};

/**
 * Maximiza/restaura a aplicação.
 */
export const maximizeApp = async (appWindow: typeof TauriAppWindow | null) => {
  if (appWindow) {
    try {
      await appWindow.toggleMaximize();
    } catch (error) {
      console.error("Erro ao maximizar a janela:", error);
    }
  }
};

const Layout = ({ children }: Props) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(window.innerWidth >= 1024);
  const [isLargeScreen, setIsLargeScreen] = useState<boolean>(window.innerWidth >= 1024);
  const [isMounted, setIsMounted] = useState(false);
  const [isCloseModalOpen, setIsCloseModalOpen] = React.useState(false);

  // Reference to the application window for window controls
  const appWindow = useAppWindow();

  useEffect(() => {
    setIsMounted(true);
    const handleResize = () => {
      const isLarge = window.innerWidth >= 1024;
      setIsLargeScreen(isLarge);
      setIsSidebarOpen(isLarge);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!isMounted) return null;

  return (
    <div className="flex min-h-screen w-full bg-gradient-to-br from-[#0a0a23] via-[#141428] to-[#0a0a23] overflow-hidden">
      {/* Sidebar */}
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(!isSidebarOpen)}
        isLargeScreen={isLargeScreen}
      />

      {/* Conteúdo Principal */}
      <div
        className={`flex flex-col flex-1 transition-all duration-500 ease-in-out ${
          isSidebarOpen && isLargeScreen ? "ml-20 rounded-l-3xl shadow-md" : "ml-0"
        }`}
      >
        {/* InfoBar */}
        <Header
          onMinimize={() => minimizeApp(appWindow)}
          onMaximize={() => maximizeApp(appWindow)}
          onClose={() => closeApp(appWindow)}
          isCloseModalOpen={isCloseModalOpen}
          setIsCloseModalOpen={setIsCloseModalOpen}
        />

        {/* Conteúdo */}
        <div
  className="flex-1 overflow-auto bg-gradient-to-br from-[#000042] via-[#141428] to-[#000042] 
    rounded-tl-3xl rounded-tr-3xl shadow-inner p-2 relative group transition-all duration-500"
>
  {/* Efeito de borda iluminada */}
  <div
    className="absolute inset-0 bg-gradient-to-br from-blue-800 via-transparent to-blue-800 opacity-30 
      rounded-tl-3xl rounded-tr-3xl blur-sm pointer-events-none transform scale-102 group-hover:opacity-50"
  ></div>

 {/* Efeito de borda externa */}
 <div
    className="absolute -inset-0.5 bg-gradient-to-r from-[#252525] via-[#413f3f] to-[#313030] 
      rounded-tl-3xl rounded-tr-3xl blur-md opacity-30 group-hover:opacity-40 pointer-events-none"
  ></div>

  {/* Conteúdo interno */}
  <div
    className="rounded-tl-3xl rounded-tr-3xl relative z-10 bg-gradient-to-br from-[#1a1a2e] to-[#161629] rounded-lg shadow-lg p-2 
      border border-gray-700 hover:border-gray-500 transition-all duration-500"
  >
    {children}
  </div>
</div>

      </div>
    </div>
  );
};

export default Layout;


return (
 
  <div className="flex min-h-screen max-h-screen w-full bg-gradient-to-b from-[#01041f] via-[#05081f] to-[#010318] overflow-hidden">
    <Sidebar
      isSidebarOpen={isSidebarOpen}
      onClose={() => setIsSidebarOpen(!isSidebarOpen)}
      isLargeScreen={isLargeScreen}
    />

    <div
      className={`max-h-screen flex flex-col flex-1 transition-all duration-500 ease-in-out ${
        isSidebarOpen && isLargeScreen ? 'ml-20 rounded-l-3xl shadow-md' : 'ml-0'
      }`}
    >
      <div
        className="max-h-screen flex-1 overflow-auto bg-gradient-to-br from-[#01041f] via-[#01073b] to-[#010420] 
          rounded-tl-3xl rounded-tr-3xl shadow-inner p-2 relative group transition-all duration-500"
      >
        <Header


        />

        <div
        className="bg-grid-gray bg-line-grid-pro/[0.2] max-h-screen rounded-tl-3xl rounded-tr-3xl relative z-10 bg-gradient-to-br from-[#242424] via-[#121213] to-[#161616] rounded-lg shadow-lg p-2 
          transition-all duration-500"
      >
            
