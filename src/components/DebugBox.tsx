// src/components/DebugBox.tsx
import React, { useState, useMemo, useEffect, useCallback } from "react";

import { Trash2, Copy, Download } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import clsx from "clsx";
import { Log } from "@/lib/types";
import { Input } from "@/components/ui/input";
import { Select, SelectItem, SelectContent, SelectTrigger, SelectValue } from "@/components/ui/select";
import TimeRangePicker from "./TimeRangePicker";
import DateRangePicker from "./DateRangePicker";
import { toast } from "./Toast";

interface DebugBoxProps {
  logs: Log[];
  setLogs: React.Dispatch<React.SetStateAction<Log[]>>;
  copyLogs: (logs: Log[]) => void;
  handleAddLog: (message: string, type: Log["type"]) => void;
  handleExport: (format: "csv" | "pdf" | "excel") => Promise<void>;
}

const DebugBox: React.FC<DebugBoxProps> = ({
  logs,
  setLogs,
  copyLogs,
  handleAddLog,
  handleExport,
}) => {
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);

  // Estados para filtros
  const [selectedLogType, setSelectedLogType] = useState<string>("All");
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Estados para data/hora inicial e final
  const [dateRange, setDateRange] = useState<{start: Date|null, end:Date|null}>({start:null,end:null});
  const [timeRange, setTimeRange] = useState<{start: Date|null, end:Date|null}>({start:null,end:null});

  const getTimestamp = (date: Date|null) => date ? date.getTime() : null;
  const startDateTs = getTimestamp(dateRange.start);
  const endDateTs = getTimestamp(dateRange.end);


    // Remover logs duplicados ao carregar
    useEffect(() => {
      const uniqueLogs = logs.filter(
        (log, index, self) =>
          index === self.findIndex((l) => l.message === log.message && l.type === log.type)
      );
      if (uniqueLogs.length !== logs.length) {
        setLogs(uniqueLogs);
      }
    }, [logs, setLogs]);

  // Para o time range, consideramos apenas a comparação de horário. Uma forma simples é normalizar a data:
  const toTimeOnlyTs = (date: Date | null) => {
    if (!date) return null;
    return date.getHours() * 3600 + date.getMinutes() * 60 + date.getSeconds();
  };
  const startTimeTs = toTimeOnlyTs(timeRange.start);
  const endTimeTs = toTimeOnlyTs(timeRange.end);

  const filteredLogs = useMemo(() => {
    return logs.filter((log) => {
      const logDate = new Date(log.timestamp);
      if (isNaN(logDate.getTime())) return false;
      const logTs = logDate.getTime();

      if (selectedLogType !== "All" && log.type !== selectedLogType.toLowerCase()) {
        return false;
      }

      if (searchTerm && !log.message.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }

      if (startDateTs && logTs < startDateTs) return false;
      if (endDateTs && logTs > endDateTs) return false;

      const logTimeTs =
        logDate.getHours() * 3600 + logDate.getMinutes() * 60 + logDate.getSeconds();
      if (startTimeTs !== null && logTimeTs < startTimeTs) return false;
      if (endTimeTs !== null && logTimeTs > endTimeTs) return false;

      return true;
    });
  }, [logs, selectedLogType, searchTerm, startDateTs, endDateTs, startTimeTs, endTimeTs]);

  const addUniqueLog = useCallback(
    (message: string, type: Log["type"]) => {
      if (logs.length > 0 && logs[0].message === message && logs[0].type === type) {
        return;
      }
      setLogs((prevLogs) => [
        { message, type, timestamp: new Date().toISOString() },
        ...prevLogs,
      ]);
    },
    [logs, setLogs]
  );

  const clearFilters = () => {
    setSelectedLogType("All");
    setSearchTerm("");
    setDateRange({ start: null, end: null });
    setTimeRange({ start: null, end: null });
  };

  return (
    <div className="absolute top-0 right-4 flex flex-col w-[32%] h-full max-h-[750px] mt-48">
      {/* Debug Box */}
      <Card className="w-full h-full bg-gradient-to-b from-[#1c1c1c] via-[#0a0a0a] to-[#0a0a0a] rounded-lg border-double border-4  border-gray-900 shadow-lg p-4 text-gray-300 flex flex-col">
        <CardContent className="p-4 flex-1 flex flex-col overflow-hidden">
        {/* Header com Botões de Controle */}
        <div className="flex justify-between items-center mb-4">
  <h2 className="text-xl font-bold text-gray-300">Debug Box</h2>
  <div className="flex space-x-3">
    {/* Botão Limpar Logs */}
    <button
    onClick={() => {
      setLogs([]);
      addUniqueLog("Logs cleared.", "info");
      toast.success("Logs have been cleared.");
    }}
    className="p-2 bg-[#0f0f0f] border-2 active:scale-75 border-gray-700 text-gray-300 rounded-md flex items-center shadow-md hover:shadow-red-400 hover:bg-red-600 transition-all duration-300"
    title="Clear all logs"
    aria-label="Clear logs"
  >
    <Trash2 className="w-5 h-5 text-red-400" />
    <span className="hidden 2xl:inline ml-2  text-xs lg:text-sm">Clear</span>
  </button>

  {/* Botão Copiar Logs */}
  <button
    onClick={() => {
      copyLogs(filteredLogs);
      toast.success("Logs copied to clipboard.");
    }}
    className="p-2 bg-[#0f0f0f] border-2 active:scale-75 border-gray-700 text-gray-300 rounded-md flex items-center shadow-md hover:shadow-blue-400 hover:bg-blue-600 transition-all duration-300"
    title="Copy filtered logs"
    aria-label="Copy logs"
  >
    <Copy className="w-5 h-5 text-blue-400" />
    <span className="hidden 2xl:inline ml-2  text-xs lg:text-sm">Copy</span>
  </button>

  {/* Botão Abrir Modal de Exportação */}
  <button
    onClick={() => setIsExportModalOpen(true)}
    className="p-2 bg-[#0f0f0f] border-2 active:scale-75 border-gray-700 text-gray-300 rounded-md flex items-center shadow-md hover:shadow-green-400 hover:bg-green-600 transition-all duration-300"
    title="Export logs"
    aria-label="Export logs"
  >
    <Download className="w-5 h-5 text-green-400" />
    <span className="hidden 2xl:inline ml-2 text-xs lg:text-sm">Download</span>
  </button>
  </div>
</div>


          {/* Primeira linha de filtros: Search e Log Type */}
          <div className="flex flex-col md:flex-row mb-4 gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-400 mb-1" htmlFor="search-input">
                Search
              </label>
              <Input
                id="search-input"
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search logs..."
                className="bg-gray-900 border border-gray-900 text-white"
              />
            </div>
            <div className="w-full md:w-1/4">
              <label className="block text-sm font-medium text-gray-400 mb-1" htmlFor="log-type-select">
                Log Type
              </label>
              <Select value={selectedLogType} onValueChange={(v) => setSelectedLogType(v)}>
                <SelectTrigger className="bg-gray-800 text-white border border-gray-900">
                  <SelectValue placeholder="All" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 text-white">
                  <SelectItem value="All">All</SelectItem>
                  <SelectItem value="Error">Error</SelectItem>
                  <SelectItem value="Success">Success</SelectItem>
                  <SelectItem value="Info">Info</SelectItem>
                  <SelectItem value="Warning">Warning</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Segunda linha de filtros: Date Range, Time Range, Clear Filters
          <div className="flex flex-col md:flex-row gap-4 mb-4 items-end">
            {/* Date Range Picker
            <div className="flex-1 flex flex-col">
              <span className="block text-sm font-medium text-gray-400 mb-1">Date Range</span>
              <DateRangePicker value={dateRange} onChange={setDateRange} />
            </div>
        

 
            <div className="flex-1 flex flex-col">
              <span className="block text-sm font-medium text-gray-400 mb-1">Time Range</span>
              <TimeRangePicker value={timeRange} onChange={setTimeRange} />
            </div>

       
            <div>
              <Button variant="outline" className="bg-red-800 text-gray-100 border border-gray-900 hover:bg-red-900" onClick={clearFilters}>
                Clear Filter
              </Button>
            </div>
          </div>
          */}

         
{/* Lista de Logs */}
<div className="flex-1 overflow-y-auto mt-2 bg-gradient-to-b from-[#1c1c1c] via-[#0a0a0a] to-[#1a1a1a] rounded-lg border-double border custom-scrollbar border-gray-800">
{filteredLogs.length === 0 ? (
  <p className="text-center text-gray-500">No logs available</p>
) : (
  filteredLogs.map((log, index) => (
    <div
      key={index}
      className="flex items-center justify-between py-1 px-4 bg-gradient-to-b from-[#1c1c1c] via-[#0a0a0a] to-[#1a1a1a] rounded-md border border-gray-800 transition-all hover:bg-gray-900
       hover:border-gray-600 hover:bg-gradient-to-b hover:from-[#222222] hover:via-[#1b1b1b] hover:to-[#222222]"
    >
      <span className="flex-1 flex items-center space-x-3 text-sm">
        <span
          className={`w-2 h-2 rounded-full ${
            log.type === "error"
              ? "bg-red-400"
              : log.type === "success"
              ? "bg-green-400"
              : log.type === "info"
              ? "bg-blue-400"
              : "bg-gray-400"
          }`}
        ></span>
        <span
          className={`${
            log.type === "error"
              ? "text-red-400"
              : log.type === "success"
              ? "text-green-400"
              : log.type === "info"
              ? "text-blue-400"
              : "text-gray-300"
          }`}
        >
          {log.message}
        </span>
      </span>
      <button
        onClick={() => {
          setLogs((prevLogs) => prevLogs.filter((_, i) => i !== index));
        }}
        className="p-2 rounded-md hover:bg-red-500 hover:text-white transition-all"
        title="Delete log"
      >
        <Trash2 className="w-4 h-4 text-gray-300" />
      </button>
    </div>
    ))
  )}
</div>
        </CardContent>
      </Card>

      {/* Modal de Exportação de Logs */}
      <Dialog open={isExportModalOpen} onOpenChange={setIsExportModalOpen}>
        <DialogContent className="justify-start items-start bg-black border border-gray-800 text-white rounded-lg w-[400px] p-4">
          <DialogHeader>
            <DialogTitle>Export Logs</DialogTitle>
            <DialogDescription>
              Choose the format to export logs.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex justify-center space-x-4 mt-4">
            <Button
              onClick={() => {
                handleExport("csv");
                setIsExportModalOpen(false);
              }}
              className="bg-gray-700 hover:bg-gray-600 text-white"
            >
              CSV
            </Button>
             {/* 
            <Button
              onClick={() => {
                handleExport("pdf");
                setIsExportModalOpen(false);
              }}
              className="bg-red-700 hover:bg-red-600 text-white"
            >
              PDF
            </Button>
             */}
            <Button
              onClick={() => {
                handleExport("excel");
                setIsExportModalOpen(false);
              }}
              className="bg-green-700 hover:bg-green-600 text-white"
            >
              XLSX
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DebugBox;
