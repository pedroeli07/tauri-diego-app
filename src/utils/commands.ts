// src/utils/commands.ts

import { invoke } from "@tauri-apps/api/tauri";
import { toast } from "@/components/Toast";
import { addLog } from "@/lib/utils";
 import { CommandIDs, LightBarrierStatus } from "@/lib/types";
 
/**
 * Updates the status of a Light Barrier in the UI and logs the change.
 */
export function updateLightBarrierStatus(
  id: number,
  status: "ACTIVE" | "INACTIVE",
  updateLightBarrier: (id: number, status: "ACTIVE" | "INACTIVE") => void,
  addLog: (message: string, type?: "error" | "success" | "info" | "warning") => void
) {
  updateLightBarrier(id, status);
  addLog(`Light Barrier ${id} status updated to: ${status}`, "info");
  toast.info(`Light Barrier ${id} status: ${status}`);
}



// Função para gerar logs detalhados no DebugBox
export function logCommandDetails(
  data: number[],
  addLog: (message: string, type?: "info" | "error" | "success" | "warning") => void
) {
  const commandId = data[0];
  const hardwareId = data[1];
  const value = data[2] | (data[3] << 8) | (data[4] << 16) | (data[5] << 24);

  let description = "";

  switch (commandId) {
    case 7:
      description = `TOGGLE_LED -> ID: ${hardwareId}, VALUE: ${value === 1 ? "ON" : "OFF"}`;
      break;
    case 8:
      description = `SET_LED_INTENSITY -> ID: ${hardwareId}, VALUE: ${value}%`;
      break;
    case 3:
      description = `TOGGLE_MOTOR -> ID: ${hardwareId}, VALUE: ${value === 1 ? "ON" : "OFF"}`;
      break;
    case 2:
      description = `SET_MOTOR_SPEED -> ID: ${hardwareId}, SPEED: ${value} Hz`;
      break;
    case 1:
      description = `SET_MOTOR_DIRECTION -> ID: ${hardwareId}, DIRECTION: ${
        value === 0 ? "CW" : "CCW"
      }`;
      break;
    case 20:
      description = `TOGGLE_LIGHT_BARRIER -> ID: ${hardwareId}, VALUE: ${
        value === 1 ? "ACTIVE" : "INACTIVE"
      }`;
      break;
      case CommandIDs.RESET: // Adicione esta linha
      description = `RESET_COMMAND -> ID: ${hardwareId}, VALUE: ${value}`;
      break;
      case CommandIDs.PRODUCTION_MODE: // Adicione esta linha
      description = `PRODUCTION_MODE_COMMAND  -> ID: ${hardwareId}, VALUE: ${value}`;
      break;
    default:
      description = `UNKNOWN_COMMAND -> ID: ${hardwareId}, VALUE: ${value}`;
  }

  addLog(`Bytes Sent: [${data.join(", ")}] -> ${description}`, "info");
}

export async function sendFormattedCommand(
  command: Uint8Array,
  handleAddLog: (message: string, type?: "error" | "success" | "info" | "warning") => void
): Promise<boolean> {
  try {
    const array = Array.from(command);

    // Adicionar log detalhado antes de enviar
    logCommandDetails(array, handleAddLog);

    // Envio para a porta serial
    await invoke("send_serial", { input: array });

    // Log de sucesso
    handleAddLog(`Successfully sent bytes: [${array.join(", ")}]`, "success");
    return true;
  } catch (error) {
    const array = Array.from(command);

    // Log de erro
    handleAddLog(`Failed to send bytes: [${array.join(", ")}]. Error: ${error}`, "error");
    return false;
  }
}


/**
 * Formats a command in binary format:
 * [COMMAND_ID (1 byte), HARDWARE_ID (1 byte), VALUE (4 bytes), '\n' (1 byte)]
 */
/**
 * Formats a command in binary format:
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
 * Sends a formatted command via the serial port. Now expects a Uint8Array.
 */
export async function sendFormattedCommanddddd(
  command: Uint8Array,
  handleAddLog: (message: string, type: "error" | "success" | "info" | "warning") => void
): Promise<boolean> {
  try {
    // Convert to numeric array
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
 * Sends a combined command to update LED status and intensity.
 * @param id - The ID of the LED.
 * @param status - The desired status ("ON" | "OFF").
 * @param intensity - The desired intensity (0-100).
 * @returns A promise that resolves to true if the command was sent successfully.
 */
export async function handleLEDUpdate(
  id: number,
  status: "ON" | "OFF",
  intensity: number,
  handleAddLog: (message: string, type?: "error" | "success" | "info" | "warning") => void
): Promise<boolean> {
  try {
    const commandId = 9; // New command ID for combined LED update
    const statusValue = status === "ON" ? 1 : 0;
    const combinedValue = (intensity << 16) | statusValue;

    const payload = formatCommand(commandId, id, combinedValue);
    const success = await sendFormattedCommand(payload, handleAddLog);

    if (success) {
      handleAddLog(`LED ${id} updated to ${status} with intensity ${intensity}%.`, "info");
      toast.success(`LED ${id} updated to ${status} with intensity ${intensity}%.`);
      return true;
    } else {
      handleAddLog(`Failed to update LED ${id}.`, "error");
      return false;
    }
  } catch (error) {
    console.error("Error updating LED:", error);
    toast.error("Error updating LED.");
    handleAddLog(`Failed to update LED ${id}.`, "error");
    return false;
  }
}

/**
 * Sends commands to control the Motor (state, speed, and direction).
 * According to the table:
 * - MDIR (ID=1): value=0 or 1
 * - MSPEED (ID=2): value=[1..1000]
 * - MSTATE (ID=3): value=0 or 1 (off/on)
 */
export async function handleMotorCommand(
  id: number,
  state: "ON" | "OFF",
  speed: number,
  direction: "CW" | "CCW",
  handleAddLog: (message: string, type?: "error" | "success" | "info" | "warning") => void
): Promise<boolean> {
  const hardwareId = id;

  // Adjust motor state
  const mstateValue = state === "ON" ? 1 : 0;
  const mstateCmd = formatCommand(3, hardwareId, mstateValue);
  const stateSuccess = await sendFormattedCommand(mstateCmd, handleAddLog);
  if (!stateSuccess) return false;

  // Adjust motor speed
  const mspeedCmd = formatCommand(2, hardwareId, speed);
  const speedSuccess = await sendFormattedCommand(mspeedCmd, handleAddLog);
  if (!speedSuccess) return false;

  // Adjust motor direction
  const mdirValue = direction === "CW" ? 1 : 0;
  const mdirCmd = formatCommand(1, hardwareId, mdirValue);
  const dirSuccess = await sendFormattedCommand(mdirCmd, handleAddLog);
  return dirSuccess;
}
