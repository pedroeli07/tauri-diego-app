// src/utils/serial.ts
import { invoke } from "@tauri-apps/api/tauri";
import { listen } from "@tauri-apps/api/event";
import { toast } from "@/components/Toast"; // Certifique-se de que o caminho está correto
import { LightBarrierStatus } from "@/lib/types";

/**
 * Obtém a lista de portas disponíveis e atualiza o estado no frontend.
 * @param setPorts - Função para atualizar a lista de portas.
 */
export async function handleGetPorts(setPorts: React.Dispatch<React.SetStateAction<string[]>>) {
  try {
    const ports = await invoke<string[]>("get_ports", {});
    setPorts(ports);
    toast.success("Ports obtained successfully!");
  } catch (error) {
    console.error("Error obtaining ports:", error);
    toast.error("Error obtaining ports.");
  }
}

/**
 * Conecta à porta serial escolhida.
 * @param port - Porta selecionada.
 * @param baud - Baud rate selecionado.
 * @param ending - Tipo de terminação.
 * @param setIsConnected - Função para atualizar o estado de conexão.
 */
export async function handleConnect(
  port: string,
  baud: string,
  setIsConnected: React.Dispatch<React.SetStateAction<boolean>>
): Promise<boolean> {
  try {
    // Configurar a porta e o baud no backend
    await invoke("set_port_items", { port, baud });

    // Tentar conectar à porta
    const isConnected = await invoke<boolean>("handle_serial_connect", {});

    if (isConnected) {
      toast.success(`Connected to port ${port} with baud ${baud}`);
      setIsConnected(true);
    } else {
      toast.error(`Failed to connect to port ${port}.`);
      setIsConnected(false);
    }

    return isConnected;
  } catch (error: any) {
    // Verifica se o erro retornado é uma string do backend
    if (typeof error === "string") {
      toast.error(error);
    } else {
      toast.error("Unexpected error occurred while connecting.");
    }
    console.error("Error connecting:", error);
    setIsConnected(false);
    return false;
  }
}


/**
 * Desconecta da porta serial.
 * @param setIsConnected - Função para atualizar o estado de conexão no frontend.
 */
export async function handleDisconnect(setIsConnected: React.Dispatch<React.SetStateAction<boolean>>): Promise<boolean> {
  try {
    const disconnected = await invoke<boolean>("handle_serial_disconnect");
    if (disconnected) {
      toast.success("Disconnected successfully.");
      setIsConnected(false);
    } else {
      toast.warning("No port connected to disconnect.");
    }
    return disconnected;
  } catch (error) {
    console.error("Error disconnecting:", error);
    toast.error("Error disconnecting from the port.");
    return false;
  }
}

/**
 * Formats and logs a detailed explanation of the binary message.
 * @param data - Binary message array.
 */
/**
 * Formats and logs a detailed explanation of the binary message.
 * @param data - Binary message array.
 */
function logDetailedBinaryMessage(data: number[], addLog: (message: string, type?: "error" | "success" | "info" | "warning") => void) {
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
    case 10:
      description = `SOME_OTHER_COMMAND -> ID: ${hardwareId}, VALUE: ${
        value === 1 ? "ACTIVE" : "INACTIVE"
      }`;
      break;
    case 20:
      description = `TOGGLE_LIGHT_BARRIER -> ID: ${hardwareId}, VALUE: ${
        value === 1 ? "ACTIVE" : "INACTIVE"
      }`;
      break;
    default:
      description = `UNKNOWN_COMMAND -> ID: ${hardwareId}, VALUE: ${value}`;
  }

  addLog(`[CMD:${commandId}] [${data.join(", ")}] -> ${description}`, "info");
}

/**
 * Parses the received binary data and logs detailed information.
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
  updateLightBarrierStatus: (id: number, status: LightBarrierStatus) => void,
  addLog: (message: string, type?: "error" | "success" | "info" | "warning") => void
) {
  if (data.length < 7) {
    addLog("Invalid data received (less than 7 bytes).", "error");
    return;
  }

  logDetailedBinaryMessage(data, addLog);

  const commandId = data[0];
  const hardwareId = data[1];
  const value = data[2] | (data[3] << 8) | (data[4] << 16) | (data[5] << 24);

  switch (commandId) {
    case 7:
      const ledStatus = value === 1 ? "ON" : "OFF";
      updateLEDStatus(hardwareId, ledStatus);
      break;
    case 8:
      updateLEDStatus(hardwareId, "ON", value);
      break;
    case 3:
      const motorState = value === 1 ? "ON" : "OFF";
      updateMotorStatus(hardwareId, motorState);
      break;
    case 2:
      updateMotorStatus(hardwareId, "ON", value);
      break;
    case 1:
      const direction = value === 0 ? "CW" : "CCW";
      updateMotorStatus(hardwareId, "ON", undefined, direction);
      break;
    case 10:
      // Se 'command_id=10' não está mais sendo usado para Light Barriers, remova este caso
      // ou ajuste conforme necessário para outra funcionalidade.
      // Exemplo: Se 'command_id=10' agora é para outra coisa, mapeie corretamente.
      const someOtherStatus = value === 1 ? "ACTIVE" : "INACTIVE";
      // Atualize conforme a sua necessidade
      break;
    case 20:
      // Novo caso para Light Barriers
      const lbStatus = value === 1 ? LightBarrierStatus.ACTIVE : LightBarrierStatus.INACTIVE;
      updateLightBarrierStatus(hardwareId, lbStatus);
      break;
    default:
      addLog(`[CMD:${commandId}] Unknown command received.`, "warning");
  }
}





/**
 * Parses the received binary data and updates the UI accordingly.
 */
export function parseBinaryResponseeee(
  data: number[],
  updateLEDStatus: (id: number, status: "ON" | "OFF", intensity?: number) => void,
  updateMotorStatus: (
    id: number,
    status: "ON" | "OFF",
    speed?: number,
    direction?: "CW" | "CCW"
  ) => void,
  updateLightBarrierStatus: (id: number, status: LightBarrierStatus) => void, // Aqui, usa o enum
  addLog: (message: string, type?: "error" | "success" | "info" | "warning") => void
) {
  if (data.length < 7) {
    addLog("Invalid data received (less than 7 bytes).", "error");
    return;
  }

  const command_id = data[0];
  const hardware_id = data[1];
  const value = data[2] | (data[3] << 8) | (data[4] << 16) | (data[5] << 24);

  // Validação do hardware_id
  if (hardware_id < 1 || hardware_id > 10) { // Ajuste conforme o intervalo esperado
    addLog(`[CMD:${command_id}] Invalid hardware_id=${hardware_id}. Ignoring command.`, "warning");
    return;
  }

  addLog(`[CMD:${command_id}] HW:${hardware_id} -> Parsing value=${value}.`, "info");

  switch (command_id) {
    case 7: // LED ON/OFF
      const ledStatus = value === 1 ? "ON" : "OFF";
      updateLEDStatus(hardware_id, ledStatus, ledStatus === "ON" ? 100 : 0);
      addLog(`[CMD:${command_id}] LED ${hardware_id} updated to ${ledStatus}.`, "info");
      break;
    case 8: // LED Intensity
      const intensity = value & 0xffff;
      updateLEDStatus(hardware_id, "ON", intensity);
      addLog(`[CMD:${command_id}] LED ${hardware_id} intensity adjusted to ${intensity}%.`, "info");
      break;
    case 9: // Combined LED Update
      const ledCombinedStatus = (value & 0xffff) === 1 ? "ON" : "OFF";
      const intensityValue = (value >> 16) & 0xffff;
      updateLEDStatus(hardware_id, ledCombinedStatus, intensityValue);
      addLog(
        `[CMD:${command_id}] LED ${hardware_id} updated to ${ledCombinedStatus} with intensity ${intensityValue}%.`,
        "info"
      );
      break;
    case 3: // Motor State
      const motorState = value === 1 ? "ON" : "OFF";
      updateMotorStatus(hardware_id, motorState, 0, "CW");
      addLog(`[CMD:${command_id}] Motor ${hardware_id} updated to ${motorState}.`, "info");
      break;
    case 2: // Motor Speed
      updateMotorStatus(hardware_id, "ON", value, "CW");
      addLog(`[CMD:${command_id}] Motor ${hardware_id} speed adjusted to ${value} Hz.`, "info");
      break;
    case 1: // Motor Direction
      const direction = value === 0 ? "CW" : "CCW";
      updateMotorStatus(hardware_id, "ON", undefined, direction);
      addLog(`[CMD:${command_id}] Motor ${hardware_id} direction adjusted to ${direction}.`, "info");
      break;
      case 10: // Light Barrier Update
      const lbStatus = value === 1 ? LightBarrierStatus.ACTIVE : LightBarrierStatus.INACTIVE;
      updateLightBarrierStatus(hardware_id, lbStatus);
      addLog(`[CMD:${command_id}] Light Barrier ${hardware_id} updated to ${lbStatus}.`, "info");
      break;
    default:
      addLog(`[CMD:${command_id}] Unknown command received.`, "warning");
      break;
  }
}


/**
 * Analisa a resposta serial recebida e atualiza a UI conforme necessário.
 */
/**
 * Parses the received serial message and updates the UI as necessary.
 */
/**
 * Parses the received serial message and updates the UI as necessary.
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
    addLog(`ACK Received: ${message}`, "info");
  } else if (parts[0] === 'LED') {
    const id = parseInt(parts[1]);
    const status = parts[2] as "ON" | "OFF";
    const intensity = parts[4] ? parseInt(parts[4]) : undefined;
    updateLEDStatus(id, status, intensity);
    addLog(`LED ${id} updated to ${status} with intensity ${intensity}%`, "info");
  } else if (parts[0] === 'MOTOR') {
    const id = parseInt(parts[1]);
    const status = parts[2] as "ON" | "OFF";
    const speed = parts[4] ? parseInt(parts[4]) : undefined;
    const direction = (parts[6] as "CW" | "CCW") || undefined;
    updateMotorStatus(id, status, speed, direction);
    addLog(`Motor ${id} updated to ${status} with speed ${speed} Hz and direction ${direction}`, "info");
  } else if (parts[0] === 'LIGHT_BARRIER') {
    const id = parseInt(parts[1]);
    const status = parts[2] as "OK" | "ERROR";
    updateLightBarrierStatus(id, status);
    addLog(`Light Barrier ${id} updated to ${status}`, "info");
  } else if (parts[0] === 'ERROR') {
    addLog(`Device Error: ${message}`, "error");
    toast.error(`Device Error: ${message}`);
  } else {
    console.warn(`Unknown serial message: ${message}`);
    addLog(`Unknown message: ${message}`, "warning");
  }
}



/**
 * Cria um payload binário no formato esperado.
 * @param commandId - ID do comando.
 * @param hardwareId - ID do hardware alvo.
 * @param value - Valor do comando.
 * @returns Um array de números representando o payload binário.
 */
function createBinaryPayload(commandId: number, hardwareId: number, value: number): Uint8Array {
  const payload = new Uint8Array(7);
  payload[0] = commandId; // Comando
  payload[1] = hardwareId; // ID do hardware
  payload[2] = value & 0xFF; // Byte menos significativo
  payload[3] = (value >> 8) & 0xFF; // Segundo byte
  payload[4] = (value >> 16) & 0xFF; // Terceiro byte
  payload[5] = (value >> 24) & 0xFF; // Byte mais significativo
  payload[6] = 0x0A; // Caractere de fim (newline, por exemplo)
  return payload;
}



/**
 * Formata um comando string (antiga função), mantida para comandos que não foram migrados para binário.
 */
export function formatStringCommand(parts: string[]): string {
  return parts.join('|') + '\n';
}


/**
 * Lista de baud rates disponíveis.
 */
export function getBaudList(): string[] { 
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

/**
 * Lista de terminações disponíveis.
 */
export function getEnding(): string[] {
  return [
    "None",
    "\\n",
    "\\r",
    "\\n\\r"
  ];
}

/**
 * Converte o rótulo da terminação em um caractere real.
 */
function convertEnding(ending: string): string {
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
      return "";
  }
}

/**
 * Starts recording (calls the corresponding Rust function).
 */
export async function handleRecord(setIsRecording: React.Dispatch<React.SetStateAction<boolean>>): Promise<void> {
  try {
    const res = await invoke<boolean>("handle_start_record", {});
    setIsRecording(res);
    if (res) {
      toast.success("Recording started.");
    } else {
      toast.error("Failed to start recording.");
    }
  } catch (error) {
    console.error("Error starting recording:", error);
    toast.error("Error starting recording.");
  }
}

/**
 * Sets the output folder for recording.
 */
export async function handleSetFolder(): Promise<void> {
  try {
    await invoke("set_folder_path", {});
    toast.success("Output folder set successfully.");
  } catch (error) {
    console.error("Error setting output folder:", error);
    toast.error("Error setting output folder.");
  }
}

/**
 * Sends a test error command.
 */
export async function sendError(input: string): Promise<void> {
  try {
    await invoke("emit_error", { input });
    toast.info("Error command sent for testing.");
  } catch (error) {
    console.error("Error sending error command:", error);
    toast.error("Error sending error command.");
  }
}

