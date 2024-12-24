//src/lib/utils
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { LED, LightBarrier, Log, Motor, LightBarrierStatus } from "./types";


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Função handleSend (precisa dos parâmetros command e setCommand)
export const handleSend = (command: string, sendCommand: (cmd: string) => void, setCommand: (cmd: string) => void) => {
  const trimmedCommand = command.trim();
  if (trimmedCommand) {
    sendCommand(trimmedCommand);
    setCommand("");
  }
};



/**
 * Retorna uma nova lista de logs com a mensagem adicionada.
 * @param logs - A lista atual de logs.
 * @param message - A mensagem do log.
 * @param type - Tipo do log: "error" | "success" | "info" | "warning".
 */
export const addLog = (
  setLogs: React.Dispatch<React.SetStateAction<Log[]>>,
  message: string,
  type: "error" | "success" | "info" | "warning" = "info"
): void => {
  setLogs((prevLogs) => [
    ...prevLogs,
    {
      message: `[${new Date().toLocaleTimeString()}] ${message}`,
      type,
      timestamp: new Date().toISOString(), // Adicionando timestamp
    },
  ]);
};



export const addLogs = (
  setLogs: React.Dispatch<React.SetStateAction<Log[]>>,
  message: string,
  type: "error" | "success" | "info" | "warning" = "info"
): void => {
  setLogs((prevLogs) => [
    ...prevLogs,
    {
      message: `[${new Date().toLocaleTimeString()}] ${message}`,
      type,
      timestamp: new Date().toISOString(), // Adicionando timestamp
    },
  ]);
};

/**
 * Deleta um log específico e retorna a nova lista de logs.
 * @param logs - Lista atual de logs.
 * @param index - Índice do log a ser deletado.
 * @returns Nova lista de logs sem o item deletado.
 */
export function utilDeleteLog(logs: Log[], index: number): Log[] {
  return logs.filter((_, i) => i !== index);
}


/**
 * Retorna uma nova lista de logs com a mensagem adicionada.
 * @param logs - A lista atual de logs.
 * @param message - A mensagem do log.
 * @param type - Tipo do log: "error" | "success" | "info" | "warning".
 * @returns Novo array de logs com a mensagem adicionada.
 */
/**
 * Retorna uma nova lista de logs com a mensagem formatada localmente.
 * @param logs - Lista atual de logs.
 * @param message - Mensagem enviada do backend.
 * @param type - Tipo de log: "error" | "success" | "info" | "warning".
 */
/**
 * Retorna uma nova lista de logs com a mensagem formatada localmente.
 * @param logs - Lista atual de logs.
 * @param message - Mensagem enviada do backend.
 * @param type - Tipo de log: "error" | "success" | "info" | "warning".
 */
export const utilAddLog = (
  logs: Log[],
  message: string,
  type: "error" | "success" | "info" | "warning" = "info"
): Log[] => {
  const logColor = getLogColor(type);
  const timestamp = new Date().toLocaleString(); // Data e horário local
  return [
    {
      message: `[${timestamp}] [${type.toUpperCase()}] ${message}`, // Inclui tipo no log
      type,
      color: logColor,
      timestamp: new Date().toISOString(), // Mantém o timestamp ISO para filtros
    },
    ...logs, // Coloca os logs antigos abaixo do novo log
  ];
};



export const getLogColor = (type: "error" | "success" | "info" | "warning") => ({
  error: "text-red-500",   // Aplicando a cor do texto como vermelho
  success: "text-green-500",
  info: "text-purple-400",
  warning: "text-yellow-500",
}[type] || "text-purple-400");  // Valor padrão se o tipo não for reconhecido



export const initialMotors: Motor[] = [
  { id: 2, status: "OFF", speed: 0, direction: "CW", lastChanged: "No Info" },
  { id: 3, status: "OFF", speed: 0, direction: "CW", lastChanged: "No Info" },
  { id: 4, status: "OFF", speed: 0, direction: "CW", lastChanged: "No Info" },
];

// Estado Inicial das Light Barriers
export const initialLightBarriers = [
  { id: 1, status: LightBarrierStatus.INACTIVE, lastChanged: "No Info" },
  { id: 2, status: LightBarrierStatus.INACTIVE, lastChanged: "No Info" },
  { id: 3, status: LightBarrierStatus.INACTIVE, lastChanged: "No Info" },
  { id: 4, status: LightBarrierStatus.INACTIVE, lastChanged: "No Info" },
];



export const initialLeds: LED[] = [
  { id: 1, status: "OFF", intensity: 0, lastChanged: "No Info" },
  { id: 2, status: "OFF", intensity: 0, lastChanged: "No Info" },
  { id: 3, status: "OFF", intensity: 0, lastChanged: "No Info" },
  { id: 4, status: "OFF", intensity: 0, lastChanged: "No Info" },
];

/**
 * Deleta um log específico.
 * @param setLogs - Função de atualização do estado de logs.
 * @param index - Índice do log a ser deletado.
 */
export function deleteLog(
  setLogs: React.Dispatch<React.SetStateAction<Log[]>>,
  index: number
) {
  setLogs((prevLogs) => prevLogs.filter((_, i) => i !== index));
  console.log(`Log deletado no índice: ${index}`);
}

/**
 * Função que retorna uma função para limpar os logs.
 */
export const clearLogs = (setLogs: React.Dispatch<React.SetStateAction<Log[]>>) => () => {
  setLogs([]); 
  console.log("Todos os logs foram limpos.");
};

// Função para copiar logs para a área de transferência
export const copyLogs = (logs: { message: string }[], log?: string) => {
  const content = log ?? logs.map((l) => l.message).join("\n");
  navigator.clipboard.writeText(content);
  console.log("Logs copiados para a área de transferência!");
};