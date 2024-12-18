//src/utils/window
"use client";

import { useState, useEffect } from "react";
import { appWindow as TauriAppWindow } from "@tauri-apps/api/window";


// Import Tauri's appWindow only on the client side
export const useAppWindow = () => {
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

export const handleSend = (
    command: string,
    sendCommand: (cmd: string) => void,
    setCommand: (cmd: string) => void
  ) => {
    const trimmedCommand = command.trim();
    if (trimmedCommand) {
      sendCommand(trimmedCommand);
      setCommand(""); // Limpa o campo após envio
    }
  };