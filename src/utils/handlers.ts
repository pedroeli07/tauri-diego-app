// src/utils/handlers.ts


import {  toast } from "@/components/Toast";
import {handleProductionMode,handleReset,} from "@/utils/serial";
import { handleLEDCommand, handleMotorCommand } from "@/utils/commands";


interface MotorTempValues {
  [id: number]: { speed: number; direction: string };
}

const revertTimeouts: { current: { [key: number]: NodeJS.Timeout } } = { current: {} };
const tempMotorValues: MotorTempValues = {};

/**
 * Updates the status and intensity of a specific LED.
 * @param id - The ID of the LED.
 * @param status - The new status ("ON" | "OFF").
 * @param intensity - The new intensity value (optional).
 */
export function updateLEDStatus(id: number, status: "ON" | "OFF", intensity?: number) {
  // Implement logic to update the LED's status in the application state
  toast.info(`LED ${id} updated to ${status}${intensity ? ` with intensity ${intensity}%` : ""}.`);
}

/**
 * Toggles the status of a specific LED (ON/OFF).
 * @param id - The ID of the LED.
 * @param leds - Current list of LEDs.
 */
export async function handleLEDToggle(id: number, leds: any[]) {
  const led = leds.find((l) => l.id === id);
  if (!led) return;

  const newStatus = led.status === "ON" ? "OFF" : "ON";
  const newIntensity = newStatus === "ON" ? 100 : 0;

  const success = await handleLEDCommand(id, newStatus, newIntensity);
  if (success) {
    updateLEDStatus(id, newStatus, newIntensity);
    toast.success(`LED ${id} turned ${newStatus === "ON" ? "on" : "off"}.`);
  } else {
    toast.error(`Failed to turn ${newStatus === "ON" ? "on" : "off"} LED ${id}.`);
  }
}

/**
 * Changes the intensity of a specific LED.
 * @param id - The ID of the LED.
 * @param value - The new intensity value.
 * @param leds - Current list of LEDs.
 */
export async function handleLEDIntensityChange(id: number, value: number, leds: any[]) {
  const led = leds.find((l) => l.id === id);
  if (!led) return;

  if (value === 0) {
    handleLEDToggle(id, leds);
    return;
  }

  const newStatus = "ON";
  const success = await handleLEDCommand(id, newStatus, value);

  if (success) {
    updateLEDStatus(id, newStatus, value);
    toast.success(`LED ${id} intensity adjusted to ${value}%.`);
  } else {
    toast.error(`Failed to adjust intensity of LED ${id}.`);
  }
}

/**
 * Updates the status, speed, and direction of a specific Motor.
 * @param id - The ID of the Motor.
 * @param status - The new status ("ON" | "OFF").
 * @param speed - The new speed value (optional).
 * @param direction - The new direction ("CW" | "CCW") (optional).
 */
export function updateMotorStatus(
  id: number,
  status: "ON" | "OFF",
  speed?: number,
  direction?: "CW" | "CCW"
) {
  // Implement logic to update the motor's status in the application state
  toast.info(
    `Motor ${id} updated to ${status}${speed ? ` with speed ${speed} Hz` : ""}${
      direction ? ` and direction ${direction}` : ""
    }.`
  );
}

/**
 * Toggles the status of a specific Motor (ON/OFF).
 * @param id - The ID of the Motor.
 * @param motors - Current list of Motors.
 */
export async function handleMotorToggle(id: number, motors: any[]) {
  const motor = motors.find((m) => m.id === id);
  if (!motor) return;

  const newStatus = motor.status === "ON" ? "OFF" : "ON";
  const newSpeed = newStatus === "ON" ? motor.speed || 1000 : 0;

  const success = await handleMotorCommand(id, newStatus, newSpeed, motor.direction);
  if (success) {
    updateMotorStatus(id, newStatus, newSpeed, motor.direction);
    toast.success(`Motor ${id} turned ${newStatus === "ON" ? "on" : "off"}.`);
  } else {
    toast.error(`Failed to turn ${newStatus === "ON" ? "on" : "off"} Motor ${id}.`);
  }
}

/**
 * Changes the speed of a specific Motor.
 * @param id - The ID of the Motor.
 * @param value - The new speed value.
 */
export async function handleMotorSpeedChange(id: number, value: number, motors: any[]) {
  tempMotorValues[id] = { speed: value, direction: motors.find((m) => m.id === id)?.direction || "CW" };

  if (revertTimeouts.current[id]) clearTimeout(revertTimeouts.current[id]);

  revertTimeouts.current[id] = setTimeout(() => {
    // Logic to revert motor speed
    toast.info(`Motor ${id} speed reverted.`);
  }, 3000);
}

/**
 * Updates the status of a specific Light Barrier.
 * @param id - The ID of the Light Barrier.
 * @param status - The new status ("OK" | "ERROR").
 */
export function updateLightBarrierStatus(id: number, status: "OK" | "ERROR") {
  // Implement logic to update the light barrier's status in the application state
  toast.info(`Light Barrier ${id} status: ${status}`);
}

/**
 * Activates production mode by sending the appropriate command.
 */
export async function sendProductionMode() {
  try {
    await handleProductionMode();
    toast.success("Production mode activated.");
  } catch (error) {
    toast.error("Failed to activate production mode.");
  }
}

/**
 * Sends a reset command to the device.
 */
export async function sendReset() {
  try {
    await handleReset();
    toast.success("Reset command sent.");
  } catch (error) {
    toast.error("Failed to send reset command.");
  }
}

