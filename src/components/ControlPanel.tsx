// src/components/ControlPanel.tsx
import React, { useState, useEffect } from "react";
import LEDCard from "@/components/LEDCard";
import MotorCard from "@/components/MotorCard";
import LightBarrierCard from "@/components/LightBarrierCard"; // Import do LightBarrierCard
import { LED, Motor, LightBarrier } from "@/lib/types";
import { setupSerialListeners } from "@/utils/serial";
import { toast } from "@/components/Toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DebugBox from "./DebugBox";
import { invoke } from "@tauri-apps/api/tauri";

interface Log {
  message: string;
  type: "error" | "success" | "info" | "warning";
}

const ControlPanel: React.FC = () => {

  // Estado de Conexão
  const [isConnected, setIsConnected] = useState(false);
  
  // Estados de Logs
  const [logs, setLogs] = useState<Log[]>([]);
  
  const [leds, setLEDs] = useState<LED[]>([
    { id: 1, status: "OFF", intensity: 0, lastChanged: "No Info" },
    { id: 2, status: "OFF", intensity: 0, lastChanged: "No Info" },
    { id: 3, status: "OFF", intensity: 0, lastChanged: "No Info" },
    { id: 4, status: "OFF", intensity: 0, lastChanged: "No Info" },
  ]);

  const [motors, setMotors] = useState<Motor[]>([
    { id: 1, status: "OFF", speed: 0, direction: "CW", lastChanged: "No Info" },
    { id: 2, status: "OFF", speed: 0, direction: "CW", lastChanged: "No Info" },
    { id: 3, status: "OFF", speed: 0, direction: "CW", lastChanged: "No Info" },
  ]);

  const [lightBarriers, setLightBarriers] = useState<LightBarrier[]>([
    { id: 1, status: "OK", lastChanged: "No Info" },
    { id: 2, status: "OK", lastChanged: "No Info" },
    { id: 3, status: "OK", lastChanged: "No Info" },
    { id: 4, status: "OK", lastChanged: "No Info" },
  ]);

  /**
   * Função para adicionar logs.
   * @param message - A mensagem a ser adicionada ao log.
   * @param type - Tipo do log: "error", "success" ou "info".
   */
  function addLog(message: string, type: "error" | "success" | "info" | "warning" = "info") {
    setLogs((prevLogs) => [
      ...prevLogs,
      {
        message: `[${new Date().toLocaleTimeString()}] ${message}`,
        type,
      },
    ]);
    console.log(`Log Adicionado: ${message}`);
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
    } catch (error) {
      addLog(`Erro ao enviar comando: ${error}`, "error");
      toast.error("Falha ao enviar o comando.");
    }
  }

  /**
   * Atualiza o status de um LED.
   * @param id - Identificador do LED.
   * @param status - "ON" ou "OFF".
   * @param intensity - Intensidade do LED (opcional).
   */
  const updateLEDStatus = (id: number, status: "ON" | "OFF", intensity?: number) => {
    setLEDs((prevLeds) =>
      prevLeds.map((led) =>
        led.id === id
          ? { ...led, status, intensity: intensity !== undefined ? intensity : led.intensity, lastChanged: new Date().toLocaleTimeString() }
          : led
      )
    );
    addLog(`LED ${id} atualizado para ${status}${intensity !== undefined ? ` com intensidade ${intensity}` : ""}`, "info");
  };

  /**
   * Atualiza o status de um Motor.
   * @param id - Identificador do Motor.
   * @param status - "ON" ou "OFF".
   * @param speed - Velocidade do Motor (opcional).
   * @param direction - Direção do Motor ("CW" ou "CCW") (opcional).
   */
  const updateMotorStatus = (id: number, status: "ON" | "OFF", speed?: number, direction?: "CW" | "CCW") => {
    setMotors((prevMotors) =>
      prevMotors.map((motor) =>
        motor.id === id
          ? {
              ...motor,
              status,
              speed: speed !== undefined ? speed : motor.speed,
              direction: direction !== undefined ? direction : motor.direction,
              lastChanged: new Date().toLocaleTimeString(),
            }
          : motor
      )
    );
    addLog(`Motor ${id} atualizado para ${status}${speed !== undefined ? ` com velocidade ${speed}` : ""}${direction !== undefined ? ` e direção ${direction}` : ""}`, "info");
  };

  /**
   * Atualiza o status de uma Light Barrier.
   * @param id - Identificador da Light Barrier.
   * @param status - "OK" ou "ERROR".
   */
  const updateLightBarrierStatus = (id: number, status: "OK" | "ERROR") => {
    setLightBarriers((prevLightBarriers) =>
      prevLightBarriers.map((lb) =>
        lb.id === id
          ? { ...lb, status, lastChanged: new Date().toLocaleTimeString() }
          : lb
      )
    );
    addLog(`Light Barrier ${id} status: ${status}`, "info");
  };

  /**
   * Função para atualizar os estados de LED, Motor e Light Barriers ao receber comandos.
   */
  useEffect(() => {
    setupSerialListeners(updateLEDStatus, updateMotorStatus, updateLightBarrierStatus, addLog);
  }, []);

  return (
    <main className="flex-1 p-6 grid grid-cols-3 gap-4">
      {/* LEDs */}
      <div className="col-span-1">
        <Card className="bg-gray-800 border border-gray-700 shadow-xl hover:shadow-2xl transition-shadow">
          <CardHeader className="mb-2">
            <CardTitle className="text-xl text-center text-gray-100">LEDs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {leds.map((led) => (
                <LEDCard key={led.id} led={led} refreshStatus={updateLEDStatus} />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Light Barriers */}
      <div className="col-span-1">
        <Card className="bg-gray-800 border border-gray-700 shadow-xl hover:shadow-2xl transition-shadow mb-4">
          <CardHeader className="mb-2">
            <CardTitle className="text-xl text-center text-gray-100">Light Barriers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {lightBarriers.map((lb) => (
                <LightBarrierCard key={lb.id} lightBarrier={lb} />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Motors */}
      <div className="col-span-1">
        <Card className="bg-gray-800 border border-gray-700 shadow-xl hover:shadow-2xl transition-shadow">
          <CardHeader className="mb-2">
            <CardTitle className="text-xl text-center text-gray-100">Motors</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {motors.map((motor) => (
                <MotorCard key={motor.id} motor={motor} refreshStatus={updateMotorStatus} />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* DebugBox */}
      <div className="col-span-3">
        <DebugBox
          logs={logs}
          clearLogs={clearLogs}
          deleteLog={deleteLog}
          sendCommand={sendCommand}
        />
      </div>
    </main>
  );
};

export default ControlPanel;
