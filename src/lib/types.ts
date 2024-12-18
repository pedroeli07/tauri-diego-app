// src/types/Motor.ts

export enum Status {
  OK = "OK",
  ERROR = "ERROR",
  WARNING = "WARNING",
}

/**
 * Tipo para LEDs.
 */
export interface LED {
  id: number;
  status: "ON" | "OFF";
  intensity: number;
  lastChanged: string;
}

/**
 * Tipo para motores.
 */
export interface Motor {
  id: number;
  status: "ON" | "OFF";
  speed: number;
  direction: "CW" | "CCW";
  lastChanged: string;
}

/**
 * Tipo para Light Barriers.
 */
export interface LightBarrier {
  id: number;
  status: "OK" | "ERROR";
  lastChanged: string;
}


export interface Log {
  message: string;
  type: "error" | "success" | "info" | "warning";
  color?: string;
}


export interface HomeProps {
  led: LED; // LED data: id, status (ON/OFF), intensity
  refreshStatus: (id: number, status: "ON" | "OFF", intensity?: number) => void; // Callback to refresh LED status
  isConnected: boolean; // Indicates if the user is connected to the serial port
  isConnectedInternal: boolean;
}

/**
 * Interface para as props do ControlPanel
 */
export interface ControlPanelProps {
  isConnected: boolean; // Estado de conexão global
}

// Interface para as props do DebugBox
export interface DebugBoxProps {
  logs: Log[];
  clearLogs: () => void;
  deleteLog: (index: number) => void;
  sendCommand: (command: string) => void;
}

// Defining the properties for the Serial component
export interface SerialProps {
  setIsConnected: (status: boolean) => void; // Function to set connection status
  addLog: (message: string, type?: "error" | "success" | "info" | "warning") => void; // Function to log messages
  isRecording: boolean; // State to check if recording is active
  onRecord: () => void; // Function to handle recording action
}

/**
 * Interface para as props do LEDCard
 */
export interface LEDCardProps {
  led: LED;
  refreshStatus: (id: number, status: "ON" | "OFF", intensity?: number) => void;
  isConnected: boolean;
}

export interface LightBarrierCardProps {
  lightBarrier: {
    id: number;
    status: "OK" | "ERROR" | "WARNING";
    lastChanged: string;
  };
  isConnected: boolean;
  isConnectedInternal: boolean;
}
/**
 * Interface para as props do MotorCard
 */
export interface MotorCardProps {
  motor: Motor;
  refreshStatus: (id: number, status: "ON" | "OFF", speed?: number, direction?: "CW" | "CCW") => void;
  isConnected: boolean;
}


export interface GlobalCardProps {
  title: string;
  id: number;
  type: "LED" | "MOTOR" | string;
  status: "ON" | "OFF";
  intensity?: number;
  speed?: number;
  direction?: "CW" | "CCW";
  icon: React.ReactNode;
  onToggle: () => void;
  onUpdate: () => void;
  children: React.ReactNode;
  isConnected: boolean;
  isUpdating: boolean; // Novo prop para indicar se está atualizando
  havePowerButton?: boolean;
  haveUpdateButton?: boolean;
}
