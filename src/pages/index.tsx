// src/pages/index.tsx
"use client";

import React, { useState, useEffect, useRef, useCallback, Component } from "react";
import { ToastProvider, toast } from "@/components/Toast";
import {
  handleGetPorts,
  getBaudList,
  handleConnect,
  handleDisconnect,
  parseBinaryResponse
} from "@/utils/serial";
import { formatCommand, handleMotorCommand, sendFormattedCommand } from "@/utils/commands";
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
  RefreshCcw,
  RefreshCw,
  PowerOff,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import CustomTooltip from "@/components/CustomTooltip";
import {
  LED,
  Motor,
  Log,
  LightBarrierStatus,
  LightBarriers,
} from "@/lib/types";
import {
  copyLogs,
  initialMotors,
  initialLightBarriers,
  utilAddLog,
  clearLogs as utilClearLogs,
  initialLeds,
} from "@/lib/utils";
import { invoke } from "@tauri-apps/api/tauri";
import clsx from "clsx"; // Utility for conditional classNames

import DebugBox from '@/components/DebugBox';
import { handleMotorDirectionUpdate, handleMotorSpeedUpdate, handleMotorToggleHandler, handleMotorUpdateHandler } from "@/utils/handlers";
import Header from '../components/Header';
import LEDCard from "@/components/LEDCard";
import { appWindow as TauriAppWindow } from "@tauri-apps/api/window";
import { listen } from "@tauri-apps/api/event";
import MotorCard from "@/components/MotorCard";
import { TempMotor } from "@/lib/types"; // Certifique-se de importar TempMotor
import { send } from "process";
import { handleLEDToggle, handleLEDIntensityChange } from "@/utils/handlers";
import { handleLEDToggleHandler, handleLEDSetIntensityHandler } from "@/utils/handlers";
import LoadingOverlay from "@/components/LoadingOverlay";
import LightBarrierCard from "@/components/LightBarrierCard";
import { saveAs } from 'file-saver';
import * as XLSX from "xlsx";
import { jsPDF } from "jspdf";


export enum CommandIDs {
  RESET = 9,
  PRODUCTION_MODE = 10,
}

/**
 * Exporta logs no formato PDF de forma simplificada.
 * @param logs - Array de logs a serem exportados.
 */
export const exportLogsAsPDF = (logs: { message: string; type: string }[]) => {
  try {
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "pt",
      format: "a4",
    });

    // Adicionar título
    doc.setFontSize(16);
    doc.text("Relatório de Logs", 40, 40);

    // Criar tabela manualmente
    const startX = 40;
    const startY = 80;
    const rowHeight = 20;

    // Adicionar cabeçalho
    doc.setFontSize(12);
    doc.text("Tipo", startX, startY);
    doc.text("Mensagem", startX + 100, startY);

    // Adicionar linhas
    let currentY = startY + rowHeight;
    logs.forEach((log) => {
      doc.text(log.type, startX, currentY);
      doc.text(log.message, startX + 100, currentY);
      currentY += rowHeight;
    });

    // Salvar o PDF
    doc.save("logs.pdf");
  } catch (error) {
    console.error("Erro ao gerar PDF:", error);
  }
};


/**
 * Converte uma URL de imagem em uma string Base64.
 * @param url A URL da imagem.
 * @returns Uma promessa que resolve para uma string Base64.
 */
const getBase64FromUrl = async (url: string): Promise<string> => {
  const response = await fetch(url);
  const blob = await response.blob();
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const dataUrl = reader.result as string;
      resolve(dataUrl);
    };
    reader.onerror = () => {
      reject(new Error('Falha ao converter a imagem em Base64.'));
    };
    reader.readAsDataURL(blob);
  });
};

/**
 * Exporta logs no formato especificado (CSV, PDF, Excel).
 * @param logs - Array de logs a serem exportados.
 * @param format - O formato para exportar os logs ("csv" | "pdf" | "excel").
 */
/**
 * Exporta logs no formato especificado (CSV, PDF, Excel).
 * @param logs - Array de logs a serem exportados.
 * @param format - O formato para exportar os logs ("csv" | "pdf" | "excel").
 */
export const handleExportLogs = async (
  logs: { message: string; type: string }[],
  format: "csv" | "pdf" | "excel"
) => {
  if (format === "csv") {
    // Criar conteúdo CSV
    const csvContent = logs.map(log => `${log.type},${log.message}`).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "logs.csv");
  } else if (format === "pdf") {
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "pt",
      format: "a4",
    });

    // Adicionar título
    doc.setFontSize(16);
    doc.text("Relatório de Logs", 40, 40);

    // Criar tabela manualmente
    const startX = 40;
    const startY = 80;
    const rowHeight = 20;

    // Adicionar cabeçalho
    doc.setFontSize(12);
    doc.text("Tipo", startX, startY);
    doc.text("Mensagem", startX + 100, startY);

    // Adicionar linhas
    let currentY = startY + rowHeight;
    logs.forEach((log) => {
      doc.text(log.type, startX, currentY);
      doc.text(log.message, startX + 100, currentY);
      currentY += rowHeight;
    });

    // Salvar o PDF
    doc.save("logs.pdf");
  } else if (format === "excel") {
    const worksheet = XLSX.utils.json_to_sheet(logs);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Logs");
    const wbout = XLSX.write(workbook, { type: "array", bookType: "xlsx" });
    const blob = new Blob([wbout], { type: "application/octet-stream" });
    saveAs(blob, "logs.xlsx");
  }
};

// Import Tauri's appWindow only on the client side
export const useAppWindow = () => {''
  const [appWindowInstance, setAppWindowInstance] = useState<any>(null);

  useEffect(() => {
    const loadAppWindow = async () => {
      if (typeof window !== "undefined") {
        const { appWindow } = await import("@tauri-apps/api/window");
        setAppWindowInstance(appWindow);
      }
    };
    loadAppWindow();
  }, []);

  return appWindowInstance;
};

/**
 * Fecha a aplicação.
 */
export const closeApp = async (appWindow: typeof TauriAppWindow | null) => {
  if (appWindow) {
    try {
      await appWindow.close();
    } catch (error) {
      console.error("Erro ao fechar a janela:", error);
    }
  }
};

/**
 * Minimiza a aplicação.
 */
export const minimizeApp = async (appWindow: typeof TauriAppWindow | null) => {
  if (appWindow) {
    try {
      await appWindow.minimize();
    } catch (error) {
      console.error("Erro ao minimizar a janela:", error);
    }
  }
};

/**
 * Maximiza/restaura a aplicação.
 */
export const maximizeApp = async (appWindow: typeof TauriAppWindow | null) => {
  if (appWindow) {
    try {
      await appWindow.toggleMaximize();
    } catch (error) {
      console.error("Erro ao maximizar a janela:", error);
    }
  }
};




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
  const [tempMotorValues, setTempMotorValues] = useState<
  Record<number, { speed: number; direction: "CW" | "CCW" }>
>({});

  const [tempLEDValues, setTempLEDValues] = useState<Record<number, number>>({});
  const revertTimeouts = useRef<Record<number, NodeJS.Timeout>>({});

  // Serial Connection States
  const [baud, setBaud] = useState<string>("9600"); // Current baud rate
  const [port, setPort] = useState<string>("None"); // Currently selected serial port
  const [portList, setPortList] = useState<string[]>(["None"]);

  const [isUpdatingPorts, setIsUpdatingPorts] = useState<boolean>(false); // Indicates if ports are being updated
  const [isConnected, setIsConnected] = useState<boolean>(false); // Connection status

  // Device States
  
  const [logs, setLogs] = useState<Log[]>([]); // Array of log entries
  const [motors, setMotors] = useState<Motor[]>(initialMotors); // Array of motors
  const [lightBarriers, setLightBarriers] = useState<LightBarriers[]>(initialLightBarriers); // Array of light barriers
  const [leds, setLeds] = useState<LED[]>(initialLeds); // Array of LEDs

 // const [lightBarriers, setLightBarriers] = useState(initialLightBarriers);


  const [isProductionActive, setIsProductionActive] = useState<boolean>(false);

  const [isCloseModalOpen, setIsCloseModalOpen] = React.useState(false);

const [tempIntensities, setTempIntensities] = useState<number[]>(() =>
  leds.map(() => 0) // Inicializa todas as intensidades com 0
);

const [isConnecting, setIsConnecting] = useState<boolean>(false); // Estado para carregamento

  //const [tempIntensity, setTempIntensity] = useState<number>(0);

  useEffect(() => {
    const unlisten = listen<SerialPayload>('updateSerial', (event) => {
      const data = event.payload.data;
  
      // Log para verificar o payload recebido
      handleAddLog(`Received by serial (binary): [${data.join(', ')}]`, "info");
  
      // Processa os dados recebidos
      parseBinaryResponse(
        data,
        updateLEDStatus,        // Atualiza LEDs
        updateMotorStatus,      // Atualiza motores
        updateLightBarrierStatus, // Atualiza barreiras de luz
        handleAddLog            // Adiciona logs
      );
    });
  
    handleAddLog("Serial event listeners set up successfully (binary).", "success");
  
    return () => {
      unlisten.then((f) => f()).catch((err) => console.error(err));
    };
  }, [leds, motors, lightBarriers]);
  


// Atualiza o status do LED no estado
const updateLEDStatusFunction = (
  id: number,
  status: "ON" | "OFF",
  intensity?: number
) => {
  setLeds(prevLeds =>
    prevLeds.map(led =>
      led.id === id
        ? {
            ...led,
            status,
            intensity: intensity !== undefined ? intensity : led.intensity,
          }
        : led
    )
  );
  handleAddLog(
    `LED ${id} updated to ${status}${
      intensity !== undefined ? ` with intensity ${intensity}%` : ""
    }`,
    "info"
  );
};


// Atualiza o status do LED no estado
const updateMotorStatusFunction = (
  id: number,
  status: "ON" | "OFF",
  speed?: number,
  direction?: "CW" | "CCW"
) => {
  // Atualiza o estado dos motores
  setMotors(prevMotors =>
    prevMotors.map(motor =>
      motor.id === id
        ? {
            ...motor,
            status,
            speed: speed !== undefined ? speed : motor.speed,
            direction: direction !== undefined ? direction : motor.direction,
          }
        : motor
    )
  );

  // Adiciona um log detalhado consolidado
  handleAddLog(
    `Motor ${id} updated to ${status}${
      speed !== undefined ? ` with speed ${speed}Hz` : ""
    }${direction !== undefined ? ` and direction ${direction}` : ""}.`,
    "info"
  );
};



  /*
  const handleLEDToggle = async (id: number) => {
    const led = leds.find((l) => l.id === id);
    if (!led) return;
  
    const newStatus = led.status === "ON" ? "OFF" : "ON";
    const newIntensity = newStatus === "ON" ? 100 : 0;
  
    handleAddLog(`Toggling LED ${id} to ${newStatus}...`, "info");
  
    const success = await handleLEDCommand(id, newStatus, newIntensity, handleAddLog);
    if (success) {
      updateLEDStatus(id, newStatus, newIntensity);
      handleAddLog(`LED ${id} toggled to ${newStatus}.`, "success");
    } else {
      handleAddLog(`Failed to toggle LED ${id} to ${newStatus}.`, "error");
    }
  };
  
  const handleLEDIntensityChange = async (id: number, intensity: number) => {
    const led = leds.find((l) => l.id === id);
    if (!led) return;
  
    handleAddLog(`Changing intensity of LED ${id} to ${intensity}%...`, "info");
  
    const success = await handleLEDCommand(id, "ON", intensity, handleAddLog);
    if (success) {
      updateLEDStatus(id, "ON", intensity);
      handleAddLog(`LED ${id} intensity set to ${intensity}%.`, "success");
    } else {
      handleAddLog(`Failed to set intensity of LED ${id} to ${intensity}%.`, "error");
    }
  };
*/

  // Recording State
  const [isRecording, setIsRecording] = useState<boolean>(false); // Indicates if recording is active
  const [isProductionMode, setIsProductionMode] = useState<boolean>(false);
  
  // Command Input State
  const [command, setCommand] = useState<string>(""); // Current command input

  // Reference to the application window for window controls
  const appWindow = useAppWindow();

  // Exemplo de uso
  const exportLogs = async (format: "csv" | "pdf" | "excel"): Promise<void> => {
    await handleExportLogs(logs, format);
  };
  
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
    ) => {
      setLogs((prevLogs) => utilAddLog(prevLogs, message, type));
    },
    []
  );


  useEffect(() => {
    let isMounted = true;
  
    // Configura o listener
    const setupListener = async () => {
      const unlisten = await listen<any>("backendLog", (event) => {
        if (isMounted) {
          const { message, type } = event.payload;
          handleAddLog(message, type ?? "info");
        }
      });
  
      // Retorna a função de cleanup
      return () => unlisten();
    };
  
    // Chama a função setupListener
    setupListener().catch(console.error);
  
    return () => {
      isMounted = false;
    };
  }, [handleAddLog]);
  
  

  /**
   * Fetches the available serial ports and updates the state.
   */
  const fetchPorts = async () => {
    setIsUpdatingPorts(true);
    handleAddLog("Searching ports...", "info"); // Log inicial
  
    try {
      await handleGetPorts(setPortList); // Passa `setPortList` como argumento
      handleAddLog("Ports updated successfully.", "success");
    } catch (error: any) {
      handleAddLog(`Error while searching for ports: ${error.message}`, "error");
    } finally {
      setIsUpdatingPorts(false);
    }
  };
  

  /**
   * Toggles the serial connection between connected and disconnected states.
   */
  const toggleConnection = async () => {
    let showLoaderTimeout: NodeJS.Timeout;
    const loaderDelay = 500; // Tempo para mostrar o overlay (500ms)
  
    if (!isConnected) {
      handleAddLog("Attempting to connect...", "info");
  
      // Configure um timeout para exibir o overlay apenas se a conexão demorar
      showLoaderTimeout = setTimeout(() => {
        setIsConnecting(true);
      }, loaderDelay);
  
      try {
        const connected = await handleConnect(port, baud, setIsConnected);
  
        if (connected) {
          handleAddLog(`Connected to port ${port} at ${baud} baud.`, "success");
        } else {
          handleAddLog("Failed to connect to the port.", "error");
        }
      } catch (error:any) {
        handleAddLog(`Error connecting: ${error.message}`, "error");
      } finally {
        clearTimeout(showLoaderTimeout); // Cancela o timeout se a conexão for rápida
        setIsConnecting(false); // Certifica-se de ocultar o overlay
      }
    } else {
      try {
        const disconnected = await handleDisconnect(setIsConnected);
        if (disconnected) {
          handleAddLog(`Disconnected from port ${port}.`, "success");
        } else {
          handleAddLog("No active connection to disconnect.", "warning");
        }
      } catch (error:any) {
        handleAddLog(`Error disconnecting: ${error.message}`, "error");
      }
    }
  };

/**
 * Ativa o modo de produção.
 */
const sendProductionMode = async () => {
  try {
    const command = formatCommand(CommandIDs.PRODUCTION_MODE, 0x00, 1); // Command for Production Mode
    const success = await sendFormattedCommand(command, handleAddLog);

    if (success) {
      setIsProductionMode(true); // Ativar modo de produção
      handleAddLog("Production mode activated.", "success");
      toast.success("Production mode activated.");
    } else {
      handleAddLog("Failed to activate production mode.", "error");
      toast.error("Failed to activate production mode.");
    }
  } catch (error) {
    handleAddLog(`Error activating production mode: ${error}`, "error");
    toast.error("Failed to activate production mode.");
  }
};

/**
 * Desativa o modo de produção.
 */
const disableProductionMode = async () => {
  try {
    const command = formatCommand(CommandIDs.PRODUCTION_MODE, 0x00, 0); // Comando para desativar Production Mode
    const success = await sendFormattedCommand(command, handleAddLog);

    if (success) {
      setIsProductionMode(false); // Desativa o estado de produção
      handleAddLog("Production mode deactivated.", "success");
      toast.success("Production mode deactivated.");
    } else {
      handleAddLog("Failed to deactivate production mode.", "error");
      toast.error("Failed to deactivate production mode.");
    }
  } catch (error) {
    handleAddLog(`Error deactivating production mode: ${error}`, "error");
    toast.error("Failed to deactivate production mode.");
  }
};

/**
 * Envia o comando de reset e redefine os estados no frontend.
 */
const sendReset = async () => {
  try {
    // Comando de reset
    const command = formatCommand(CommandIDs.RESET, 0x00, 0); // Command for Reset
    const success = await sendFormattedCommand(command, handleAddLog);

    if (success) {
      handleAddLog("Reset command sent.", "success");
      toast.success("Reset command sent.");

      // Desativa o modo de produção, se estiver ativo
      if (isProductionMode) {
        await disableProductionMode(); // Certifique-se de aguardar a conclusão
        handleAddLog("Production mode deactivated.", "info");
        toast.info("Production mode deactivated.");
      }

      // Reset frontend states
      setLeds(initialLeds); // Redefine LEDs ao estado inicial
      setMotors(initialMotors); // Redefine motores ao estado inicial
      setLightBarriers(initialLightBarriers); // Redefine Light Barriers ao estado inicial
    } else {
      handleAddLog("Failed to send reset command.", "error");
      toast.error("Failed to send reset command.");
    }
  } catch (error) {
    handleAddLog(`Error sending reset command: ${error}`, "error");
    toast.error("Failed to send reset command.");
  }
};



  /**
   * Updates the status and intensity of a specific LED.
   * @param id - The ID of the LED.
   * @param status - The new status ("ON" | "OFF").
   * @param intensity - The new intensity value (optional).
   */
// Update LED status in state
const updateLEDStatus = (id: number, status: "ON" | "OFF", intensity?: number) => {
  setLeds(prevLeds =>
    prevLeds.map(led =>
      led.id === id
        ? {
            ...led,
            status,
            intensity: intensity !== undefined ? intensity : led.intensity,
            // Add any additional fields if necessary
          }
        : led
    )
  );
  handleAddLog(
    `LED ${id} updated to ${status}${intensity !== undefined ? ` with intensity ${intensity}%` : ""}`,
    "info"
  );

};

const updateLightBarrierStatus = (id: number, status: LightBarrierStatus) => {
  setLightBarriers((prevLightBarriers) =>
    prevLightBarriers.map((lightBarrier) =>
      lightBarrier.id === id
        ? {
            ...lightBarrier,
            status, // Atualiza o status com o enum
            lastChanged: new Date().toLocaleTimeString(), // Atualiza o timestamp de última mudança
          }
        : lightBarrier // Mantém as outras barreiras inalteradas
    )
  );

  // Gera mensagem de log detalhada
  const logMessage = `Light Barrier ${id} updated to ${status}.`;
  handleAddLog(logMessage, "info");
};


 /**
 * Atualiza o status, velocidade e direção de um motor específico.
 * @param id - O ID do motor.
 * @param status - O novo status ("ON" | "OFF").
 * @param speed - O novo valor de velocidade (opcional).
 * @param direction - A nova direção ("CW" | "CCW") (opcional).
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
            lastChanged: new Date().toLocaleTimeString(), // Atualiza o timestamp de última mudança
          }
        : motor
    )
  );

  // Gera mensagem de log detalhada
  const logMessage = `Motor ${id} updated to ${status}${
    speed !== undefined ? ` with speed ${speed} Hz` : ""
  }${direction !== undefined ? ` and direction ${direction}` : ""}.`;

  handleAddLog(logMessage, "info");
};


  
  interface SerialPayload {
    data: number[];
  }




  /**
   * Sets up listeners for serial events to handle updates from the backend.
   */
  useEffect(() => {
    try {
      listen<SerialPayload>('updateSerial', (event) => {
        const data = event.payload.data;
        handleAddLog(`Received by serial (binary): [${data.join(', ')}]`, "info");
        parseBinaryResponse(data, updateLEDStatus, updateMotorStatus, updateLightBarrierStatus, handleAddLog);
      });
      handleAddLog("Serial event listeners set up successfully (binary).", "success");
    } catch (error: any) {
      handleAddLog(`Error setting up serial event listeners: ${error.message}`, "error");
    }
  }, []);

  

  /**
   * Initializes the component with a success log entry.
   */
  useEffect(() => {
    handleAddLog("Initializing device...", "info"); // Log de inicialização
  
    fetchPorts()
      .then(() => handleAddLog("Ports fetched successfully.", "success"))
      .catch((error: any) =>
        handleAddLog(`Error fetching ports during initialization: ${error.message}`, "error")
      );
  
    handleAddLog("Device initialized.", "success"); // Log de sucesso após inicialização
  }, []);


  const selectFolder = async () => {
    try {
      const folder = await invoke("set_folder_path");
      handleAddLog(`Folder selected: ${folder}`, "success");
      return folder;
    } catch (error) {
      handleAddLog("Failed to select folder.", "error");
      return null;
    }
  };

  const startRecording = async () => {
    const folder = await selectFolder();
    if (!folder) return;
  
    try {
      const success = await invoke("handle_start_record");
      if (success) {
        setIsRecording(true);
        handleAddLog("Recording started.", "success");
        toast.success("Recording started.");
      } else {
        handleAddLog("Failed to start recording.", "error");
        toast.error("Failed to start recording.");
      }
    } catch (error) {
      handleAddLog("Error starting recording.", "error");
      toast.error("Error starting recording.");
    }
  };
  
  const stopRecording = async () => {
    try {
      const success = await invoke("handle_start_record");
      if (success) {
        setIsRecording(false);
        handleAddLog("Recording stopped.", "success");
        toast.success("Recording stopped.");
      } else {
        handleAddLog("Failed to stop recording.", "error");
        toast.error("Failed to stop recording.");
      }
    } catch (error) {
      handleAddLog("Error stopping recording.", "error");
      toast.error("Error stopping recording.");
    }
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
const renderSelects = (selects: typeof selectConfigs, additionalClasses = "w-48") => {
  return selects.map((select, index) => (
    <div key={index} className={`flex flex-col space-y-1 ${additionalClasses}`}>
      {/* Label */}
      <label
        className="text-sm text-gray-400 mb-1"
        htmlFor={`${select.label}-select`}
      >
        {select.label}
      </label>
      {/* Select Component */}
      <Select value={select.value} onValueChange={select.onChange}>
        <SelectTrigger className="bg-gray-700 text-white hover:bg-gray-600 rounded-md">
          <SelectValue
            className="text-gray-400"
            placeholder={select.placeholder}
          />
        </SelectTrigger>
        <SelectContent className="bg-gray-700 text-white rounded-md">
          {select.options.map((option, idx) => (
            <SelectItem
              key={idx}
              value={option}
              className="hover:bg-gray-600 text-gray-300"
            >
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  ));
};

function updateMotor(id: number, speed: number, direction: "CW" | "CCW") {
  const motor = motors.find((m) => m.id === id);

  if (!motor) return;

  // Sempre enviar ambos os comandos, independentemente das mudanças
  handleMotorDirectionUpdate(id, direction, motors, updateMotorStatusFunction, handleAddLog);
  handleMotorSpeedUpdate(id, speed, motors, updateMotorStatusFunction, handleAddLog);
}


return (
<main className="relative h-screen w-screen bg-gradient-to-b from-[#1c1c1c] via-[#0a0a0a] to-[#1a1a1a]">
  {/* Overlay de carregamento */}
  <LoadingOverlay isLoading={isConnecting} />

  {/* Conteúdo principal */}
  <ToastProvider />
  <Header
    onMinimize={() => minimizeApp(appWindow)}
    onMaximize={() => maximizeApp(appWindow)}
    onClose={() => closeApp(appWindow)}
    isCloseModalOpen={isCloseModalOpen}
    setIsCloseModalOpen={setIsCloseModalOpen}
  />

  {/* Layout principal */}
  <div className="w-full grid grid-cols-3 items-center p-4 gap-x-4 gap-y-6">
    {/* Coluna Esquerda */}
    <div className="flex items-center space-x-4 self-start">
      {renderSelects(selectConfigs, "w-28")}
      <div className="grid grid-cols-2 gap-4 mt-7">
        <Button
          onClick={toggleConnection}
          disabled={!port || isUpdatingPorts || isProductionMode}
          className={clsx(
            "w-full flex items-center justify-center px-2 py-1 rounded-lg active:scale-75 transition-all ",
            isConnected
              ? "bg-red-600 hover:bg-red-500 text-white"
              : "bg-green-600 hover:bg-green-500 text-white"
          )}
        >
          {isConnected ? (
            <>
              <Plug2 className="w-5 h-5 mr-1" /> Disconnect
            </>
          ) : (
            <>
              <Power className="w-5 h-5 mr-1" /> Connect
            </>
          )}
        </Button>
        <Button
          onClick={fetchPorts}
          disabled={isUpdatingPorts || isProductionMode}
          className="w-12 bg-gray-700 hover:bg-gray-600 text-gray-300 px-2 py-1 rounded-lg flex items-center justify-center"
        >
          <RefreshCcw className="w-5 h-5" />
        </Button>
      </div>
    </div>

    {/* Coluna Central */}
    <div className="flex justify-center items-start mt-8">
      {/* Adiciona margem superior para descer a Light Barrier */}
      <LightBarrierCard
  lightBarriers={lightBarriers}
  isConnected={isConnected}
  handleLightBarrierUpdate={(id, status) => {
    updateLightBarrierStatus(id, status); // Atualiza o estado da light barrier
  }}
/>

    </div>

    {/* Coluna Direita */}
    <div className="flex justify-end space-x-4 self-start">
      <button
        onClick={isProductionMode ? disableProductionMode : sendProductionMode}
        disabled={isUpdatingPorts || !isConnected}
        className={clsx(
          "flex flex-col items-center justify-center h-[50px] w-[100px] rounded-lg font-medium transition-all text-sm",
          isProductionMode
            ? "bg-green-600 hover:bg-green-500 text-white shadow-md shadow-green-700"
            : !isConnected
            ? "bg-gray-500 text-gray-400 cursor-not-allowed"
            : "bg-gray-700 hover:bg-gray-600 text-gray-300 shadow-md shadow-gray-200"
        )}
      >
        <Settings size={18} className="mb-1" />
        {isProductionMode ? "Deactivate" : "Production"}
      </button>
      <button
            onClick={sendReset}
            disabled={port === "None" || isUpdatingPorts || !isConnected}
            className={clsx(
              "flex flex-col items-center justify-center h-[50px] w-[100px] rounded-lg font-medium transition-all text-sm",
              port === "None" || isUpdatingPorts || !isConnected
            ? "bg-gray-500 text-gray-400 cursor-not-allowed"
            : "bg-gray-700 hover:bg-gray-600 text-gray-300 shadow-md shadow-gray-200"
            )}
          >
            <RouteOff size={18} className="mb-1" />
            Reset
          </button>
    </div>
  </div>

  {/* Seção de Controle de Dispositivos */}
  <div className="flex flex-col space-y-4 mt-8 px-4">
    {/* Grid para LEDs, Light Barriers e Motores */}
    <div className="grid grid-cols-3 gap-4">
      {/* LEDs */}
      <LEDCard
        leds={leds}
        isConnected={isConnected}
        isRecording={isRecording}
        handleLEDToggle={(id) =>
          handleLEDToggleHandler(
            id,
            leds,
            updateLEDStatusFunction,
            handleAddLog
          )
        }
        handleLEDSetIntensity={(id, intensity) =>
          handleLEDSetIntensityHandler(
            id,
            intensity,
            leds,
            updateLEDStatusFunction,
            handleAddLog
          )
        }
        isProductionMode={isProductionMode}
      />

      {/* Motors Control Section */}
      <MotorCard
  motors={motors}
  isConnected={isConnected}
  isRecording={isRecording}
  handleMotorToggle={(id) =>
    handleMotorToggleHandler(
      id,
      motors,
      updateMotorStatusFunction,
      handleAddLog
    )
  }
  handleMotorSet={(id, speed, direction) =>
    updateMotor(id, speed, direction) // Sempre envia os comandos
  }
  isProductionMode={isProductionMode}
/>


      {/* Debug Box Section */}
      <DebugBox
        logs={logs}
        setLogs={setLogs}
        copyLogs={copyLogs}
        handleAddLog={handleAddLog}
        handleExport={exportLogs}
      />
    </div>
  </div>
</main>
)
}

export default Home;