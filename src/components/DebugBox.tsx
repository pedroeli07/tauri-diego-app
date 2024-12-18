import React from 'react';
import { Trash2, Copy, Download } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Log } from '@/lib/types'; // Certifique-se de ajustar o caminho corretamente

export interface DebugBoxProps {
  logs: Log[];
  clearLogs: () => void;
  deleteLog: (index: number) => void;
  sendCommand: (command: string) => void;
}
const DebugBox: React.FC<DebugBoxProps> = ({ logs, clearLogs, deleteLog, sendCommand }) => {
  return (
    <div className="absolute top-16 right-4 w-[32%] max-h-[500px]">
      <Card className="max-h-[500px] bg-gradient-to-b from-[#08060a] via-[#000000] to-[#0b0014] rounded-lg border border-gray-700 shadow-xl hover:shadow-2xl transition-shadow">
        <CardContent className="max-h-[470px] overflow-auto">
          <div className="flex flex-col bg-gradient-to-b from-[#08060a] via-[#000000] to-[#0b0014] rounded-lg shadow-lg p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-200">Debug Box</h2>
              <div className="flex space-x-2">
                <button
                  onClick={clearLogs}
                  className="p-2 dark:bg-gray-700 rounded-md hover:bg-red-400 dark:hover:bg-red-600 transition-colors"
                  title="Clear all logs"
                  aria-label="Clear logs"
                >
                  <Trash2 className="w-5 h-5 text-gray-700 dark:text-gray-200" />
                </button>
                <button
                  onClick={() => sendCommand("copy")}
                  className="p-2 dark:bg-gray-700 rounded-md hover:bg-purple-400 dark:hover:bg-purple-600 transition-colors"
                  title="Copy all logs"
                  aria-label="Copy logs"
                >
                  <Copy className="w-5 h-5 text-gray-700 dark:text-gray-200" />
                </button>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-3 bg-gradient-to-b from-[#1a181b] via-slate-800 to-[#000000]">
              {logs.length === 0 ? (
                <p className="text-center text-gray-500 dark:text-gray-400">No logs available</p>
              ) : (
                logs.map((log, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center mb-2 p-2"
                  >
                    <span>{log.message}</span>
                    <button
                      onClick={() => deleteLog(index)}
                      className="p-1 rounded-md hover:bg-red-400 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DebugBox;