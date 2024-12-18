// src/utils/commands.ts

import { invoke } from "@tauri-apps/api/tauri";
import { toast } from "@/components/Toast";
import { LED, Motor, LightBarrier } from "@/lib/types";

/**
 * Updates the status of a Light Barrier in the UI and logs the change.
 * 
 * @param id - Identifier of the Light Barrier.
 * @param status - New status of the Light Barrier ("OK" or "ERROR").
 * @param updateLightBarrier - Function to update the Light Barrier's status in the UI.
 * @param addLog - Function to add a log entry.
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
 * Formats a command string by joining its parts with a pipe ('|') delimiter
 * and appending a newline character. This ensures consistency in the command
 * structure sent via the serial port.
 * 
 * @param parts - An array of strings representing different parts of the command.
 * @returns A single formatted command string.
 * 
 * @example
 * formatCommand(["LED", "3", "ON", "INTENSITY", "75"]) // "LED|3|ON|INTENSITY|75\n"
 */
export function formatCommand(parts: string[]): string {
  return parts.join('|') + '\n';
}

/**
 * Sends a formatted command string via the serial port using Tauri's `invoke` API.
 * Handles success and error notifications to the user.
 * 
 * @param command - The complete command string to be sent.
 * @returns A promise that resolves to `true` if the command was sent successfully, or `false` otherwise.
 */
export async function sendFormattedCommand(command: string): Promise<boolean> {
  try {
    await invoke("send_serial", { input: command });
    console.log(`Sent Command: ${command.trim()}`);
    toast.success(`Command Sent: ${command.trim()}`);
    return true;
  } catch (error) {
    console.error(`Failed to send command: ${command.trim()}`, error);
    toast.error(`Failed to send command: ${command.trim()}`);
    return false;
  }
}

/**
 * Handles sending commands to control an LED's state and intensity.
 * 
 * @param id - The identifier of the LED to control.
 * @param state - The desired state of the LED ("ON" or "OFF").
 * @param intensity - The desired intensity level of the LED (0-100%).
 * @returns A promise that resolves to `true` if the command was sent successfully, or `false` otherwise.
 * 
 * @example
 * handleLEDCommand(3, "ON", 75) // Sends "LED|3|ON|INTENSITY|75\n"
 */
export async function handleLEDCommand(id: number, state: "ON" | "OFF", intensity: number): Promise<boolean> {
  const command = formatCommand(["LED", id.toString(), state, "INTENSITY", intensity.toString()]);
  return await sendFormattedCommand(command);
}

/**
 * Handles sending commands to control a Motor's state, speed, and direction.
 * 
 * @param id - The identifier of the Motor to control.
 * @param state - The desired state of the Motor ("ON" or "OFF").
 * @param speed - The desired speed of the Motor in Hz.
 * @param direction - The desired direction of the Motor rotation ("CW" or "CCW").
 * @returns A promise that resolves to `true` if the command was sent successfully, or `false` otherwise.
 * 
 * @example
 * handleMotorCommand(2, "ON", 1500, "CW") // Sends "MOTOR|2|ON|SPEED|1500|DIR|CW\n"
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


