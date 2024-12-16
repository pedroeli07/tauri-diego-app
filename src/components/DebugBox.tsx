// src/components/DebugBox.tsx

import React, { useState } from "react";
import { Copy, Trash2, Download, X } from "lucide-react";
import jsPDF from "jspdf";
import * as XLSX from "xlsx";
import { saveAs } from 'file-saver';
import { Log } from "@/lib/types";


interface DebugBoxProps {
  logs: Log[];
  clearLogs: () => void;
  deleteLog: (index: number) => void;
  sendCommand: (command: string) => void;
}

// Modal Component para Opções de Exportação
const ExportModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  exportLogs: (format: string) => void;
}> = ({ isOpen, onClose, exportLogs }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed z-10 inset-0 flex items-center justify-center bg-black bg-opacity-30">
      <div className="bg-gray-800 rounded-lg max-w-md mx-auto p-6 relative">
        <button onClick={onClose} aria-label="Close modal" className="absolute top-3 right-3 text-white">
          <X className="w-5 h-5" />
        </button>
        <h2 className="text-xl font-bold text-white mb-4">Exportar Logs</h2>
        <div className="flex flex-col gap-3">
          {["csv", "pdf", "excel"].map((format) => (
            <button
              key={format}
              onClick={() => { exportLogs(format); onClose(); }}
              className={`flex items-center gap-2 bg-${
                format === "csv" ? "blue" : format === "pdf" ? "red" : "green"
              }-600 hover:bg-${
                format === "csv" ? "blue" : format === "pdf" ? "red" : "green"
              }-700 text-white px-4 py-2 rounded-md`}
            >
              <Download className="w-4 h-4" /> Exportar como {format.toUpperCase()}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

const DebugBox: React.FC<DebugBoxProps> = ({
  logs,
  clearLogs,
  deleteLog,
  sendCommand,
}) => {
  const [command, setCommand] = useState("");
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);

  const handleSend = () => {
    const trimmedCommand = command.trim();
    if (trimmedCommand) {
      sendCommand(trimmedCommand);
      setCommand("");
    }
  };

  const getLogColor = (type: Log["type"]) => ({
    error: "text-red-500",
    success: "text-green-500",
    info: "text-blue-300",
    warning: "text-yellow-500", // add a default value for warning
  }[type] || "text-blue-300");

  const copyLogs = (log?: string) => {
    navigator.clipboard.writeText(log ? log : logs.map(l => l.message).join("\n"));
  };

  const exportLogs = (format: string) => {
    const allLogs = logs.map(log => log.message).join("\n");
    if (format === "csv") {
      const blob = new Blob([allLogs], { type: "text/csv;charset=utf-8;" });
      saveAs(blob, "logs.csv");
    } else if (format === "pdf") {
      const doc = new jsPDF();
      doc.text(allLogs, 10, 10);
      doc.save("logs.pdf");
    } else if (format === "excel") {
      const worksheet = XLSX.utils.aoa_to_sheet(logs.map(log => [log.message]));
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Logs");
      const wbout = XLSX.write(workbook, { type: "array", bookType: "xlsx" });
      const blob = new Blob([wbout], { type: "application/octet-stream" });
      saveAs(blob, "logs.xlsx");
    }
  };

  return (
    <div className="flex flex-col bg-gray-800 rounded-lg shadow-xl p-6 max-h-[680px]">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl text-white font-bold">Debug Box</h2>
        <div className="flex gap-2">
          <button
            onClick={clearLogs}
            className="flex items-center gap-1 bg-gray-700 hover:bg-red-700 text-white px-3 py-2 rounded-md transition-colors"
            title="Limpar todos os logs"
          >
            <Trash2 className="w-4 h-4" /> 
          </button>
          <button
            onClick={() => copyLogs()}
            className="flex items-center gap-1 bg-gray-700 hover:bg-blue-700 text-white px-3 py-2 rounded-md transition-colors"
            title="Copiar todos os logs"
          >
            <Copy className="w-4 h-4" /> 
          </button>
          <button
            onClick={() => setIsExportModalOpen(true)}
            className="flex items-center gap-1 bg-gray-700 hover:bg-green-700 text-white px-3 py-2 rounded-md transition-colors"
            title="Exportar logs"
          >
            <Download className="w-4 h-4" /> 
          </button>
        </div>
      </div>

      {/* Logs Display */}
      <div className="flex-1 overflow-y-auto bg-gray-700 p-4 rounded-md mb-4">
        {logs.length === 0 ? (
          <p className="text-gray-400 text-center">No Logs Available</p>
        ) : (
          logs.map((log, index) => (
            <div
              key={index}
              className="flex justify-between items-center mb-3 p-3 bg-gray-600 rounded-md hover:bg-gray-500 transition-colors"
            >
              <span className={`text-sm ${getLogColor(log.type)} flex items-center gap-2`}>
                <span className={`w-2 h-2 rounded-full ${
                  log.type === "error" ? "bg-red-500" :
                  log.type === "success" ? "bg-green-500" :
                  "bg-blue-500"
                }`}></span>
                {log.message}
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => copyLogs(log.message)}
                  className="bg-gray-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md text-sm transition-colors"
                  aria-label="Copiar log"
                  title="Copiar log"
                >
                  <Copy className="w-4 h-4" />
                </button>
                <button
                  onClick={() => deleteLog(index)}
                  className="bg-gray-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm transition-colors"
                  aria-label="Deletar log"
                  title="Deletar log"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Command Input */}
      <div className="flex gap-2">
        <input
          type="text"
          value={command}
          onChange={(e) => setCommand(e.target.value)}
          placeholder="Digite um comando"
          className="flex-1 px-4 py-2 rounded-md bg-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button
          onClick={handleSend}
          className="flex items-center justify-center px-6 py-2 bg-gray-600 hover:bg-blue-500 text-white rounded-md transition-colors"
          title="Enviar comando"
        >
          Send
        </button>
      </div>

      {/* Export Modal */}
      <ExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        exportLogs={exportLogs}
      />
    </div>
  );
};

export default DebugBox;
