// src/utils/commands.ts

import { invoke } from "@tauri-apps/api/tauri";
import { toast } from "@/components/Toast";

/**
 * Formata um comando no novo formato binário:
 * [COMMAND_ID (1 byte), HARDWARE_ID (1 byte), VALUE (4 bytes), '\n' (1 byte)]
 */
export function formatCommand(commandId: number, hardwareId: number, value: number): Uint8Array {
  const buffer = new Uint8Array(7);
  buffer[0] = commandId;    // COMMAND_ID
  buffer[1] = hardwareId;   // HARDWARE_ID

  // VALUE (4 bytes unsigned 32-bit, little-endian)
  const dataView = new DataView(buffer.buffer);
  dataView.setUint32(2, value, true); // little-endian

  buffer[6] = 0x0A; // '\n' END CHAR
  return buffer;
}

/**
 * Envia um comando formatado via porta serial. Agora espera um Uint8Array.
 */
export async function sendFormattedCommand(
  command: Uint8Array,
  handleAddLog: (message: string, type: "error" | "success" | "info" | "warning") => void
): Promise<boolean> {
  try {
    // Converte para array numérico
    const array = Array.from(command); 
    await invoke("send_serial", { input: array });
    console.log(`Command Sent: [${array.join(', ')}]`);
    handleAddLog(`Command Sent: [${array.join(', ')}]`, "success");
    toast.success(`Command Sent: [${array.join(', ')}]`);
    return true;
  } catch (error) {
    const array = Array.from(command);
    console.error(`Failed to send command: [${array.join(', ')}]`, error);
    handleAddLog(`Failed to send Command: [${array.join(', ')}]`, "error");
    toast.error(`Failed to send command: [${array.join(', ')}]`);
    return false;
  }
}

/**
 * Envia comandos para controlar o LED (ligar/desligar).
 * - LEDSET (ID=7): value=0 para off, 1 para on
 */
export async function handleLEDToggle(
  id: number,
  state: "ON" | "OFF",
  handleAddLog: (message: string, type: "error" | "success" | "info" | "warning") => void
): Promise<boolean> {
  const hardwareId = id;
  const commandId = 7; // LEDSET
  const value = state === "ON" ? 1 : 0;

  const payload = formatCommand(commandId, hardwareId, value);
  const success = await sendFormattedCommand(payload, handleAddLog);

  if (success) {
    handleAddLog(`LED ${id} turned ${state}.`, "success");
    toast.success(`LED ${id} turned ${state}.`);
  } else {
    handleAddLog(`Failed to turn ${state} LED ${id}.`, "error");
    toast.error(`Failed to turn ${state} LED ${id}.`);
  }

  return success;
}

/**
 * Envia comandos para ajustar a intensidade do LED.
 * - LEDPWM (ID=8): value=[1..100] para intensidade
 */
export async function handleLEDSetIntensity(
  id: number,
  intensity: number,
  handleAddLog: (message: string, type: "error" | "success" | "info" | "warning") => void
): Promise<boolean> {
  const hardwareId = id;
  const commandId = 8; // LEDPWM
  const value = intensity;

  const payload = formatCommand(commandId, hardwareId, value);
  const success = await sendFormattedCommand(payload, handleAddLog);

  if (success) {
    handleAddLog(`LED ${id} intensity set to ${intensity}%.`, "success");
    toast.success(`LED ${id} intensity set to ${intensity}%.`);
  } else {
    handleAddLog(`Failed to set intensity of LED ${id}.`, "error");
    toast.error(`Failed to set intensity of LED ${id}.`);
  }

  return success;
}
