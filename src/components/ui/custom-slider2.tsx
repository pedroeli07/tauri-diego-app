import React, { useState } from "react";
import { Slider } from "@/components/ui/slider";

interface CustomSliderProps {
  value: number
  onChange: (value: number) => void
  min: number
  max: number
  step?: number
  disabled?: boolean
  className?: string
  valueLabelFormat?: (value: number) => string
  valueLabelDisplay?: string
}

const CustomSlider: React.FC<CustomSliderProps> = ({
  value,
  onChange,
  min,
  max,
  step = 1,
  disabled = false,
  className = "", // Valor padrão vazio para evitar erros
  valueLabelFormat,
  valueLabelDisplay
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const getThumbStyle = (): React.CSSProperties => {
    const intensity = (value - min) / (max - min); // Normaliza o valor entre 0 e 1
    return {
      background: `hsl(270, ${50 + intensity * 50}%, ${80 - intensity * 40}%)`, // Tons de roxo dinâmicos
      boxShadow: `0 0 10px 3px rgba(128, 0, 255, ${0.4 + intensity * 0.6})`, // Glow roxo
      transition: "all 0.3s ease",
    };
  };

  const getTrackStyle = (): React.CSSProperties => {
    const progress = ((value - min) / (max - min)) * 100; // Progresso em %
    return {
      background: `linear-gradient(to right, hsl(270, 70%, 60%) ${progress}%, #4B5563 ${progress}%)`, // Gradiente dinâmico com roxo
      transition: "all 0.3s ease",
    };
  };


  return (
    <div className={`relative w-full ${className}`}>
      {/* Exibir o valor acima do slider quando arrastado */}
      {isDragging && (
        <div
          className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-violet-500 text-white text-xs font-bold px-2 py-1 rounded-md shadow-lg"
          style={{
            textShadow: "0 0 8px hsl(270, 70%, 50%)", // Alterado para tons de roxo
          }}
        >
          {valueLabelFormat ? valueLabelFormat(value) : value}
        </div>
      )}
  

      <Slider
        value={[value]}
        onValueChange={(values) => onChange(values[0])}
        min={min}
        max={max}
        step={step}
        disabled={disabled}
        onPointerDown={() => setIsDragging(true)}
        onPointerUp={() => setIsDragging(false)}
        className="relative flex items-center w-full h-2 rounded-full cursor-pointer"
        style={getTrackStyle()} // Aplica o gradiente dinâmico no track
      >
        <span
          className="absolute h-5 w-5 rounded-full shadow-md"
          style={getThumbStyle()} // Aplica os tons de rosa no thumb
        />
      </Slider>
    </div>
  );
};

export default CustomSlider;
