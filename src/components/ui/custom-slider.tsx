import React, { useState } from "react";
import { Slider } from "@/components/ui/slider";

interface CustomSliderProps {
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step?: number;
  disabled?: boolean;
  className?: string; // Adicionar suporte para className
}

const CustomSlider: React.FC<CustomSliderProps> = ({
  value,
  onChange,
  min,
  max,
  step = 1,
  disabled = false,
  className = "", // Valor padrão vazio para evitar erros
}) => {
  const [isDragging, setIsDragging] = useState(false);

  return (
    <div className={`relative w-full ${className}`}>
      {/* Exibir o valor acima do slider quando clicado */}
      {isDragging && (
        <div
          className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-purple-700 text-white text-xs font-bold px-2 py-1 rounded-md shadow-lg"
          style={{
            textShadow: "0 0 8px #A855F7",
          }}
        >
          {value}
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
        className="relative flex items-center w-full h-2 bg-gray-800 rounded-full cursor-pointer"
        style={{
          background: `linear-gradient(to right, #A855F7 ${((value - min) / (max - min)) * 100}%, #4B5563 ${((value - min) / (max - min)) * 100}%)`,
        }}
      >
        <span
          className="absolute h-5 w-5 bg-purple-500 rounded-full shadow-md"
          style={{
            boxShadow: "0 0 10px 3px #A855F7",
          }}
        />
      </Slider>
    </div>
  );
};

export default CustomSlider;
