//src/utils/serial.ts
import { invoke } from "@tauri-apps/api/tauri";
import { listen } from "@tauri-apps/api/event";
import { toast } from "@/components/Toast";
//import { sendFormattedCommand } from "./commands";

async function handleGetPorts(setPorts: any) {
  const ports = await invoke("get_ports", {});
  setPorts(ports);
}

async function handleConnect(
  port: string, 
  baud: string, 
  ending: string, 
  setIsConnected: any
): Promise<boolean> { // Especificar o tipo de retorno como boolean
  ending = convertEnding(ending);
  await invoke("set_port_items", { port, baud, ending });
  const isConnected = await invoke<boolean>("handle_serial_connect", {});
  setIsConnected(isConnected);
  return isConnected; // Retorna o valor booleano
}


/**
 * Função para desconectar da porta serial.
 * @param setIsConnected - Função para atualizar o estado de conexão.
 */
export async function handleDisconnect(setIsConnected: (status: boolean) => void): Promise<boolean> {
  try {
    const disconnected = await invoke<boolean>("handle_serial_disconnect");
    if (disconnected) {
      console.log("Serial port successfully disconnected.");
      setIsConnected(false); // Atualiza o estado no frontend
    } else {
      console.warn("No active serial port to disconnect.");
    }
    return disconnected;
  } catch (error) {
    console.error("Error disconnecting serial port:", error);
    return false;
  }
}


/**
 * Configura os listeners para os eventos de comunicação serial.
 * @param updateLEDStatus - Função para atualizar o status do LED na UI.
 * @param updateMotorStatus - Função para atualizar o status do Motor na UI.
 * @param updateLightBarrierStatus - Função para atualizar o status da Light Barrier na UI.
 * @param addLog - Função para adicionar logs ao sistema de logs.
 */

function setupSerialListeners(
  updateLEDStatus: (id: number, status: "ON" | "OFF", intensity?: number) => void,
  updateMotorStatus: (id: number, status: "ON" | "OFF", speed?: number, direction?: "CW" | "CCW") => void,
  updateLightBarrierStatus: (id: number, status: "OK" | "ERROR") => void,
  addLog: (message: string, type?: "error" | "success" | "info" | "warning") => void
) {
  // Listener para dados recebidos via serial (ACKs e comandos)
  listen<{ message: string }>('updateSerial', (event) => {
    const message = event.payload.message.trim();
    addLog(`Received Serial: ${message}`);
    parseSerialResponse(message, updateLEDStatus, updateMotorStatus, updateLightBarrierStatus, addLog);
  }).catch((e) => console.error("Failed to listen for updateSerial:", e));
}

/**
 * Analisa a resposta serial recebida e atualiza a UI conforme necessário.
 * @param message - A mensagem recebida via serial.
 * @param updateLEDStatus - Função para atualizar o status do LED na UI.
 * @param updateMotorStatus - Função para atualizar o status do Motor na UI.
 * @param updateLightBarrierStatus - Função para atualizar o status da Light Barrier na UI.
 * @param addLog - Função para adicionar logs ao sistema de logs.
 */
export function parseSerialResponse(
  message: string,
  updateLEDStatus: (id: number, status: "ON" | "OFF", intensity?: number) => void,
  updateMotorStatus: (id: number, status: "ON" | "OFF", speed?: number, direction?: "CW" | "CCW") => void,
  updateLightBarrierStatus: (id: number, status: "OK" | "ERROR") => void,
  addLog: (message: string, type?: "error" | "success" | "info" | "warning") => void
) {
  const parts = message.split('|');

  if (parts[0] === 'ACK') {
    // Apenas logar o ACK
    addLog(`ACK Recebido: ${message}`, "info");
  } else if (parts[0] === 'LED') {
    const id = parseInt(parts[1]);
    const status = parts[2] as "ON" | "OFF";
    const intensity = parts[4] ? parseInt(parts[4]) : undefined;
    updateLEDStatus(id, status, intensity);
    addLog(`LED ${id} atualizado para ${status} com intensidade ${intensity}%`, "info");
  } else if (parts[0] === 'MOTOR') {
    const id = parseInt(parts[1]);
    const status = parts[2] as "ON" | "OFF";
    const speed = parts[4] ? parseInt(parts[4]) : undefined;
    const direction = parts[6] as "CW" | "CCW" || undefined;
    updateMotorStatus(id, status, speed, direction);
    addLog(`Motor ${id} atualizado para ${status} com velocidade ${speed} Hz e direção ${direction}`, "info");
  } else if (parts[0] === 'LIGHT_BARRIER') {
    const id = parseInt(parts[1]);
    const status = parts[2] as "OK" | "ERROR";
    updateLightBarrierStatus(id, status);
    addLog(`Light Barrier ${id} atualizado para ${status}`, "info");
  } else if (parts[0] === 'ERROR') {
    // Trata respostas de erro, se houver
    addLog(`Error from device: ${message}`, "error");
    toast.error(`Error from device: ${message}`);
  } else {
    console.warn(`Unknown serial message: ${message}`);
    addLog(`Mensagem desconhecida: ${message}`, "warning");
  }
}
/**
 * Envia o comando de Reset.
 */
export async function handleReset(): Promise<void> {
  const command = "RESET"; // Defina o comando conforme o backend espera
  const success = await sendFormattedCommand(command);
  if (!success) {
    throw new Error("Failed to send Reset command.");
  }
}

/**
 * Envia o comando de Production Mode.
 */
export async function handleProductionMode(): Promise<void> {
  const command = "PRODUCTION_MODE"; // Defina o comando conforme o backend espera
  const success = await sendFormattedCommand(command);
  if (!success) {
    throw new Error("Failed to send Production Mode command.");
  }
}

/**
 * Envia um comando para gravar os dados serial.
 */
export async function recordSerial(): Promise<void> {
  const command = "RECORD_SERIAL"; // Defina o comando conforme o backend espera
  const success = await sendFormattedCommand(command);
  if (!success) {
    throw new Error("Failed to send Record Serial command.");
  }
}

/**
 * Envia um comando para parar a gravação dos dados serial.
 */
export async function stopRecordSerial(): Promise<void> {
  const command = "STOP_RECORD_SERIAL"; // Defina o comando conforme o backend espera
  const success = await sendFormattedCommand(command);
  if (!success) {
    throw new Error("Failed to send Stop Record Serial command.");
  }
}

/**
 * Formata um comando para envio via serial.
 * @param parts - Array de partes do comando.
 * @returns Comando formatado.
 */
export function formatCommand(parts: string[]): string {
  return parts.join('|') + '\n';
}

/**
 * Envia um comando formatado via serial.
 * @param command - Comando a ser enviado.
 * @returns Sucesso ou falha do envio.
 */
export async function sendFormattedCommand(command: string): Promise<boolean> {
  try {
    await invoke("send_serial", { input: command });
    console.log(`Sent Command: ${command.trim()}`);
    toast.success(`Comando Enviado: ${command.trim()}`);
    return true;
  } catch (error) {
    console.error(`Failed to send command: ${command.trim()}`, error);
    toast.error(`Failed to send command: ${command.trim()}`);
    return false;
  }
}


function getBaudList() { 
  return [
    "300",
    "1200",
    "2400",
    "4800",
    "9600",
    "19200",
    "38400",
    "57600",
    "74880",
    "115200",
    "230400",
    "250000",
    "500000",
    "1000000",
    "2000000",
  ];
}

function getEnding() {
  return [
    "None",
    "\\n",
    "\\r",
    "\\n\\r"
  ]
}

function convertEnding(ending: string) {
  switch (ending) {
    case "None":
      return "";
    case "\\n":
      return "\n";
    case "\\r":
      return "\r";
    case "\\n\\r":
      return "\n\r";
    default:
      return ""; // Default to an empty string if the label is not recognized
  }
}

async function handleRecord(setIsRecording: any) {
  const res = await invoke("handle_start_record", {});
  setIsRecording(res);
}

async function handleSetFolder() {
  await invoke("set_folder_path", {});
}

async function sendError(input: String) {
  await invoke("emit_error", {input})
}

export { handleGetPorts, handleConnect, handleRecord, handleSetFolder, getBaudList, getEnding, sendError, setupSerialListeners } 