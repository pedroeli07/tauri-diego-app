// src/utils/commands.ts

import { invoke } from "@tauri-apps/api/tauri";
import { toast } from "@/components/Toast";
import { LED, Motor, LightBarrier } from "@/lib/types";

/**
 * Atualiza o status de uma Light Barrier.
 * @param id - Identificador da Light Barrier.
 * @param status - "OK" ou "ERROR".
 */
export function updateLightBarrierStatus(
  id: number,
  status: "OK" | "ERROR",
  updateLightBarrier: (id: number, status: "OK" | "ERROR") => void,
  addLog: (message: string, type?: "error" | "success" | "info" | "warning") => void
) {
  updateLightBarrier(id, status);
  addLog(`Light Barrier ${id} status: ${status}`, "info");
}

/**
 * Formats a command string based on provided parameters.
 * @param parts - An array of command parts.
 * @returns The formatted command string.
 */
export function formatCommand(parts: string[]): string {
  return parts.join('|') + '\n';
}

/**
 * Sends a formatted command string via serial.
 * @param command - The command string to send.
 */
export async function sendFormattedCommand(command: string): Promise<boolean> {
  try {
    await invoke("send_serial", { input: command });
    console.log(`Sent Command: ${command.trim()}`);
    return true;
  } catch (error) {
    console.error(`Failed to send command: ${command.trim()}`, error);
    toast.error(`Failed to send command: ${command.trim()}`);
    return false;
  }
}

/**
 * Handles sending LED commands.
 * @param id - LED identifier.
 * @param state - "ON" or "OFF".
 * @param intensity - LED intensity (0-100).
 */
export async function handleLEDCommand(id: number, state: "ON" | "OFF", intensity: number): Promise<boolean> {
  const command = formatCommand(["LED", id.toString(), state, "INTENSITY", intensity.toString()]);
  return await sendFormattedCommand(command);
}

/**
 * Handles sending Motor commands.
 * @param id - Motor identifier.
 * @param state - "ON" or "OFF".
 * @param speed - Motor speed.
 * @param direction - "CW" or "CCW".
 */
export async function handleMotorCommand(id: number, state: "ON" | "OFF", speed: number, direction: "CW" | "CCW"): Promise<boolean> {
  const command = formatCommand([
    "MOTOR",
    id.toString(),
    state,
    "SPEED",
    speed.toString(),
    "DIR",
    direction
  ]);
  return await sendFormattedCommand(command);
}
