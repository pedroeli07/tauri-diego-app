// src/pages/index.tsx
import React, { useState } from "react";
import dynamic from "next/dynamic"; // Importação dinâmica do Next.js
import ControlPanel from "@/components/ControlPanel";
import { ToastProvider } from "@/components/Toast";
import { LED, Log } from "@/lib/types";






// Importação dinâmica do Serial component com SSR desativado
const Serial = dynamic(() => import("@/components/sections").then(mod => mod.Serial), {
  ssr: false,
});
// Importação dinâmica do SpaceAppBar com SSR desativado
const SpaceAppBar = dynamic(() => import("@/components/SpaceAppBar"), {
  ssr: false,
});


interface HomeProps {
  led: LED; // LED data: id, status (ON/OFF), intensity
  refreshStatus: (id: number, status: "ON" | "OFF", intensity?: number) => void; // Callback to refresh LED status
  isConnected: boolean; // Indicates if the user is connected to the serial port
  isConnectedInternal: boolean;
}


const Home: React.FC<HomeProps> = ({ led, refreshStatus, isConnectedInternal }) => {

  const [isUpdatingPorts, setIsUpdatingPorts] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  // Estado de Conexão
  const [isConnected, setIsConnected] = useState(false);

  // Estados de Logs (Corrigido para Log[])
  const [logs, setLogs] = useState<Log[]>([]);

  // Funções de Controle da Janela
  async function closeWindow() {
    try {
      const { appWindow } = await import("@tauri-apps/api/window");
      await appWindow.close();
    } catch (error) {
      console.error("Erro ao fechar a janela:", error);
    }
  }

  async function toggleMaximize() {
    try {
      const { appWindow } = await import("@tauri-apps/api/window");
      await appWindow.toggleMaximize();
    } catch (error) {
      console.error("Erro ao alternar maximização:", error);
    }
  }

  async function toggleMinimize() {
    try {
      const { appWindow } = await import("@tauri-apps/api/window");
      await appWindow.minimize();
    } catch (error) {
      console.error("Erro ao minimizar a janela:", error);
    }
  }

  /**
   * Função para adicionar logs.
   * @param message - A mensagem a ser adicionada ao log.
   * @param type - Tipo do log: "error" | "success" | "info" | "warning".
   */
  function addLog(message: string, type: "error" | "success" | "info" | "warning" = "info") {
    setLogs((prevLogs) => [
      ...prevLogs,
      {
        message: `[${new Date().toLocaleTimeString()}] ${message}`,
        type,
      },
    ]);
    console.log(`Log Adicionado: ${message} [${type}]`);
  }

  const toggleRecording = () => setIsRecording((prev) => !prev);

  return (

     <main className="h-screen w-screen">
      <ToastProvider /> {/* Global toast provider */}
      <div className="w-full h-full flex flex-col bg-gradient-to-b from-[#0a0a0a] via-[#131212] to-[#050505] text-white select-none font-sans">
        {/* Window Bar */}
        <SpaceAppBar
          onMinimize={toggleMinimize}
          onMaximize={toggleMaximize}
          onClose={closeWindow}
        />
  
        {/* Connection and Record Sections */}
        <div className="w-full  flex items-center space-x-6 p-4">
          <Serial
            setIsConnected={setIsConnected}
            addLog={addLog}
            isRecording={isRecording}
            onRecord={toggleRecording}
          />
        </div>
  
        {/* Main Content */}
        <div className="w-full h-full">
          <ControlPanel 
          isConnected={isConnected}  />
        </div>
  
        {/* DebugBox Component
        <div className="p-4">
          <DebugBox
            logs={logs}
            clearLogs={clearLogs}
            deleteLog={deleteLog}
            sendCommand={sendCommand}
          />
        </div>
         */}
      </div>
    </main>
  );
}

export default Home