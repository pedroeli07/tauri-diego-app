import { invoke } from "@tauri-apps/api/tauri";
import { toast } from "@/components/Toast";

/**
 * Formats a command in binary format.
 * [COMMAND_ID (1 byte), HARDWARE_ID (1 byte), VALUE (4 bytes), '\n' (1 byte)]
 */
export function formatCommand(
  commandId: number,
  hardwareId: number,
  value: number
): Uint8Array {
  const buffer = new Uint8Array(7);
  buffer[0] = commandId;
  buffer[1] = hardwareId;

  const dataView = new DataView(buffer.buffer);
  dataView.setUint32(2, value, true); // Little-endian

  buffer[6] = 0x0a; // '\n'

  return buffer;
}

/**
 * Formats a command into a readable string for logging.
 */
export function formatLogReadableResponse(
  commandId: number,
  hardwareId: number,
  value: number
): string {
  let action = "UNKNOWN_COMMAND";
  let valueDescription = value.toString();

  switch (commandId) {
    case 7:
      action = "TOGGLE_LED";
      valueDescription = value === 1 ? "ON" : "OFF";
      break;
    case 8:
      action = "SET_LED_INTENSITY";
      valueDescription = `${value}%`;
      break;
    case 3:
      action = "TOGGLE_MOTOR";
      valueDescription = value === 1 ? "ON" : "OFF";
      break;
    case 2:
      action = "SET_MOTOR_SPEED";
      valueDescription = `${value}Hz`;
      break;
    case 1:
      action = "SET_MOTOR_DIRECTION";
      valueDescription = value === 0 ? "CW" : "CCW";
      break;
    case 10:
      action = "TOGGLE_LIGHT_BARRIER";
      valueDescription = value === 1 ? "ACTIVE" : "INACTIVE";
      break;
    default:
      valueDescription = value.toString();
  }

  return `${action} -> ID: ${hardwareId}, VALUE: ${valueDescription}`;
}

/**
 * Parses the received binary data and updates the UI accordingly.
 */
export function parseBinaryResponse(
  data: number[],
  updateLEDStatus: (id: number, status: "ON" | "OFF", intensity?: number) => void,
  updateMotorStatus: (
    id: number,
    status: "ON" | "OFF",
    speed?: number,
    direction?: "CW" | "CCW"
  ) => void,
  updateLightBarrierStatus: (id: number, status: "ACTIVE" | "INACTIVE") => void,
  addLog: (message: string, type?: "error" | "success" | "info" | "warning") => void
) {
  if (data.length < 7) {
    addLog("Invalid data received (less than 7 bytes).", "error");
    return;
  }

  const commandId = data[0];
  const hardwareId = data[1];
  const value = data[2] | (data[3] << 8) | (data[4] << 16) | (data[5] << 24);

  if (hardwareId < 1 || hardwareId > 10) {
    addLog(`[CMD:${commandId}] Invalid hardware_id=${hardwareId}. Ignoring command.`, "warning");
    return;
  }

  addLog(`[CMD:${commandId}] HW:${hardwareId} -> Parsing value=${value}.`, "info");

  switch (commandId) {
    case 7: // LED ON/OFF
      const ledStatus = value === 1 ? "ON" : "OFF";
      updateLEDStatus(hardwareId, ledStatus, ledStatus === "ON" ? 100 : 0);
      addLog(`[CMD:${commandId}] LED ${hardwareId} updated to ${ledStatus}.`, "info");
      break;
    case 8: // LED Intensity
      const intensity = value & 0xffff;
      updateLEDStatus(hardwareId, "ON", intensity);
      addLog(`[CMD:${commandId}] LED ${hardwareId} intensity adjusted to ${intensity}%.`, "info");
      break;
    case 3: // Motor State
      const motorState = value === 1 ? "ON" : "OFF";
      updateMotorStatus(hardwareId, motorState, 0, "CW");
      addLog(`[CMD:${commandId}] Motor ${hardwareId} updated to ${motorState}.`, "info");
      break;
    case 2: // Motor Speed
      updateMotorStatus(hardwareId, "ON", value, "CW");
      addLog(`[CMD:${commandId}] Motor ${hardwareId} speed adjusted to ${value} Hz.`, "info");
      break;
    case 1: // Motor Direction
      const direction = value === 0 ? "CW" : "CCW";
      updateMotorStatus(hardwareId, "ON", undefined, direction);
      addLog(`[CMD:${commandId}] Motor ${hardwareId} direction adjusted to ${direction}.`, "info");
      break;
    case 10: // Light Barrier Update
      const lbStatus = value === 1 ? "ACTIVE" : "INACTIVE";
      updateLightBarrierStatus(hardwareId, lbStatus);
      addLog(`[CMD:${commandId}] Light Barrier ${hardwareId} updated to ${lbStatus}.`, "info");
      break;
    default:
      addLog(`[CMD:${commandId}] Unknown command received.`, "warning");
      break;
  }
}

/**
 * Sends a formatted command via the serial port.
 */
export async function sendFormattedCommand(
  command: Uint8Array,
  handleAddLog: (
    message: string,
    type: "error" | "success" | "info" | "warning"
  ) => void
): Promise<boolean> {
  try {
    const array = Array.from(command);

    handleAddLog(`Attempting to send Command: [${array.join(", ")}]`, "info");
    await invoke("send_serial", { input: array });

    handleAddLog(`Command successfully sent: [${array.join(", ")}]`, "success");

    return true;
  } catch (error) {
    const array = Array.from(command);
    console.error(`Failed to send command: [${array.join(", ")}]`, error);
    handleAddLog(
      `Failed to send Command: [${array.join(", ")}]. Error: ${error}`,
      "error"
    );
    return false;
  }
}
