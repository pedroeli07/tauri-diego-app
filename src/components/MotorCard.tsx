// src/components/MotorCard.tsx

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Power, RefreshCcw, RefreshCw  } from "lucide-react";
import { Motor } from "@/lib/types";
import clsx from "clsx";
import { handleMotorCommand } from "@/utils/commands";
import { toast } from "@/components/Toast";
import Image from 'next/image';

interface MotorCardProps {
  motor: Motor;
  refreshStatus: (id: number, status: "ON" | "OFF", speed?: number, direction?: "CW" | "CCW") => void;
}

const MotorCard: React.FC<MotorCardProps> = ({ motor, refreshStatus }) => {
  const [speed, setSpeed] = useState<number>(motor.speed);
  const [direction, setDirection] = useState<"CW" | "CCW">(motor.direction);

  // Sincroniza a velocidade e direção com o status do motor
  useEffect(() => {
    if (motor.status === "OFF") {
      setSpeed(0);
    } else {
      setSpeed(motor.speed);
    }
    setDirection(motor.direction);
  }, [motor.speed, motor.status, motor.direction]);

  /**
   * Alterna o status de energia do motor e envia o comando via serial.
   */
  const togglePower = async () => {
    const newStatus = motor.status === "ON" ? "OFF" : "ON";
    const newSpeed = newStatus === "OFF" ? 0 : (speed || 1000);
    const newDirection = direction; // Mantém a direção atual

    // Enviar comando via serial
    const success = await handleMotorCommand(
      motor.id,
      newStatus,
      newSpeed,
      newDirection
    );

    if (success) {
      refreshStatus(motor.id, newStatus, newSpeed, newDirection);
      toast.success(`Motor ${motor.id} atualizado para ${newStatus} com velocidade ${newSpeed} Hz e direção ${newDirection}`);
    } else {
      toast.error(`Falha ao atualizar Motor ${motor.id}.`);
    }
  };

  /**
   * Alterna a direção do motor.
   */
  const toggleDirection = () => {
    const newDirection = direction === "CW" ? "CCW" : "CW";
    setDirection(newDirection);
    // Opcional: Enviar comando imediatamente ou esperar pelo botão "Update"
  };

  /**
   * Lida com mudanças na velocidade.
   */
  const handleSpeedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSpeed = Math.max(0, Math.min(5000, Number(e.target.value)));
    setSpeed(newSpeed);
    // Opcional: Enviar comando imediatamente ou esperar pelo botão "Update"
  };

  /**
   * Envia o comando de atualização ao clicar em "Update".
   */
  const saveMotorSettings = async () => {
    const validatedSpeed = Math.max(0, Math.min(5000, speed));
    const newStatus = validatedSpeed > 0 ? "ON" : "OFF";
    const success = await handleMotorCommand(
      motor.id,
      newStatus,
      validatedSpeed,
      direction
    );
    if (success) {
      refreshStatus(motor.id, newStatus, validatedSpeed, direction);
      toast.success(`Motor ${motor.id} atualizado para ${newStatus} com velocidade ${validatedSpeed} Hz e direção ${direction}`);
    } else {
      toast.error(`Falha ao atualizar Motor ${motor.id}.`);
    }
  };

  return (
    <div
      className={clsx(
        "relative p-4 rounded-lg transition-all duration-300 shadow-lg w-full mx-auto flex flex-col space-y-4",
        motor.status === "ON"
          ? "bg-gradient-to-br from-purple-500 to-purple-700 border border-purple-600 shadow-purple-800/50"
          : "bg-gradient-to-br from-gray-700 to-gray-800 border border-gray-600 shadow-gray-700/50"
      )}
      style={{
        boxShadow:
          motor.status === "ON"
            ? `0 0 ${speed / 500}px rgba(128, 0, 128, 0.8), 0 0 ${speed / 400}px rgba(128, 0, 128, 0.9)`
            : "none",
      }}
    >
      {/* Cabeçalho */}
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-white">Motor {motor.id}</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={togglePower}
          className={clsx(
            "transition-transform transform",
            motor.status === "ON" ? "text-purple-400" : "text-gray-500",
            "hover:scale-110"
          )}
          aria-label={`Toggle Motor ${motor.id} power`}
        >
          <Power size={24} />
        </Button>
      </div>

      {/* Imagem Representativa do Motor */}
      <div className="flex justify-center">
        {/* 
          Substitua o src por uma imagem representativa do motor de impressora 3D.
          Exemplo: <img src="/motor.png" alt={`Motor ${motor.id}`} className="w-16 h-16" />
        */}
        <Image width={100} height={100} src="/download.png" alt={`Motor ${motor.id}`} className="w-16 h-16" />
      </div>

      {/* Status e Direção */}
      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-200">Status: {motor.status}</div>
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleDirection}
          className="text-blue-400 hover:text-blue-500"
          aria-label={`Toggle Motor ${motor.id} direction`}
        >
          {direction === "CW" ? <RefreshCcw /> : <RefreshCw />}
        </Button>
      </div>

      {/* Controle de Velocidade */}
      <div className="flex flex-col space-y-2">
        <label htmlFor={`speed-${motor.id}`} className="block text-gray-200 text-sm font-medium">
          Speed: {speed} Hz
        </label>
        <input
          type="range"
          id={`speed-${motor.id}`}
          min="0"
          max="5000"
          step="100"
          value={speed}
          onChange={handleSpeedChange}
          className="w-full"
          disabled={motor.status === "OFF"}
        />
      </div>

      {/* Botão Update */}
      <Button
        onClick={saveMotorSettings}
        className="bg-purple-500 hover:bg-purple-600 text-white text-sm rounded-md px-4 py-1"
        disabled={motor.status === "OFF"}
      >
        Update
      </Button>
    </div>
  );
};

export default MotorCard;
