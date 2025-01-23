// src/components/DebugBox.tsx
import React, { useState, useMemo, useEffect } from "react";

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
import { Log } from "@/lib/types";
import { Input } from "@/components/ui/input";
import { Select, SelectItem, SelectContent, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "./Toast";

interface DebugBoxProps {
  logs: Log[];
  setLogs: React.Dispatch<React.SetStateAction<Log[]>>;
  copyLogs: (logs: Log[]) => void;
  handleAddLog: (message: string, type: Log["type"]) => void;
  handleExport: (format: "csv" | "excel") => Promise<void>;
}

const DebugBox: React.FC<DebugBoxProps> = ({
  logs,
  setLogs,
  copyLogs,
  handleAddLog,
  handleExport,
}) => {
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [selectedLogType, setSelectedLogType] = useState<string>("All");
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Remover logs duplicados
  useEffect(() => {
    const uniqueLogs = logs.filter(
      (log, index, self) =>
        index === self.findIndex((l) => l.message === log.message && l.type === log.type)
    );
    if (uniqueLogs.length !== logs.length) {
      setLogs(uniqueLogs);
    }
  }, [logs, setLogs]);

  // Filtrar logs
  const filteredLogs = useMemo(() => {
    return logs.filter((log) => {
      if (selectedLogType !== "All" && log.type !== selectedLogType.toLowerCase()) {
        return false;
      }
      if (searchTerm && !log.message.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }
      return true;
    });
  }, [logs, selectedLogType, searchTerm]);

  const handleClearLogs = () => {
    setLogs([]);
    toast.success("Logs have been cleared.");
  };

  const handleCopyLogs = () => {
    copyLogs(filteredLogs);
    toast.success("Logs copied to clipboard.");
  };

  const LogTypeIndicator = ({ type }: { type: string }) => {
    const colors = {
      error: "bg-red-400",
      success: "bg-green-400",
      info: "bg-blue-400",
      warning: "bg-yellow-400",
    };
    return <span className={`w-2 h-2 rounded-full ${colors[type] || "bg-gray-400"}`} />;
  };

  return (
    <div className="absolute top-0 right-4 flex flex-col w-[32%] h-full max-h-[750px] mt-48">
      <Card className="w-full h-full bg-gradient-to-b from-[#1c1c1c] to-[#0a0a0a] rounded-lg border-double border-4 border-gray-900 shadow-lg p-4 text-gray-300">
        <CardContent className="p-4 flex-1 flex flex-col overflow-hidden">
          {/* Header Controls */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Debug Box</h2>
            <div className="flex space-x-3">
              <Button
                onClick={handleClearLogs}
                className="bg-[#0f0f0f] hover:bg-red-600"
                title="Clear logs"
              >
                <Trash2 className="w-5 h-5" />
              </Button>
              <Button
                onClick={handleCopyLogs}
                className="bg-[#0f0f0f] hover:bg-blue-600"
                title="Copy logs"
              >
                <Copy className="w-5 h-5" />
              </Button>
              <Button
                onClick={() => setIsExportModalOpen(true)}
                className="bg-[#0f0f0f] hover:bg-green-600"
                title="Export logs"
              >
                <Download className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Filters */}
          <div className="flex gap-4 mb-4">
            <Input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search logs..."
              className="flex-1 bg-gray-900 border-gray-900"
            />
            <Select value={selectedLogType} onValueChange={setSelectedLogType}>
              <SelectTrigger className="w-32 bg-gray-800 border-gray-900">
                <SelectValue placeholder="All" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800">
                {["All", "Error", "Success", "Info", "Warning"].map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Logs List */}
          <div className="flex-1 overflow-y-auto mt-2 bg-[#1c1c1c] rounded-lg border-gray-800 border">
            {filteredLogs.length === 0 ? (
              <p className="text-center text-gray-500 p-4">No logs available</p>
            ) : (
              filteredLogs.map((log, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-2 hover:bg-gray-900 border-b border-gray-800"
                >
                  <div className="flex items-center gap-3">
                    <LogTypeIndicator type={log.type} />
                    <span className={`text-${log.type}-400`}>{log.message}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setLogs((prev) => prev.filter((_, i) => i !== index))}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {/* Export Modal */}
      <Dialog open={isExportModalOpen} onOpenChange={setIsExportModalOpen}>
        <DialogContent className="bg-black border-gray-800 text-white">
          <DialogHeader>
            <DialogTitle>Export Logs</DialogTitle>
            <DialogDescription>Choose export format</DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex justify-center gap-4">
            {["csv", "excel"].map((format) => (
              <Button
                key={format}
                onClick={() => {
                  handleExport(format as "csv" | "excel");
                  setIsExportModalOpen(false);
                }}
                className={`bg-${format === "csv" ? "gray" : "green"}-700 hover:bg-${
                  format === "csv" ? "gray" : "green"
                }-600`}
              >
                {format.toUpperCase()}
              </Button>
            ))}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DebugBox;
