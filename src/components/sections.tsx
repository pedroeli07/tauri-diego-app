// src/components/sections.tsx

import React, { useState, useEffect } from 'react';
import { 
  handleGetPorts, 
  getBaudList, 
  handleConnect, 

  handleProductionMode, 
  handleReset 
} from "../utils/serial";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChevronDown, Plug2, Power, RotateCcw, RouteOff, Settings, Video } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MdPowerOff } from "react-icons/md";
import { toast } from './Toast';
import CustomTooltip from './CustomTooltip';

interface SerialProps {
  setIsConnected: (status: boolean) => void;
  addLog: (message: string, type?: "error" | "success" | "info" | "warning") => void;
  isRecording: boolean;
  onRecord: () => void;
}

function MenuItem({ text, onClick }: { text: string; onClick: () => void }) {

  return (
    <li
      onClick={onClick}
      className="px-4 py-2 hover:bg-gray-700 cursor-pointer text-white rounded transition-colors"
    >
      {text}
    </li>
  );
}

export function Serial({ 
  addLog,  
  isRecording,
  onRecord
}: SerialProps) {
  const [baud, setBaud] = useState("9600");
  const [port, setPort] = useState("None");
  const [portList, setPortList] = useState<string[]>(["None"]);
  const [isUpdatingPorts, setIsUpdatingPorts] = useState(false);
  const [isConnectedInternal, setIsConnectedInternal] = useState(false);
    // Estado de Conexão
    const [isConnected, setIsConnected] = useState(false);

  const fetchPorts = async () => {
    setIsUpdatingPorts(true);
    addLog("Iniciando a atualização das portas...", "info");
    console.log("Iniciando a atualização das portas...");
    try {
      await handleGetPorts(setPortList);
      addLog("Portas atualizadas com sucesso.", "success");
      console.log("Portas atualizadas com sucesso:", portList);
    } catch (error) {
      addLog(`Erro ao atualizar portas: ${error}`, "error");
      console.error("Erro ao atualizar portas:", error);
    } finally {
      setIsUpdatingPorts(false);
      console.log("Atualização das portas concluída.");
    }
  };

  const toggleConnection = async () => {
    addLog(`Tentando ${isConnected ? "desconectar" : "conectar"}...`, "info");
    console.log(`Tentando ${isConnected ? "desconectar" : "conectar"}...`);
    if (!isConnected) {
      // Conectar
      try {
        const connected = await handleConnect(port, baud, "\n", setIsConnectedInternal);
        if (connected) {
          setIsConnectedInternal(true);
          setIsConnected(true);
          addLog(`Conectado à porta ${port} a ${baud} baud.`, "success");
          console.log(`Conectado à porta ${port} a ${baud} baud.`);
        } else {
          addLog(`Falha ao conectar à porta ${port}.`, "error");
          console.error(`Falha ao conectar à porta ${port}.`);
        }
      } catch (error) {
        addLog(`Erro ao conectar: ${error}`, "error");
        console.error("Erro ao conectar:", error);
      }
    } else {
      // Desconectar
      try {
        const disconnected = await handleConnect("", "", "\n", setIsConnectedInternal);
        if (disconnected) {
          setIsConnectedInternal(false);
          setIsConnected(false);
          addLog(`Desconectado da porta ${port}.`, "success");
          console.log(`Desconectado da porta ${port}.`);
        } else {
          addLog(`Falha ao desconectar da porta ${port}.`, "error");
          console.error(`Falha ao desconectar da porta ${port}.`);
        }
      } catch (error) {
        addLog(`Erro ao desconectar: ${error}`, "error");
        console.error("Erro ao desconectar:", error);
      }
    }
  };

  useEffect(() => {
    fetchPorts();
  }, []);

  /**
   * Função para enviar o modo de produção.
   */
  const sendProductionMode = async () => {
    try {
      await handleProductionMode();
      addLog("Modo de produção ativado.", "success");
      toast.success("Modo de produção ativado.");
      console.log("Modo de produção ativado.");
    } catch (error) {
      addLog(`Erro ao ativar o modo de produção: ${error}`, "error");
      toast.error("Falha ao ativar o modo de produção.");
      console.error("Erro ao ativar o modo de produção:", error);
    }
  };

  /**
   * Função para enviar o comando de reset.
   */
  const sendReset = async () => {
    try {
      await handleReset();
      addLog("Comando de reset enviado.", "success");
      toast.success("Comando de reset enviado.");
      console.log("Comando de reset enviado.");
    } catch (error) {
      addLog(`Erro ao enviar comando de reset: ${error}`, "error");
      toast.error("Falha ao enviar o comando de reset.");
      console.error("Erro ao enviar comando de reset:", error);
    }
  };

  return (
    <div className="grid grid-cols-8 gap-4 p-6 bg-gray-800 rounded-lg shadow-md border border-gray-700 mx-auto mt-4 w-full md:w-[95%]">
      {/* Port Selection */}
      <div className="flex items-center">
        <label className="block text-sm text-gray-400 mb-1 p-2" htmlFor="port-select">
          Port
        </label>
        <Select value={port} onValueChange={setPort}>
          <SelectTrigger
            id="port-select"
            className="w-full bg-gray-700 text-white hover:bg-gray-600 rounded-md"
          >
            <SelectValue
              className="text-gray-400"
              placeholder="Select Port"
            />
          </SelectTrigger>
          <SelectContent className="bg-gray-700 text-white rounded-md">
            {portList.length > 0 ? (
              portList.map((p, index) => (
                <SelectItem
                  key={index}
                  value={p}
                  className="hover:bg-gray-600 text-gray-300"
                >
                  {p}
                </SelectItem>
              ))
            ) : (
              <SelectItem value="None" className="text-gray-500 italic">
                No Ports Available
              </SelectItem>
            )}
          </SelectContent>
        </Select>
      </div>
  
      {/* Baud Rate Selection */}
      <div className="flex items-center">
        <label className="block text-sm text-gray-400 mb-1" htmlFor="baud-select">
          Baud Rate
        </label>
        <Select value={baud} onValueChange={setBaud}>
          <SelectTrigger
            id="baud-select"
            className="w-full bg-gray-700 text-white hover:bg-gray-600 rounded-md"
          >
            <SelectValue
              className="text-gray-400"
              placeholder="Select Baud Rate"
            />
          </SelectTrigger>
          <SelectContent className="bg-gray-700 text-white rounded-md">
            {getBaudList().map((b, index) => (
              <SelectItem
                key={index}
                value={b}
                className="hover:bg-gray-600 text-gray-300"
                >
                  {b}
                </SelectItem>
              ))}
            </SelectContent>
        </Select> 
      </div>
  
      {/* Update Ports Button */}
      <div className="flex items-center">
        <Button
          variant="default"
          size="sm"
          onClick={fetchPorts}
          disabled={isUpdatingPorts}
          className="w-full bg-gray-700 hover:bg-gray-600 text-gray-300 px-3 py-1 "
        >
          {isUpdatingPorts && <RotateCcw className="animate-spin mr-2" />}
          <span>Update Ports</span>
        </Button>
      </div>
  
      {/* Connect/Disconnect Button */}
      <div className="flex items-center">
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleConnection}
          disabled={port === "None" || isUpdatingPorts}
          className={`w-full flex items-center justify-center px-3 py-1  rounded-md ${
            isConnected
              ? "bg-red-600 hover:bg-red-500 text-white"
              : "bg-green-600 hover:bg-green-500 text-white"
          }`}
        >
          {isConnected ? (
            <>
              <Plug2 className="w-5 h-5 mr-2" />
              Disconnect
            </>
          ) : (
            <>
              <Power className="w-5 h-5 mr-2" />
              Connect
            </>
          )}
        </Button>
      </div>
  
      {/* Botões de Production Mode e Reset */}
      <div className="absolute right-24">
        <div className="flex items-center gap-8">
          <Button
            variant="ghost"
            onClick={sendProductionMode}
            className="bg-gray-700 hover:bg-gray-600 text-gray-300 px-3 py-1 rounded-md"
          >
            <Settings className="w-5 h-5 mr-1" />
            Production
          </Button>
          <Button
            variant="ghost"
            onClick={sendReset}
            className="bg-gray-700 hover:bg-gray-600 text-gray-300 px-3 py-1 rounded-md"
          >
            <RouteOff className="w-5 h-5 mr-1" />
            Reset
          </Button>
          
        {/* Record */}
        <CustomTooltip content={isRecording ? "Stop Recording" : "Start Recording"}>
          <Button
            onClick={onRecord}
            className={`px-4 py-2 ${
              isRecording ? "bg-red-600 hover:bg-red-500" : "bg-gray-700 hover:bg-gray-600"
            } text-white`}
          >
            <Video className="w-5 h-5 mr-2" />
            {isRecording ? "Stop Record" : "Start Record"}
          </Button>
        </CustomTooltip>
        </div>
      </div>
    </div>
  );
}
