// src/pages/index.tsx
"use client";

import { toast } from "@/components/Toast";
import { handleLEDCommand, handleMotorCommand } from "@/utils/commands";

interface MotorTempValues {
  [id: number]: { speed: number; direction: string };
}

const revertTimeouts: { current: { [key: number]: NodeJS.Timeout } } = { current: {} };
const tempMotorValues: MotorTempValues = {};

/**
 * Toggles the status of a specific LED (ON/OFF).
 * @param id - The ID of the LED.
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

// Outras funções seguem o mesmo padrão
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

// Continue com as demais funções, exportando-as...
