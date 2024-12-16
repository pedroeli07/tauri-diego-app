// src/pages/index.tsx
import React, { useState } from "react";
import dynamic from "next/dynamic"; // Importação dinâmica do Next.js
import ControlPanel from "@/components/ControlPanel";
import { toast, Toast } from "@/components/Toast";

import { invoke } from "@tauri-apps/api/tauri";
import Navbar from "@/components/Navbar";
import DebugBox from "@/components/DebugBox";


// Importação dinâmica do Serial component com SSR desativado
const Serial = dynamic(() => import("@/components/sections").then(mod => mod.Serial), {
  ssr: false,
});
// Importação dinâmica do SpaceAppBar com SSR desativado
const SpaceAppBar = dynamic(() => import("@/components/SpaceAppBar"), {
  ssr: false,
});



interface Log {
  message: string;
  type: "error" | "success" | "info" | "warning";
}

export default function Home() {
  const [port, setPort] = useState("None");
  const [baud, setBaud] = useState("9600");
  const [portList, setPortList] = useState<string[]>(["None"]);

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

  /**
   * Função para deletar um log específico.
   * @param index - Índice do log a ser deletado.
   */
  function deleteLog(index: number) {
    setLogs((prevLogs) => prevLogs.filter((_, i) => i !== index));
    console.log(`Log deletado no índice: ${index}`);
  }

  /**
   * Função para limpar todos os logs.
   */
  function clearLogs() {
    setLogs([]);
    console.log("Todos os logs foram limpos.");
  }

  /**
   * Função para enviar comandos diretamente via DebugBox.
   * @param command - O comando a ser enviado.
   */
  async function sendCommand(command: string) {
    try {
      await invoke("send_serial", { input: command });
      addLog(`Comando Enviado: ${command}`, "success");
      toast.success(`Comando Enviado: ${command}`);
    } catch (error) {
      addLog(`Erro ao enviar comando: ${error}`, "error");
      toast.error("Falha ao enviar o comando.");
    }
  }

  const updatePorts = () => {
    setIsUpdatingPorts(true);
    setTimeout(() => {
      setPortList(["COM1", "COM2", "COM3"]);
      setIsUpdatingPorts(false);
      addLog("Portas atualizadas manualmente para [COM1, COM2, COM3].", "info");
    }, 1000);
  };

  const toggleConnection = () => setIsConnected((prev) => !prev);
  const toggleRecording = () => setIsRecording((prev) => !prev);

  return (
    <>
      <Toast /> {/* Exibe o Toast globalmente */}
      <div className="flex flex-col h-screen bg-gradient-to-tr from-[#000000] via-[#1b1b1d] to-[#222222] text-white select-none font-sans">
        {/* Window Bar */}
        <SpaceAppBar
          onMinimize={toggleMinimize}
          onMaximize={toggleMaximize}
          onClose={closeWindow}
        />

   

        {/* Connection and Record Sections */}
        <div className="flex items-center space-x-6 p-4">
          <Serial setIsConnected={setIsConnected} addLog={addLog} isRecording={isRecording} onRecord={toggleRecording} />
        </div>

        {/* Main Content */}
        <div className="w-full">
          <ControlPanel />
        </div>

        {/* DebugBox Component */}
        <div className="p-4">
          <DebugBox
            logs={logs}
            clearLogs={clearLogs}
            deleteLog={deleteLog}
            sendCommand={sendCommand}
          />
        </div>
      </div>
    </>
  );
}
