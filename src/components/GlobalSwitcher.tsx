// src/components/GlobalSwitcher.tsx
import React, { useEffect, useState } from 'react';
import { Switch } from './ui/switch'; // Certifique-se de que o caminho está correto
import clsx from 'clsx';
import CustomTooltip from './CustomTooltip';

interface Motor {
  id: number;
  direction: 'CW' | 'CCW';
}

interface GlobalSwitcherProps {
  motor: Motor;
  setTempMotorValues: React.Dispatch<
    React.SetStateAction<Record<number, { speed: number; direction: 'CW' | 'CCW' }>>
  >;
}

const GlobalSwitcher: React.FC<GlobalSwitcherProps> = ({ motor, setTempMotorValues }) => {
  const [isChecked, setIsChecked] = useState<boolean>(motor.direction === 'CW');

  useEffect(() => {
    setIsChecked(motor.direction === 'CW');
  }, [motor.direction]);

  const toggleSwitch = () => {
    const newDirection: 'CW' | 'CCW' = isChecked ? 'CCW' : 'CW';
    setIsChecked(!isChecked);

    setTempMotorValues((prev) => ({
      ...prev,
      [motor.id]: {
        ...prev[motor.id],
        direction: newDirection,
      },
    }));
  };

  return (
    <div className="flex items-center space-x-2 switcher">
      <CustomTooltip content="Toggle Direction">
        <Switch
          checked={isChecked}
          onChange={toggleSwitch}
          className={clsx(
            'relative inline-flex items-center h-10 w-20 bg-gray-600 border-2 border-gray-700 rounded-full transition-transform duration-300',
            'focus:outline-none focus:ring-2 focus:ring-violet-500',
            'shadow-lg transform-gpu switcher-inner',
            isChecked ? 'active' : 'inactive'
          )}
          aria-label={`Toggle direction for Motor ${motor.id}`}
        >
          <span
            className={clsx(
              'absolute left-1 top-1 bg-purple-500 rounded-full h-8 w-8 transition-transform duration-300',
              isChecked ? 'translate-x-10 scale-100' : 'translate-x-0 scale-70',
              'shadow-inner switcher-thumb'
            )}
          />
        </Switch>
      </CustomTooltip>
      <span className="text-sm text-gray-400 capitalize">{isChecked ? 'CW' : 'CCW'}</span>
    </div>
  );
};

export default GlobalSwitcher;
