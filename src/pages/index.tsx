// src/pages/index.tsx
"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { ToastProvider, toast } from "@/components/Toast";
import {
  handleGetPorts,
  getBaudList,
  handleConnect,
  handleProductionMode,
  handleReset,
  setupSerialListeners,
  handleDisconnect
} from "@/utils/serial";
import { handleLEDCommand, handleMotorCommand } from "@/utils/commands";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Plug2,
  Power,
  RotateCcw,
  RouteOff,
  Settings,
  Video,
  Copy,
  Trash2,
  Download,
  X,
  RefreshCcw,
  RefreshCw,
  Minus,
  Maximize,
  PowerOff,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import CustomTooltip from "@/components/CustomTooltip";
import {
  LED,
  Motor,
  LightBarrier,
  Log,
  Status,
} from "@/lib/types";
import {
  getLogColor,
  copyLogs,
  initialMotors,
  initialLightBarriers,
  utilAddLog,
  utilDeleteLog,
  initialLeds,
  deleteLog,
  clearLogs,
} from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { invoke } from "@tauri-apps/api/tauri";
import { Input } from "@/components/ui/input";
import CustomSlider from "@/components/ui/custom-slider";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import clsx from "clsx"; // Utility for conditional classNames
import MotorIcon from "@/components/MotorIcon";
import LightBarrierIcon from "@/components/LightBarrierIcon";
import Image from "next/image";
import * as XLSX from "xlsx"; // For Excel export
import LEDIcon from "@/components/LEDIcon";
import { useAppWindow, closeApp, minimizeApp, maximizeApp, handleSend } from "@/utils/window";
import DebugBox from '@/components/DebugBox';

// Interface defining the structure of Light Barriers
export interface LightBarriers {
  id: number;
  status: Status; // Replace string literals with the Status enum
  lastChanged: string;
}

/**
 * HomePageProps Interface
 * Defines the props for the Home component.
 */
interface HomePageProps {}

/**
 * Home Component
 * Consolidates all functionalities and UI components.
 */
const Home: React.FC<HomePageProps> = () => {
  // Temporary States for storing temporary values before updating
  const [tempMotorValues, setTempMotorValues] = useState<Record<number, { speed: number; direction: string }>>({});
  const [tempLEDValues, setTempLEDValues] = useState<Record<number, number>>({});
  const revertTimeouts = useRef<Record<number, NodeJS.Timeout>>({});

  // Serial Connection States
  const [baud, setBaud] = useState<string>("9600"); // Current baud rate
  const [port, setPort] = useState<string>("None"); // Currently selected serial port
  const [portList, setPortList] = useState<string[]>(["None"]); // List of available serial ports
  const [isUpdatingPorts, setIsUpdatingPorts] = useState<boolean>(false); // Indicates if ports are being updated
  const [isConnected, setIsConnected] = useState<boolean>(false); // Connection status

  // Device States
  const [logs, setLogs] = useState<Log[]>([]); // Array of log entries
  const [motors, setMotors] = useState<Motor[]>(initialMotors); // Array of motors
  const [lightBarriers, setLightBarriers] = useState<LightBarriers[]>(initialLightBarriers); // Array of light barriers
  const [leds, setLeds] = useState<LED[]>(initialLeds); // Array of LEDs
  const [tempIntensity, setTempIntensity] = useState<number>(leds[0].intensity); // Temporary intensity value for LEDs

  // Recording State
  const [isRecording, setIsRecording] = useState<boolean>(false); // Indicates if recording is active

  // Export Modal State
  const [isExportModalOpen, setIsExportModalOpen] = useState<boolean>(false); // Controls the export modal visibility

  // Reference for external modules (e.g., jsPDF, file-saver)
  const exportRef = useRef<{ jsPDF?: any; saveAs?: any }>({});



  // Reference to the application window for window controls
  const appWindow = useAppWindow();

  /**
   * Toggles the recording state between active and inactive.
   */
  const toggleRecording = () => setIsRecording((prev) => !prev);



  /**
   * Efficiently adds a log entry.
   * @param message - The log message.
   * @param type - The type of log (error, success, info, warning).
   */
  const handleAddLog = useCallback(
    (
      message: string,
      type: "error" | "success" | "info" | "warning" = "info",
      color?: string
    
    ) => {
      setLogs((prevLogs) => utilAddLog(prevLogs, message, type));
    },
    []
  );


  /**
   * Fetches the available serial ports and updates the state.
   */
  const fetchPorts = async () => {
    setIsUpdatingPorts(true);
    handleAddLog("Starting port update...", "info");

    try {
      await handleGetPorts(setPortList); // Fetch available ports
      handleAddLog("Ports updated successfully.", "success");
    } catch (error) {
      handleAddLog(`Error updating ports: ${error}`, "error");
    } finally {
      setIsUpdatingPorts(false);
    }
  };

  /**
   * Toggles the serial connection between connected and disconnected states.
   */
  const toggleConnection = async () => {
    handleAddLog(`Attempting to ${isConnected ? "disconnect" : "connect"}...`, "info");

    if (!isConnected) {
      // Connect to serial port
      try {
        const connected = await handleConnect(port, baud, "\n", setIsConnected);
        if (connected) {
          handleAddLog(`Connected to port ${port} at ${baud} baud.`, "success");
        } else {
          handleAddLog(`Failed to connect to port ${port}.`, "error");
        }
      } catch (error) {
        handleAddLog(`Error connecting: ${error}`, "error");
      }
    } else {
      // Disconnect from serial port
      try {
        const disconnected = await handleDisconnect(setIsConnected);
        if (disconnected) {
          handleAddLog(`Disconnected from port ${port}.`, "success");
        } else {
          handleAddLog("No active connection to disconnect.", "warning");
        }
      } catch (error) {
        handleAddLog(`Error disconnecting: ${error}`, "error");
      }
    }
  };

  /**
   * Activates production mode by sending the appropriate command.
   */
  const sendProductionMode = async () => {
    try {
      await handleProductionMode(); // Activate production mode
      handleAddLog("Production mode activated.", "success");
      toast.success("Production mode activated.");
    } catch (error) {
      handleAddLog(`Error activating production mode: ${error}`, "error");
      toast.error("Failed to activate production mode.");
    }
  };

  /**
   * Sends a reset command to the device.
   */
  const sendReset = async () => {
    try {
      await handleReset(); // Send reset command
      handleAddLog("Reset command sent.", "success");
      toast.success("Reset command sent.");
    } catch (error) {
      handleAddLog(`Error sending reset command: ${error}`, "error");
      toast.error("Failed to send reset command.");
    }
  };

  /**
   * Exports logs in the specified format (CSV, PDF, Excel).
   * @param format - The format to export logs ("csv" | "pdf" | "excel").
   */
  const handleExportLogs = async (format: "csv" | "pdf" | "excel") => {
    let jsPDF: any, saveAs: any;

    // Dynamically import jsPDF and file-saver for exporting
    const modules = await Promise.all([
      import("jspdf"),
      import("file-saver"),
    ]);

    jsPDF = modules[0].default;
    saveAs = modules[1].default;

    // Combine all log messages into a single string
    const allLogs = logs.map((log) => log.message).join("\n");

    if (format === "csv") {
      // Create a CSV blob and trigger download
      const blob = new Blob([allLogs], { type: "text/csv;charset=utf-8;" });
      saveAs(blob, "logs.csv");
    } else if (format === "pdf") {
      // Create a PDF document and trigger download
      const doc = new jsPDF();
      doc.text(allLogs, 10, 10);
      doc.save("logs.pdf");
    } else if (format === "excel") {
      // Create an Excel workbook and trigger download
      const worksheet = XLSX.utils.aoa_to_sheet(logs.map((log) => [log.message]));
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Logs");
      const wbout = XLSX.write(workbook, { type: "array", bookType: "xlsx" });
      const blob = new Blob([wbout], { type: "application/octet-stream" });
      saveAs(blob, "logs.xlsx");
    }
  };

  /**
   * Updates the status and intensity of a specific LED.
   * @param id - The ID of the LED.
   * @param status - The new status ("ON" | "OFF").
   * @param intensity - The new intensity value (optional).
   */
  const updateLEDStatus = (id: number, status: "ON" | "OFF", intensity?: number) => {
    setLeds((prevLeds) =>
      prevLeds.map((led) =>
        led.id === id
          ? {
              ...led,
              status,
              intensity: intensity !== undefined ? intensity : led.intensity,
              lastChanged: new Date().toLocaleTimeString(),
            }
          : led
      )
    );
    handleAddLog(
      `LED ${id} updated to ${status}${intensity !== undefined ? ` with intensity ${intensity}%` : ""}`,
      "info"
    );
  };

  /**
   * Updates the status, speed, and direction of a specific Motor.
   * @param id - The ID of the Motor.
   * @param status - The new status ("ON" | "OFF").
   * @param speed - The new speed value (optional).
   * @param direction - The new direction ("CW" | "CCW") (optional).
   */
  const updateMotorStatus = (
    id: number,
    status: "ON" | "OFF",
    speed?: number,
    direction?: "CW" | "CCW"
  ) => {
    setMotors((prevMotors) =>
      prevMotors.map((motor) =>
        motor.id === id
          ? {
              ...motor,
              status,
              speed: speed !== undefined ? speed : motor.speed,
              direction: direction !== undefined ? direction : motor.direction,
              lastChanged: new Date().toLocaleTimeString(),
            }
          : motor
      )
    );
    handleAddLog(
      `Motor ${id} updated to ${status}${speed !== undefined ? ` with speed ${speed} Hz` : ""}${
        direction !== undefined ? ` and direction ${direction}` : ""
      }`,
      "info"
    );
  };

  /**
   * Updates the status of a specific Light Barrier.
   * @param id - The ID of the Light Barrier.
   * @param status - The new status ("OK" | "ERROR").
   */
  const updateLightBarrierStatus = (id: number, status: "OK" | "ERROR") => {
    setLightBarriers((prevLightBarriers) =>
      prevLightBarriers.map((lb) =>
        lb.id === id
          ? {
              ...lb,
              status: status as Status, // Explicitly cast to the Status enum
              lastChanged: new Date().toLocaleTimeString(),
            }
          : lb
      )
    );
    handleAddLog(`Light Barrier ${id} status: ${status}`, "info");
  };

  /**
   * Sets up listeners for serial events to handle updates from the backend.
   */
  useEffect(() => {
    setupSerialListeners(
      updateLEDStatus,
      updateMotorStatus,
      updateLightBarrierStatus,
      (msg, type) => handleAddLog(msg, type)
    );
  }, []);

  /**
   * Initializes the component with a success log entry.
   */
  useEffect(() => {
    handleAddLog("Device initialized.", "success");
  }, []);

  /**
   * Configuration for the main control buttons.
   */
  const controlButtons = [
    {
      icon: <Settings size={20} />,
      label: "Production",
      onClick: sendProductionMode,
      disabled: false,
      tooltip: "Activate Production Mode",
      variant: "default", // Button variant styling
    },
    {
      icon: <RouteOff size={20} />,
      label: "Reset",
      onClick: sendReset,
      disabled: false,
      tooltip: "Send Reset Command",
      variant: "destructive", // Button variant styling
    },
    {
      icon: <Video size={20} />,
      label: isRecording ? "Stop" : "Record",
      onClick: toggleRecording,
      disabled: false,
      tooltip: isRecording ? "Stop Recording" : "Start Recording",
      variant: "success", // Button variant styling
    },
  ];

  /**
   * Configuration for the serial connection buttons.
   */
  const serialButtons = [
    {
      icon: isConnected ? <Plug2 size={20} /> : <Power size={20} />,
      label: isConnected ? "Disconnect" : "Connect",
      onClick: toggleConnection,
      disabled: port === "None" || isUpdatingPorts,
      tooltip: isConnected ? "Disconnect" : "Connect",
      variant: isConnected ? "destructive" : "success",
    },
  ];

  /**
   * Renders a list of buttons based on the provided configuration.
   * @param buttons - Array of button configurations.
   * @returns Array of rendered Button components.
   */
  const renderButtons = (buttons: typeof controlButtons) => {
    return buttons.map((button, index) => (
      <CustomTooltip key={index} content={button.tooltip} placement="top">
        <Button
          onClick={button.onClick}
          disabled={button.disabled}
          className={clsx(
            "flex items-center space-x-2 px-4 py-2 rounded-md",
            button.variant === "success" && "bg-gray-600 hover:bg-green-700 text-white",
            button.variant === "destructive" && "bg-gray-600 hover:bg-red-700 text-white",
            button.variant !== "success" && button.variant !== "destructive" && "bg-gray-700 hover:bg-gray-600 text-gray-300"
          )}
        >
          {button.icon}
          <span>{button.label}</span>
        </Button>
      </CustomTooltip>
    ));
  };

  /**
   * Configuration for the Select dropdowns.
   */
  const selectConfigs = [
    {
      label: "Port",
      value: port,
      onChange: setPort,
      options: portList.length > 0 ? portList : ["None"],
      placeholder: "Select Port",
    },
    {
      label: "Baud Rate",
      value: baud,
      onChange: setBaud,
      options: getBaudList(),
      placeholder: "Select Baud Rate",
    },
  ];

  /**
   * Renders a list of Select components based on the provided configuration.
   * @param selects - Array of Select configurations.
   * @returns Array of rendered Select components.
   */
  const renderSelects = (selects: typeof selectConfigs) => {
    return selects.map((select, index) => (
      <div key={index}>
        <label className="text-sm text-gray-400 mb-1" htmlFor={`${select.label}-select`}>
          {select.label}
        </label>
        <Select value={select.value} onValueChange={select.onChange}>
          <SelectTrigger className="w-full bg-gray-700 text-white hover:bg-gray-600 rounded-md">
            <SelectValue className="text-gray-400" placeholder={select.placeholder} />
          </SelectTrigger>
          <SelectContent className="bg-gray-700 text-white rounded-md">
            {select.options.map((option, idx) => (
              <SelectItem key={idx} value={option} className="hover:bg-gray-600 text-gray-300">
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    ));
  };
    // Command Input State
   //onst [command, setCommand] = useState<string>(""); // Current command input

  const [command, setCommandValue] = useState<string>("");

  const handleSendCommand = () => {
    const trimmedCommand = command.trim();
  
    if (!trimmedCommand) {
      toast.error("Command cannot be empty.");
      return;
    }
  
    try {
      handleSend(trimmedCommand, sendCommand, setCommandValue);
      toast.success("Command sent successfully!");
      console.log(`Comando enviado: ${trimmedCommand}`);
    } catch (error) {
      toast.error("Failed to send command.");
      console.error("Erro ao enviar comando:", error);
    }
  };
  
  const sendCommand = (cmd: string) => {
    console.log(`Enviando comando: ${cmd}`);
  };


  return (
    <main className="h-screen w-screen bg-gradient-to-b from-[#0a0a0a] via-[#131313] to-[#09090a]">
      {/* Toast Notifications Provider */}
      <ToastProvider />

      {/* Custom Top Bar */}
      <div
        data-tauri-drag-region
        className="flex items-center justify-between px-4 py-2 bg-gradient-radial from-[#0a0a0a] via-[#202020] to-[#19191a] select-none"
      >
        {/* Logo and Title */}
        <div className="flex items-center">
          <Image
            src="/DcubeD_white.svg"
            alt="DCUBED Logo"
            width={40}
            height={40}
            className="mr-2"
          />
          <span className="text-white font-bold tracking-widest text-lg">
            DCubed - ISM Controller
          </span>
        </div>

        {/* Window Control Buttons */}
        <div className="flex items-center space-x-2">
          {/* Minimize Button */}
          <button
            onClick={() => minimizeApp(appWindow)} // Minimize the application window
            className="p-2 text-gray-500 hover:text-gray-300 focus:outline-none"
            aria-label="Minimize"
          >
            <Minus size={20} />
          </button>
          {/* Maximize Button */}
          <button
            onClick={() => maximizeApp(appWindow)} // Maximize the application window
            className="p-2 text-gray-500 hover:text-gray-300 focus:outline-none"
            aria-label="Maximize"
          >
            <Maximize size={20} />
          </button>
          {/* Close Button */}
          <button
            onClick={() => setIsExportModalOpen(true)} // Open the close confirmation dialog
            className="p-2 text-gray-500 hover:text-red-500 focus:outline-none"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        {/* Close Confirmation Dialog */}
        <Dialog open={isExportModalOpen} onOpenChange={setIsExportModalOpen}>
          <DialogContent className="bg-gradient-to-br from-[#000000] via-[#111111] to-[#0b020f] text-white border-2 border-gray-900 rounded-2xl">
            <DialogHeader>
              <DialogTitle>Close Application</DialogTitle>
              <DialogDescription>
                Are you sure you want to close the application? Any unsaved changes will be lost.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                className="bg-white hover:bg-gray-300 hover:text-gray-900 text-black"
                variant="ghost"
                onClick={() => setIsExportModalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={() => closeApp(appWindow)} // Close the application window
                className="bg-red-700 hover:bg-red-800 text-white"
              >
                Yes, Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Serial Connection and Control Panel Section */}
      <div className="w-full flex flex-col space-y-6 p-4">
        <div className="grid grid-cols-12 gap-4">
          {/* Render Select Dropdowns for Port and Baud Rate */}
          {renderSelects(selectConfigs)}
        </div>

        <div className="grid grid-cols-12 gap-4">
          {/* Update Ports Button */}
          <Button
            variant="default"
            size="sm"
            onClick={fetchPorts}
            disabled={isUpdatingPorts}
            className="w-full bg-gray-700 hover:bg-gray-600 text-gray-300 px-3 py-1"
          >
            {isUpdatingPorts && <RotateCcw className="animate-spin mr-2" />} {/* Loading spinner */}
            <span>Update Ports</span>
          </Button>

          <div className="flex items-end">
            {/* Connect/Disconnect Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleConnection}
              disabled={port === "None" || isUpdatingPorts}
              className={clsx(
                "w-full flex items-center justify-center px-3 py-1 rounded-md",
                isConnected
                  ? "bg-red-600 hover:bg-red-500 text-white"
                  : "bg-green-600 hover:bg-green-500 text-white"
              )}
            >
              {isConnected ? (
                <>
                  <Plug2 className="w-5 h-5 mr-2" /> Disconnect
                </>
              ) : (
                <>
                  <Power className="w-5 h-5 mr-2" /> Connect
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Main Control Buttons */}
        <div className="flex space-x-8">
          {renderButtons(controlButtons)}
        </div>

        <div className="flex space-x-8">
          {/* Devices Control Panel */}
          <div className="grid grid-cols-3 gap-4">
            {/* LEDs Control Section */}
            <div className="space-y-4">
              <Card className="bg-gradient-to-b from-[#08060a] via-[#000000] to-[#08010f] rounded-lg border border-gray-700 shadow-xl hover:shadow-2xl transition-shadow">
                <CardHeader className="mb-2">
                  <CardTitle className="text-xl text-center text-gray-100">LEDs</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {leds.map((led) => (
                      <div key={led.id} className="flex flex-col space-y-2">
                        {/* LED Card */}
                        <div
                          className={clsx(
                            "p-4 rounded-md transition-all duration-300 flex flex-col space-y-4 overflow-hidden bg-gradient-to-b from-gray-800 via-black to-gray-900 border-2",
                            led.status === "ON" ? "border-purple-500" : "border-gray-700",
                            isRecording && "opacity-50 cursor-not-allowed" // Disable interactions during recording
                          )}
                        >
                          {/* LED Header with Toggle Button */}
                          <div className="flex justify-between items-center">
                            <h3 className="text-2xl font-bold text-white">LED {led.id}</h3>
                            <Button
                              onClick={() => handleLEDToggle(led.id)} // Toggle LED on/off
                              disabled={!isConnected || isRecording}
                              variant="ghost"
                              className={clsx(
                                "p-2 transition-all text-lg",
                                led.status === "ON" ? "text-purple-500 hover:text-purple-600" : "text-gray-500 hover:text-gray-400"
                              )}
                              aria-label={`Toggle LED ${led.id}`}
                            >
                              {led.status === "ON" ? <PowerOff size={24} /> : <Power size={24} />}
                            </Button>
                          </div>

                          {/* LED Icon Display */}
                          <div className="flex justify-center text-2xl w-full h-full animate-blink">
                            <LEDIcon intensity={led.intensity} />
                            <div className="flex items-center space-x-2">
                              <span
                                className={`text-[#7221bd] text-lg font-extrabold`}
                              >
                                {led.status}
                              </span>
                            </div>
                          </div>

                          {/* Intensity Slider and Input */}
                          <div className="flex items-center space-x-4">
                            <CustomTooltip content="Adjust Intensity (%)" placement="top">
                              <CustomSlider
                                value={tempIntensity}
                                onChange={(value) => setTempIntensity(value)} // Update temporary intensity
                                min={0}
                                max={100}
                                step={0.1}
                                disabled={!isConnected || led.status === "OFF" || isRecording}
                              />
                            </CustomTooltip>
                            <CustomTooltip content="Set Intensity (%)" placement="top">
                              <div className="relative">
                                <Input
                                  type="number"
                                  value={tempIntensity}
                                  onChange={(e) =>
                                    setTempIntensity(
                                      Math.min(100, Math.max(0, parseFloat(e.target.value) || 0))
                                    )
                                  }
                                  className="w-20 text-sm bg-gray-700 text-white rounded-md appearance-none"
                                  min={0}
                                  max={100}
                                  step={0.1}
                                  disabled={!isConnected || led.status === "OFF" || isRecording}
                                  style={{
                                    MozAppearance: "textfield",
                                  }}
                                  onWheel={(e) => e.currentTarget.blur()} // Prevent scroll wheel changes
                                />
                                <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs">%</span>
                              </div>
                            </CustomTooltip>
                          </div>

                          {/* Update LED Button */}
                          <Button
                            onClick={() => handleLEDIntensityChange(led.id, tempIntensity)} // Apply intensity change
                            className="px-3 py-2 bg-[#7221bd] hover:bg-[#451f68] text-white rounded-md"
                            disabled={!isConnected || led.status === "OFF" || isRecording}
                          >
                            Update
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Light Barriers and Motors Control Sections */}
            <div className="space-y-4 h-[1000px]">
              {/* Light Barriers Control Section */}
              <Card className="bg-gradient-to-b from-[#08060a] via-[#000000] to-[#0c0116] rounded-lg border border-gray-700 shadow-xl hover:shadow-2xl transition-shadow">
                <CardHeader className="mb-2">
                  <CardTitle className="text-xl text-center text-gray-100">Light Barriers</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-4 gap-4">
                    {lightBarriers.map((lb) => (
                      <div key={lb.id} className="flex flex-col space-y-2">
                        {/* Light Barrier Card */}
                        <div
                          className={clsx(
                            "p-4 rounded-md transition-all duration-300 flex flex-col space-y-4 overflow-hidden bg-gradient-to-b from-gray-800 via-black to-gray-900",
                            isRecording && "opacity-50 cursor-not-allowed" // Disable interactions during recording
                          )}
                        >
                          {/* Light Barrier Header */}
                          <div className="flex justify-center items-center">
                            <h3 className="text-lg font-bold text-white">LB {lb.id}</h3>
                          </div>

                          {/* Light Barrier Icon */}
                          <div className="flex justify-center">
                            <LightBarrierIcon
                              status={lb.status}
                              color={
                                lb.status === "OK"
                                  ? "#8d00b0"
                                  : lb.status === "WARNING"
                                  ? "#FFFF00"
                                  : "#FF0000"
                              }
                              glowIntensity={1.0}
                              glowSpeed={1.5}
                            />
                          </div>

                          {/* Light Barrier Status */}
                          <div className="text-center font-semibold">
                            <span
                              className={
                                lb.status === "OK"
                                  ? "text-[#8d00b0]"
                                  : lb.status === "WARNING"
                                  ? "text-yellow-500"
                                  : "text-red-500"
                              }
                            >
                              {lb.status}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Motors Control Section */}
              <Card className="w-[600px] bg-gradient-to-b from-[#08060a] via-[#000000] to-[#180230] rounded-lg border border-gray-700 shadow-xl hover:shadow-2xl transition-shadow">
                <CardHeader className="mb-2">
                  <CardTitle className="text-xl text-center text-gray-100">Motors</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4">
                    {motors.map((motor) => (
                      <div key={motor.id} className="flex flex-col space-y-2">
                        {/* Motor Card */}
                        <div
                          className={clsx(
                            "p-4 rounded-md transition-all duration-300 flex flex-col space-y-4 overflow-hidden bg-gradient-to-b from-gray-800 via-black to-gray-900 border-2",
                            motor.status === "ON" ? "border-purple-500" : "border-gray-700",
                            isRecording && "opacity-50 cursor-not-allowed" // Disable interactions during recording
                          )}
                        >
                          {/* Motor Header with Toggle Button */}
                          <div className="flex justify-between items-center">
                            <h3 className="text-lg font-bold text-white">Motor {motor.id}</h3>
                            <Button
                              onClick={() => handleMotorToggle(motor.id)} // Toggle Motor on/off
                              disabled={!isConnected || isRecording}
                              variant="ghost"
                              className={clsx(
                                "p-2 transition-all text-lg",
                                motor.status === "ON" ? "text-purple-500 hover:text-purple-600" : "text-gray-500 hover:text-gray-400"
                              )}
                              aria-label={`Toggle Motor ${motor.id}`}
                            >
                              {motor.status === "ON" ? <PowerOff size={24} /> : <Power size={24} />}
                            </Button>
                          </div>

                          {/* Motor Icon Display */}
                          <div className="flex justify-center">
                            <MotorIcon speed={motor.speed} direction={motor.direction} status={motor.status} />
                          </div>

                          {/* Speed Slider and Input */}
                          <div className="flex items-center space-x-4">
                            <CustomTooltip content="Adjust Speed (Hz)" placement="top">
                              <CustomSlider
                                value={motor.speed}
                                onChange={(value) => handleMotorSpeedChange(motor.id, value)}
                                min={0}
                                max={5000}
                                step={100}
                                disabled={!isConnected || motor.status === "OFF" || isRecording}
                              />
                            </CustomTooltip>
                            <CustomTooltip content="Set Speed (Hz)" placement="top">
                              <div className="relative">
                                <Input
                                  type="number"
                                  value={motor.speed}
                                  onChange={(e) =>
                                    handleMotorSpeedChange(
                                      motor.id,
                                      Math.min(5000, Math.max(0, parseInt(e.target.value) || 0))
                                    )
                                  }
                                  className="w-20 text-sm bg-gray-700 text-white rounded-md appearance-none"
                                  min={0}
                                  max={5000}
                                  step={100}
                                  disabled={!isConnected || motor.status === "OFF" || isRecording}
                                  style={{
                                    MozAppearance: "textfield",
                                  }}
                                  onWheel={(e) => e.currentTarget.blur()} // Prevent scroll wheel changes
                                />
                                <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs">Hz</span>
                              </div>
                            </CustomTooltip>
                          </div>

                          {/* Direction Control and Update Button */}
                          <div className="flex justify-between items-center">
                            <div className="text-sm text-gray-200">Direction: {motor.direction}</div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleMotorDirectionToggle(motor.id)} // Toggle Motor direction
                              className="text-blue-400 hover:text-blue-500"
                              aria-label={`Toggle direction of Motor ${motor.id}`}
                              disabled={!isConnected || motor.status === "OFF" || isRecording}
                            >
                              {motor.direction === "CW" ? <RefreshCcw /> : <RefreshCw />}
                            </Button>
                            <Button
                              onClick={() => updateMotorValue(motor.id)} // Apply Motor value updates
                              className="bg-green-500 hover:bg-green-600 text-white"
                              disabled={!isConnected}
                            >
                              Update
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Debug Box Section */}
            <div>
            <DebugBox
        logs={logs}
        clearLogs={() => clearLogs(setLogs)()}
        deleteLog={(index) => deleteLog(setLogs, index)}
        sendCommand={handleSendCommand}
      />
          </div>
           </div>
           </div>

        {/* Export Logs Modal */}
        <Dialog open={isExportModalOpen} onOpenChange={setIsExportModalOpen}>
          <DialogContent className="bg-gradient-to-br from-[#000000] via-[#111111] to-[#0b020f] text-white border-2 border-gray-900 rounded-2xl w-[1000px]">
            <DialogHeader>
              <DialogTitle>Export Logs</DialogTitle>
              <DialogDescription>
                Choose the format in which you want to export the logs.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <div className="flex space-x-2 mx-auto">
                {/* Export as CSV */}
                <Button
                  onClick={() => {
                    handleExportLogs("csv");
                    setIsExportModalOpen(false);
                  }}
                  className="bg-[#461c8f] hover:bg-gray-700 text-white"
                >
                  <Download className="w-4 h-4 mr-2" /> CSV
                </Button>
                {/* Export as PDF */}
                <Button
                  onClick={() => {
                    handleExportLogs("pdf");
                    setIsExportModalOpen(false);
                  }}
                  className="bg-[#461c8f] hover:bg-red-700 text-white"
                >
                  <Download className="w-4 h-4 mr-2" /> PDF
                </Button>
                {/* Export as Excel */}
                <Button
                  onClick={() => {
                    handleExportLogs("excel");
                    setIsExportModalOpen(false);
                  }}
                  className="bg-[#461c8f] hover:bg-green-700 text-white"
                >
                  <Download className="w-4 h-4 mr-2" /> XLSX
                </Button>
              </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </main>
  );
  

  /**
   * Toggles the status of a specific LED (ON/OFF).
   * @param id - The ID of the LED.
   */
  async function handleLEDToggle(id: number) {
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
   */
  async function handleLEDIntensityChange(id: number, value: number) {
    const led = leds.find((l) => l.id === id);
    if (!led) return;

    // Only update if the LED is ON
    if (value === 0) {
      handleLEDToggle(id); // Turn off the LED via the toggle function
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
   * Toggles the status of a specific Motor (ON/OFF).
   * @param id - The ID of the Motor.
   */
  async function handleMotorToggle(id: number) {
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
  async function handleMotorSpeedChange(id: number, value: number) {
    setTempMotorValues((prev) => ({
      ...prev,
      [id]: { speed: value, direction: motors.find((m) => m.id === id)?.direction || "CW" },
    }));

    // Clear any existing timeout for reverting the speed
    if (revertTimeouts.current[id]) clearTimeout(revertTimeouts.current[id]);

    // Set a timeout to revert the speed if no update is made within 3 seconds
    revertTimeouts.current[id] = setTimeout(() => {
      setTempMotorValues((prev) => {
        const oldMotor = motors.find((m) => m.id === id);
        return oldMotor
          ? { ...prev, [id]: { speed: oldMotor.speed, direction: oldMotor.direction } }
          : prev;
      });
      toast.info(`Motor ${id} speed reverted.`);
    }, 3000);
  }

  /**
   * Applies the temporary Motor speed changes.
   * @param id - The ID of the Motor.
   */
  async function updateMotorValue(id: number) {
    const tempValue = tempMotorValues[id];
    if (!tempValue) return;

    await handleMotorCommand(id, "ON", tempValue.speed, tempValue.direction as "CW" | "CCW");
    updateMotorStatus(id, "ON", tempValue.speed, tempValue.direction as "CW" | "CCW");
    clearTimeout(revertTimeouts.current[id]); // Clear the revert timeout
    delete revertTimeouts.current[id]; // Remove the timeout reference
    toast.success(`Motor ${id} updated successfully.`);
  }

  /**
   * Toggles the direction of a specific Motor (CW/CCW).
   * @param id - The ID of the Motor.
   */
  async function handleMotorDirectionToggle(id: number) {
    const motor = motors.find((m) => m.id === id);
    if (!motor) return;

    const newDirection = motor.direction === "CW" ? "CCW" : "CW";

    const success = await handleMotorCommand(id, motor.status, motor.speed, newDirection);
    if (success) {
      updateMotorStatus(id, motor.status, motor.speed, newDirection);
      toast.success(`Motor ${id} direction set to ${newDirection}.`);
    } else {
      toast.error(`Failed to set direction of Motor ${id}.`);
    }
  }
};

export default Home;
