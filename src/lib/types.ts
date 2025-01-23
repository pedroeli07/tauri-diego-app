// src/types/Motor.ts

export enum LightBarrierStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}

/**
 * Tipo para Light Barriers.
 */
export interface LightBarrier {
  id: number;
  status: LightBarrierStatus; // Usando o enum aqui
  lastChanged: string;
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

export enum MotorDirection {
  CW = 1,  // Clockwise
  CCW = 0, // Counterclockwise
}


export enum CommandIDs {
  MOTOR_DIRECTION = 1,
  MOTOR_SPEED = 2,
  MOTOR_ON_OFF = 3,
  LED_ON_OFF = 7,
  LED_INTENSITY = 8,
  LIGHT_BARRIER_TOGGLE = 20,
  RESET = 9,
  PRODUCTION_MODE = 10,
  STATUS_UPDATE = 30,
  CONNECTION_ESTABLISHED = 31,
}


export interface SerialPayload {
  data: number[];
}


// Interface para o status completo da interface
// Interface para o status completo da interface
export interface InterfaceStatus {
  leds: LED[];
  motors: Motor[];
  lightBarriers: LightBarrier[];
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

export interface Motor2 {
  id: number;
  status: "ON" | "OFF";
  speed: number;
  direction: MotorDirection; // Substituindo as strings pelo enum
  lastChanged: string;
}

export interface Log {
  message: string;
  type: "error" | "success" | "info" | "warning";
  color?: string; // Opcional, se usado para estilização
  timestamp: string; // Obrigatório, deve ser uma string representando a data/hora
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
    status: "ACTIVE" | "INACTIVE";
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



// Interface defining the structure of Light Barriers
export interface LightBarriers {
  id: number;
  status: LightBarrierStatus; // Replace string literals with the Status enum
  lastChanged: string;
}

export interface TempMotor {
  speed?: number;
  direction?: 'CW' | 'CCW';
}