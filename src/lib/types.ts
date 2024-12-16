// src/types/Motor.ts

  // Tipo para o payload do evento 'ackReceived'
export interface AckReceivedPayload {
  message: string;
}

// Tipo para o payload do evento 'errorReceived'
export interface ErrorReceivedPayload {
  message: string;
}

// Tipo para o payload do evento 'updateSerial'
export interface UpdateSerialPayload {
  message: string; // ou outro tipo, dependendo do backend
}

// Tipo genérico para todos os eventos que têm uma mensagem como payload
export interface Payload {
  message: string;
}

// src/lib/types.ts

export interface LED {
  id: number;
  status: "ON" | "OFF";
  intensity: number; // 0 to 100
  lastChanged: string;
}

export interface Motor {
  id: number;
  status: "ON" | "OFF";
  speed: number; // e.g., RPM
  direction: "CW" | "CCW";
  lastChanged: string;
}





/**
 * Define as interfaces para os statuses dos LEDs e Motors.
 */
export interface LEDStatus {
  id: number;
  status: "ON" | "OFF";
  intensity: number;
  lastChanged: string;
}

export interface MotorStatus {
  id: number;
  status: "ON" | "OFF";
  speed: number;
  direction: "CW" | "CCW";
  lastChanged: string;
}

export interface Log {
  message: string;
  type: "error" | "success" | "info" | "warning";
}

export interface LightBarrier {
  id: number;
  status: "OK" | "ERROR"; // Status da Light Barrier
  lastChanged: string;
}