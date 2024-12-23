// src/utils/handlers.ts

import { toast } from "@/components/Toast";
import { formatCommand, handleMotorCommand, sendFormattedCommand, handleLEDUpdate } from "@/utils/commands";

import * as XLSX from "xlsx"; // For exporting Excel
import { LED, Motor } from "@/lib/types";
import { addLog, utilAddLog } from "@/lib/utils";
import { useCallback } from "react";
import saveAs from "file-saver";
import jsPDF from "jspdf";
import logo from '/app-icon.png';

interface MotorTempValues {
  [id: number]: { speed: number; direction: string };
}

const revertTimeouts: { current: { [key: number]: NodeJS.Timeout } } = { current: {} };
const tempMotorValues: MotorTempValues = {};

/**
 * Updates the status and intensity of an LED in the UI.
 */
export function updateLEDStatus(id: number, status: "ON" | "OFF", intensity?: number) {
  // Logic to update the LED state in the UI
  toast.info(`LED ${id} updated to ${status}${intensity ? ` with intensity ${intensity}%` : ""}.`);
}

/**
 * Toggles the status of an LED (ON/OFF).
 */
/**
 * Toggles the LED state (ON/OFF) without changing the intensity.
 */
export async function handleLEDToggleHandler(
  id: number,
  leds: LED[],
  updateLEDStatus: (id: number, status: "ON" | "OFF", intensity: number) => void,
  handleAddLog: (message: string, type?: "error" | "success" | "info" | "warning") => void
): Promise<void> {
  const led = leds.find((l) => l.id === id);
  if (!led) return;

  const newStatus: "ON" | "OFF" = led.status === "ON" ? "OFF" : "ON";

  try {
    handleAddLog(`Changing state of LED ${id} to ${newStatus}...`, "info");
    const commandId = 7; // Command to change LED state.
    const value = newStatus === "ON" ? 1 : 0;
    const payload = formatCommand(commandId, id, value);
    const success = await sendFormattedCommand(payload, handleAddLog);

    if (success) {
      updateLEDStatus(id, newStatus, led.intensity); // Update only the state, keeping the intensity.
      handleAddLog(`LED ${id} changed to ${newStatus}.`, "success");
    } else {
      handleAddLog(`Failed to change state of LED ${id}.`, "error");
    }
  } catch (error) {
    console.error(`Error changing state of LED ${id}:`, error);
    handleAddLog(`Error changing state of LED ${id}.`, "error");
  }
}

/**
 * Adjusts the intensity of a specific LED.
 */
/**
 * Adjusts the intensity of a specific LED without changing its current state.
 */
export async function handleLEDSetIntensityHandler(
  id: number,
  intensity: number,
  leds: LED[],
  updateLEDStatus: (id: number, status: "ON" | "OFF", intensity: number) => void,
  handleAddLog: (message: string, type?: "error" | "success" | "info" | "warning") => void
): Promise<void> {
  const led = leds.find((l) => l.id === id);
  if (!led) return;

  try {
    handleAddLog(`Changing intensity of LED ${id} to ${intensity}%...`, "info");
    const commandId = 8; // Command to change LED intensity.
    const payload = formatCommand(commandId, id, intensity);
    const success = await sendFormattedCommand(payload, handleAddLog);

    if (success) {
      updateLEDStatus(id, led.status, intensity); // Update only the intensity, keeping the current state.
      handleAddLog(`Intensity of LED ${id} set to ${intensity}%.`, "success");
    } else {
      handleAddLog(`Failed to adjust intensity of LED ${id}.`, "error");
    }
  } catch (error) {
    console.error(`Error adjusting intensity of LED ${id}:`, error);
    handleAddLog(`Error adjusting intensity of LED ${id}.`, "error");
  }
}


/**
 * Adjusts the intensity of a specific LED.
 */
/**
 * Adjusts the intensity of a specific LED without changing its current state.
 */
export async function handleMotorSetSpeedHandler(
  id: number,
  speed: number,
  motors: Motor[],
  updateMotorStatus: (id: number, status: "ON" | "OFF", speed: number, direction: "CW" | "CCW") => void,
  handleAddLog: (message: string, type?: "error" | "success" | "info" | "warning") => void
): Promise<void> {
  const motor = motors.find((m) => m.id === id);
  if (!motor) {
    handleAddLog(`Motor with ID ${id} not found.`, "error");
    return;
  }

  try {
    handleAddLog(`Changing speed of Motor ${id} to ${speed} Hz...`, "info");

    const commandId = 8; // Command to change Motor speed
    const payload = formatCommand(commandId, id, speed);
    const success = await sendFormattedCommand(payload, handleAddLog);

    if (success) {
      updateMotorStatus(id, motor.status, speed, motor.direction); // Use the current direction of the motor
      handleAddLog(`Speed of Motor ${id} set to ${speed} Hz.`, "success");
    } else {
      handleAddLog(`Failed to adjust speed of Motor ${id}.`, "error");
    }
  } catch (error) {
    console.error(`Error adjusting speed of Motor ${id}:`, error);
    handleAddLog(`Error adjusting speed of Motor ${id}.`, "error");
  }
}


/**
 * Toggles the status of a LED (ON/OFF).
 */
export async function handleLEDToggle(
  id: number,
  leds: LED[],
  updateLEDStatus: (id: number, status: "ON" | "OFF", intensity?: number) => void,
  handleAddLog: (message: string, type?: "error" | "success" | "info" | "warning") => void
) {
  const led = leds.find((l) => l.id === id);
  if (!led) return;

  const newStatus: "ON" | "OFF" = led.status === "ON" ? "OFF" : "ON";
  const newIntensity: number = newStatus === "ON" ? 100 : 0;

  handleAddLog(`Preparing to toggle LED ${id} to ${newStatus} with intensity ${newIntensity}%...`, "info");

  const success = await handleLEDUpdate(id, newStatus, newIntensity, handleAddLog);
  if (success) {
    updateLEDStatus(id, newStatus, newIntensity);
    handleAddLog(`LED ${id} turned ${newStatus === "ON" ? "on" : "off"} with intensity ${newIntensity}%.`, "success");
  } else {
    handleAddLog(`Failed to turn ${newStatus === "ON" ? "on" : "off"} LED ${id}.`, "error");
  }
}

/**
 * Updates the LED to a specific status and intensity.
 */
export async function updateLED(
  id: number,
  status: "ON" | "OFF",
  intensity: number,
  handleAddLog: (message: string, type?: "error" | "success" | "info" | "warning") => void
) {
  handleAddLog(`Updating LED ${id} to ${status} with intensity ${intensity}%.`, "info");

  const success = await handleLEDUpdate(id, status, intensity, handleAddLog);
  if (success) {
    updateLEDStatus(id, status, intensity);
    handleAddLog(`LED ${id} updated to ${status} with intensity ${intensity}%.`, "success");
    toast.success(`LED ${id} updated to ${status} with intensity ${intensity}%.`);
  } else {
    handleAddLog(`Failed to update LED ${id} to ${status} with intensity ${intensity}%.`, "error");
    toast.error(`Failed to update LED ${id} to ${status} with intensity ${intensity}%.`);
  }

  return success;
}

/**
 * Adjusts the intensity of a specific LED.
 */
export async function handleLEDIntensityChange(
  id: number,
  value: number,
  leds: LED[],
  updateLEDStatus: (id: number, status: "ON" | "OFF", intensity?: number) => void,
  handleAddLog: (message: string, type?: "error" | "success" | "info" | "warning") => void
) {
  const led = leds.find((l) => l.id === id);
  if (!led) return;

  if (value === 0) {
    // If intensity is 0, turn off the LED
    await handleLEDToggle(id, leds, updateLEDStatus, handleAddLog);
    return;
  }

  const newStatus: "ON" | "OFF" = "ON"; // Retain current status

  handleAddLog(`Changing intensity of LED ${id} to ${value}%.`, "info");

  const success = await handleLEDUpdate(id, newStatus, value, handleAddLog);
  if (success) {
    updateLEDStatus(id, newStatus, value);
    handleAddLog(`LED ${id} intensity adjusted to ${value}%.`, "success");
    toast.success(`LED ${id} intensity adjusted to ${value}%.`);
  } else {
    handleAddLog(`Failed to adjust intensity of LED ${id}.`, "error");
    toast.error(`Failed to adjust intensity of LED ${id}.`);
  }
}

/**
 * Updates the status, speed, and direction of a motor in the UI.
 */
export function updateMotorStatus(
  id: number,
  status: "ON" | "OFF",
  speed?: number,
  direction?: "CW" | "CCW"
) {
  toast.info(
    `Motor ${id} updated to ${status}${speed ? ` with speed ${speed} Hz` : ""}${
      direction ? ` and direction ${direction}` : ""
    }.`
  );
}

/**
 * Toggles the status of a motor (ON/OFF).
 */
export async function handleMotorToggle(id: number, motors: Motor[], handleAddLog: any) {
  const motor = motors.find((m: any) => m.id === id);
  if (!motor) return;

  const newStatus = motor.status === "ON" ? "OFF" : "ON";
  const newSpeed = newStatus === "ON" ? motor.speed || 1000 : 0;

  const success = await handleMotorCommand(id, newStatus, newSpeed, motor.direction, handleAddLog);
  if (success) {
    updateMotorStatus(id, newStatus, newSpeed, motor.direction);
    toast.success(`Motor ${id} turned ${newStatus === "ON" ? "on" : "off"}.`);
  } else {
    toast.error(`Failed to turn ${newStatus === "ON" ? "on" : "off"} Motor ${id}.`);
  }
}

/**
 * Adjusts the speed of a motor.
 */
export async function handleMotorSpeedChange(id: number, value: number, motors: any[]) {
  tempMotorValues[id] = { speed: value, direction: motors.find((m: any) => m.id === id)?.direction || "CW" };

  if (revertTimeouts.current[id]) clearTimeout(revertTimeouts.current[id]);

  revertTimeouts.current[id] = setTimeout(() => {
    // Logic to revert the motor speed, if necessary
    toast.info(`Motor ${id} speed reverted.`);
  }, 3000);
}

/**
 * Updates the status of a light barrier in the UI.
 */
export function updateLightBarrierStatus(id: number, status: "ACTIVE" | "INACTIVE") {
  toast.info(`Light Barrier ${id} status: ${status}`);
}

/**
 * Sends the command to activate production mode.
 */
export async function sendProductionMode(handleAddLog: (message: string, type?: "error" | "success" | "info" | "warning") => void): Promise<void> {
  try {
    const command = formatCommand(0x02, 0x00, 1); // Production mode command
    const success = await sendFormattedCommand(command, handleAddLog);

    if (success) {
      handleAddLog("Production mode activated.", "success");
      toast.success("Production mode activated.");
    } else {
      handleAddLog("Failed to activate production mode.", "error");
      toast.error("Failed to activate production mode.");
    }
  } catch (error) {
    handleAddLog(`Error activating production mode: ${error}`, "error");
    toast.error(`Error activating production mode: ${error}`);
  }
}

/**
 * Sends the command to reset the device.
 */
export async function sendReset(handleAddLog: (message: string, type?: "error" | "success" | "info" | "warning") => void): Promise<void> {
  try {
    const command = formatCommand(0x01, 0x00, 0); // Reset command
    const success = await sendFormattedCommand(command, handleAddLog);

    if (success) {
      handleAddLog("Reset command sent.", "success");
      toast.success("Reset command sent.");
    } else {
      handleAddLog("Failed to send reset command.", "error");
      toast.error("Failed to send reset command.");
    }
  } catch (error) {
    handleAddLog(`Error sending reset command: ${error}`, "error");
    toast.error(`Error sending reset command: ${error}`);
  }
}



/**
 * Sends binary commands for Reset, Production, and Record.
 * - Reset (Command ID=0x01): Turns off all buttons.
 * - Production (Command ID=0x02): Activates/deactivates production mode.
 * - Record (Command ID=0x04): Activates/deactivates recording.
 */
export async function handleSpecialCommand(
  mode: "reset" | "production" | "record",
  handleAddLog: (message: string, type?: "error" | "success" | "info" | "warning") => void
): Promise<boolean> {
  let commandId: number;
  let hardwareId = 0x00; // Usually 0 for global commands
  let value: number;

  switch (mode) {
    case "reset":
      commandId = 0x01;
      value = 0; // Default value for Reset
      break;
    case "production":
      commandId = 0x02;
      value = 1; // Activate production (1 to turn on)
      break;
    case "record":
      commandId = 0x04;
      value = 1; // Activate recording (adjustable as needed)
      break;
    default:
      handleAddLog("Invalid Mode specified.", "error");
      toast.error("Invalid Mode specified.");
      return false;
  }

  // Format the command
  const command = formatCommand(commandId, hardwareId, value);

  // Send the command
  const success = await sendFormattedCommand(command, handleAddLog);

  if (success) {
    handleAddLog(`${mode.toUpperCase()} command sent successfully.`, "success");
    toast.success(`${mode.toUpperCase()} command sent successfully.`);
  } else {
    handleAddLog(`Failed to send ${mode.toUpperCase()} command.`, "error");
    toast.error(`Failed to send ${mode.toUpperCase()} command.`);
  }

  return success;
}



/**
 * Toggles the status of an LED (ON/OFF).
 */
/**
 * Toggles the LED state (ON/OFF) without changing the intensity.
 */
export async function handleMotorToggleHandler(
  id: number,
  motors: Motor[],
  updateMotorStatus: (id: number, status: "ON" | "OFF", speed: number, direction: "CW" | "CCW") => void,
  handleAddLog: (message: string, type?: "error" | "success" | "info" | "warning") => void
): Promise<void> {
  const motor = motors.find((m) => m.id === id);
  if (!motor) return;

  const newStatus: "ON" | "OFF" = motor.status === "ON" ? "OFF" : "ON";

  try {
    handleAddLog(`Changing state of Motor ${id} to ${newStatus}...`, "info");
    const commandId = 10; // Command ID for toggling motor state
    const value = newStatus === "ON" ? 1 : 0;
    const payload = formatCommand(commandId, id, value);
    const success = await sendFormattedCommand(payload, handleAddLog);

    if (success) {
      updateMotorStatus(id, newStatus, motor.speed, motor.direction); // Update only the state, keeping the speed and direction the same.
      handleAddLog(`Motor ${id} changed to ${newStatus}.`, "success");
    } else {
      handleAddLog(`Failed to change state of Motor ${id}.`, "error");
    }
  } catch (error) {
    console.error(`Error changing state of Motor ${id}:`, error);
    handleAddLog(`Error changing state of Motor ${id}.`, "error");
  }
}




/**
 * Toggles the state of the motor (ON/OFF).
 */
/**
 * Toggles the state of a motor (ON/OFF).
 */
export async function handleMotorToggleHandlerrrr(
  id: number,
  motors: Motor[],
  updateMotorStatus: (id: number, status: "ON" | "OFF", speed: number, direction: "CW" | "CCW") => void,
  handleAddLog: (message: string, type?: "error" | "success" | "info" | "warning") => void
): Promise<void> {
  const motor = motors.find((m) => m.id === id);
  if (!motor) {
    handleAddLog(`Motor with ID ${id} not found.`, "error");
    return;
  }

  const newStatus: "ON" | "OFF" = motor.status === "ON" ? "OFF" : "ON";

  try {
    handleAddLog(`Sending command to change Motor ${id} to ${newStatus}...`, "info");

    const commandId = 10; // Command ID for toggling motor state
    const commandValue = newStatus === "ON" ? 1 : 0;
    const payload = formatCommand(commandId, id, commandValue);

    const success = await sendFormattedCommand(payload, handleAddLog);

    if (success) {
      updateMotorStatus(id, newStatus, motor.speed, motor.direction); // Update only state, preserve other properties
      handleAddLog(`Motor ${id} successfully changed to ${newStatus}.`, "success");
    } else {
      handleAddLog(`Failed to change state of Motor ${id}.`, "error");
    }
  } catch (error) {
    console.error(`Error toggling Motor ${id}:`, error);
    handleAddLog(`Error toggling Motor ${id}.`, "error");
  }
}


/**
 * Adjusts the speed of the motor.
 */
export async function handleMotorSpeedChangeHandler(
  id: number,
  speed: number,
  motors: Motor[],
  updateMotorStatus: (id: number, status: "ON" | "OFF", speed: number, direction: "CW" | "CCW") => void,
  handleAddLog: (message: string, type?: "error" | "success" | "info" | "warning") => void
): Promise<void> {
  const motor = motors.find((m) => m.id === id);
  if (!motor) return;

  try {
    handleAddLog(`Changing speed of motor ${id} to ${speed} Hz...`, "info");
    const commandId = 11; // Command to change motor speed
    const payload = formatCommand(commandId, id, speed);

    const success = await sendFormattedCommand(payload, handleAddLog);

    if (success) {
      updateMotorStatus(id, motor.status, speed, motor.direction); // Keeps state and direction
      handleAddLog(`Speed of motor ${id} adjusted to ${speed} Hz.`, "success");
    } else {
      handleAddLog(`Failed to adjust speed of motor ${id}.`, "error");
    }
  } catch (error) {
    console.error(`Error adjusting speed of motor ${id}:`, error);
    handleAddLog(`Error adjusting speed of motor ${id}.`, "error");
  }
}


/**
 * Toggles the direction of the motor (CW/CCW).
 */
export async function handleMotorDirectionToggleHandler(
  id: number,
  motors: Motor[],
  updateMotorStatus: (id: number, status: "ON" | "OFF", speed: number, direction: "CW" | "CCW") => void,
  handleAddLog: (message: string, type?: "error" | "success" | "info" | "warning") => void
): Promise<void> {
  const motor = motors.find((m) => m.id === id);
  if (!motor) return;

  const newDirection: "CW" | "CCW" = motor.direction === "CW" ? "CCW" : "CW";

  try {
    handleAddLog(`Changing direction of motor ${id} to ${newDirection}...`, "info");
    const commandId = 12; // Command to change motor direction
    const value = newDirection === "CW" ? 1 : 0;
    const payload = formatCommand(commandId, id, value);

    const success = await sendFormattedCommand(payload, handleAddLog);

    if (success) {
      updateMotorStatus(id, motor.status, motor.speed, newDirection); // Keeps state and speed
      handleAddLog(`Direction of motor ${id} changed to ${newDirection}.`, "success");
    } else {
      handleAddLog(`Failed to change direction of motor ${id}.`, "error");
    }
  } catch (error) {
    console.error(`Error changing direction of motor ${id}:`, error);
    handleAddLog(`Error changing direction of motor ${id}.`, "error");
  }
}


/**
 * Adjusts the speed of a specific motor without changing its current state or direction.
 */
export async function handleMotorSetSpeedHandlerrrr(
  id: number,
  speed: number,
  motors: Motor[],
  updateMotorStatus: (
    id: number,
    status: "ON" | "OFF",
    speed: number,
    direction: "CW" | "CCW"
  ) => void,
  handleAddLog: (message: string, type?: "error" | "success" | "info" | "warning") => void
): Promise<void> {
  const motor = motors.find((m) => m.id === id);
  if (!motor) {
    handleAddLog(`Motor with ID ${id} not found.`, "error");
    return;
  }

  try {
    handleAddLog(`Changing speed of Motor ${id} to ${speed} Hz...`, "info");

    const commandId = 11; // Command to change motor speed
    const payload = formatCommand(commandId, id, speed);
    const success = await sendFormattedCommand(payload, handleAddLog);

    if (success) {
      updateMotorStatus(id, motor.status, speed, motor.direction); // Update speed, keeping the current state and direction.
      handleAddLog(`Speed of Motor ${id} set to ${speed} Hz.`, "success");
    } else {
      handleAddLog(`Failed to adjust speed of Motor ${id}.`, "error");
    }
  } catch (error) {
    console.error(`Error adjusting speed of Motor ${id}:`, error);
    handleAddLog(`Error adjusting speed of Motor ${id}.`, "error");
  }
}

export async function handleMotorSetDirectionHandler(
  id: number,
  direction: "CW" | "CCW",
  motors: Motor[],
  updateMotorStatus: (
    id: number,
    status: "ON" | "OFF",
    speed: number,
    direction: "CW" | "CCW"
  ) => void,
  handleAddLog: (message: string, type?: "error" | "success" | "info" | "warning") => void
): Promise<void> {
  const motor = motors.find((m) => m.id === id);
  if (!motor) {
    handleAddLog(`Motor with ID ${id} not found.`, "error");
    return;
  }

  try {
    handleAddLog(`Changing direction of Motor ${id} to ${direction}...`, "info");

    const commandId = 12; // Command to change motor direction
    const payload = formatCommand(commandId, id, direction === "CW" ? 1 : 0);

    if (!payload) {
      handleAddLog(`Invalid payload for Motor ${id} direction change.`, "error");
      return;
    }

    const success = await sendFormattedCommand(payload, handleAddLog);

    if (success) {
      updateMotorStatus(id, motor.status, motor.speed, direction);
      handleAddLog(`Direction of Motor ${id} set to ${direction}.`, "success");
    } else {
      handleAddLog(`Failed to change direction of Motor ${id}.`, "error");
    }
  } catch (error) {
    console.error(`Error changing direction of Motor ${id} (current state: ${JSON.stringify(motor)}):`, error);
    handleAddLog(`Error changing direction of Motor ${id}.`, "error");
  }
}


export async function handleMotorUpdateHandler(
  id: number,
  speed: number,
  direction: "CW" | "CCW",
  motors: Motor[],
  updateMotorStatus: (
    id: number,
    status: "ON" | "OFF",
    speed: number,
    direction: "CW" | "CCW"
  ) => void,
  handleAddLog: (message: string, type?: "error" | "success" | "info" | "warning") => void
): Promise<void> {
  const motor = motors.find((m) => m.id === id);
  if (!motor) {
    handleAddLog(`Motor with ID ${id} not found.`, "error");
    return;
  }

  try {
    handleAddLog(
      `Updating Motor ${id} with speed ${speed} Hz and direction ${direction}...`,
      "info"
    );

    const commandId = 15; // Comando consolidado
    const directionValue = direction === "CW" ? 1 : 0;
    const combinedValue = (directionValue << 16) | speed; // Combinar direção e velocidade
    const payload = formatCommand(commandId, id, combinedValue);

    const success = await sendFormattedCommand(payload, handleAddLog);

    if (success) {
      updateMotorStatus(id, motor.status, speed, direction);
      handleAddLog(
        `Motor ${id} updated successfully to speed ${speed} Hz and direction ${direction}.`,
        "success"
      );
    } else {
      handleAddLog(`Failed to update Motor ${id}.`, "error");
    }
  } catch (error) {
    console.error(`Error updating Motor ${id}:`, error);
    handleAddLog(`Error updating Motor ${id}.`, "error");
  }
}
