// src/components/LEDCard.tsx
import React, { useState, useEffect } from "react";
import { LED } from "@/lib/types";
import { handleLEDCommand } from "@/utils/commands";
import { toast } from "@/components/Toast";
import GlobalCard from "@/components/GlobalCard";
import LEDLamp from "@/components/LEDIcon";
import { Input } from "@/components/ui/input";
import CustomSlider from "@/components/ui/custom-slider";
import CustomTooltip from "@/components/CustomTooltip"; // Importação do Tooltip
import { motion, AnimatePresence } from "framer-motion"; // Importação para animações

interface LEDCardProps {
  led: LED;
  refreshStatus: (id: number, status: "ON" | "OFF", intensity?: number) => void;
}

const LEDCard: React.FC<LEDCardProps> = ({ led, refreshStatus }) => {
  const [tempIntensity, setTempIntensity] = useState<number>(led.intensity);
  const [blink, setBlink] = useState<boolean>(true);
  const [intensityBlink, setIntensityBlink] = useState<boolean>(true); // Estado para piscar a intensidade

  // Controle do efeito de piscar do card
  useEffect(() => {
    const interval = setInterval(() => {
      setBlink(false);
      setTimeout(() => setBlink(true), 1000); // Mantém o estado de blink falso por 1 segundo
    }, 2200); // Pisca a cada 2.2 segundos

    return () => clearInterval(interval);
  }, []);

  // Controle do efeito de piscar da intensidade
  useEffect(() => {
    if (led.status === "ON") {
      const intensityInterval = setInterval(() => {
        setIntensityBlink(false);
        setTimeout(() => setIntensityBlink(true), 1000); // Mantém o estado de intensidadeBlink falso por 1 segundo
      }, 2200); // Pisca a cada 2.2 segundos

      return () => clearInterval(intensityInterval);
    }
  }, [led.status]);

  // Atualiza a intensidade quando o status muda
  useEffect(() => {
    if (led.status === "OFF") {
      setTempIntensity(0);
    } else {
      setTempIntensity(led.intensity || 100);
    }
  }, [led.intensity, led.status]);

  // Função para alternar o status do LED
  const toggleStatus = async () => {
    const newStatus = led.status === "ON" ? "OFF" : "ON";
    const newIntensity = newStatus === "OFF" ? 0 : led.intensity || 100;

    const success = await handleLEDCommand(led.id, newStatus, newIntensity);
    if (success) {
      refreshStatus(led.id, newStatus, newIntensity);
      toast.success(`LED ${led.id} atualizado para ${newStatus} com intensidade ${newIntensity}%`);
    } else {
      toast.error(`Falha ao atualizar LED ${led.id}.`);
    }
  };

  // Função para lidar com a mudança de intensidade
  const handleIntensityChange = (value: number) => {
    setTempIntensity(value);
  };

  // Função para salvar a intensidade
  const saveIntensity = async () => {
    const validatedIntensity = Math.max(0, Math.min(100, parseFloat(tempIntensity.toFixed(2))));
    const newStatus = validatedIntensity > 0 ? "ON" : "OFF";
    const success = await handleLEDCommand(led.id, newStatus, validatedIntensity);
    if (success) {
      refreshStatus(led.id, newStatus, validatedIntensity);
      toast.success(`LED ${led.id} atualizado para ${newStatus} com intensidade ${validatedIntensity}%`);
    } else {
      toast.error(`Falha ao atualizar LED ${led.id}.`);
    }
  };

  return (
    <GlobalCard
      title={`LED ${led.id}`}
      id={led.id}
      type="LED"
      status={led.status}
      intensity={tempIntensity}
      icon={<LEDLamp intensity={tempIntensity} />}
      onToggle={toggleStatus}
      onUpdate={saveIntensity}
      
    >
      {/* Efeitos de Piscar nos Cantos */}
      <AnimatePresence>
        {led.status === "ON" ? (
          <>
            <motion.div
              className={`absolute top-2 left-2 text-purple-500 font-bold ${intensityBlink ? "opacity-100" : "opacity-50"}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: intensityBlink ? 1 : 0.5 }}
              transition={{ duration: 1 }}
            >
              {tempIntensity}%
            </motion.div>
            <motion.div
              className={`absolute bottom-2 right-2 text-purple-500 font-bold ${intensityBlink ? "opacity-100" : "opacity-50"}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: intensityBlink ? 1 : 0.5 }}
              transition={{ duration: 1 }}
            >
              {tempIntensity}%
            </motion.div>
          </>
        ) : (
          <>
            <motion.div
              className={`absolute top-2 left-2 text-purple-500 font-bold ${blink ? "opacity-100" : "opacity-50"}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: blink ? 1 : 0.5 }}
              transition={{ duration: 1 }}
            >
              OFF
            </motion.div>
            <motion.div
              className={`absolute bottom-2 right-2 text-purple-500 font-bold ${blink ? "opacity-100" : "opacity-50"}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: blink ? 1 : 0.5 }}
              transition={{ duration: 1 }}
            >
              OFF
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Controles Customizados */}
      <div className="flex flex-col space-y-4 mt-8">
        {/* Intensidade Principal */}
        <div className="flex justify-center items-center">
          <span className="text-xl text-purple-500 font-semibold">
            {tempIntensity}%
          </span>
        </div>

        {/* Slider e Input de Intensidade */}
        <div className="flex items-center space-x-2">
          <CustomTooltip content="Adjust intensity percentage" placement="top">
            <CustomSlider
              value={tempIntensity}
              onChange={handleIntensityChange}
              min={0}
              max={100}
              step={0.01}
              disabled={led.status === "OFF"}
            />
          </CustomTooltip>
          <div className="relative">
            <Input
              type="number"
              value={tempIntensity}
              onChange={(e) => {
                const value = parseFloat(e.target.value);
                if (!isNaN(value)) {
                  setTempIntensity(Math.min(100, Math.max(0, value)));
                }
              }}
              className="w-20 text-sm bg-gray-700 text-white rounded-md"
              min={0}
              max={100}
              step={0.01}
              disabled={led.status === "OFF"}
            />
            <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs">%</span>
          </div>
        </div>
      </div>
    </GlobalCard>
  );
};

export default LEDCard;
