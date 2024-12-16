//src/components/Navbar.tsx
import React from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChevronDown, Plug2, Power, RotateCcw, RouteOff, Settings, Video } from "lucide-react";
import { MdPowerOff } from "react-icons/md";
import CustomTooltip from "@/components/CustomTooltip";

interface NavbarProps {
  port: string;
  portList: string[];
  baud: string;
  isConnected: boolean;
  isUpdatingPorts: boolean;
  onPortChange: (port: string) => void;
  onBaudChange: (baud: string) => void;
  onUpdatePorts: () => void;
  onToggleConnection: () => void;
  onProduction: () => void;
  onReset: () => void;
  onRecord: () => void;
  isRecording: boolean;
}

const Navbar: React.FC<NavbarProps> = ({
  port,
  portList,
  baud,
  isConnected,
  isUpdatingPorts,
  onPortChange,
  onBaudChange,
  onUpdatePorts,
  onToggleConnection,
  onProduction,
  onReset,
  onRecord,
  isRecording,
}) => {
  return (
    <div className="grid grid-cols-2 gap-4 p-4 ] text-white shadow-md border-b border-gray-800">
      {/* Esquerda: Port, Baud, Update Ports e Connect */}
      <div className="flex  gap-4">
        {/* Port Selection */}
        <div>
          <label className="text-sm text-gray-400">Port</label>
          <Select value={port} onValueChange={onPortChange}>
            <SelectTrigger className="w-32 bg-gray-700 hover:bg-gray-600 text-gray-300">
              <SelectValue placeholder="Select Port" />
            </SelectTrigger>
            <SelectContent className="bg-gray-700 text-gray-300">
              {portList.length > 0 ? (
                portList.map((p, index) => (
                  <SelectItem key={index} value={p}>
                    {p}
                  </SelectItem>
                ))
              ) : (
                <SelectItem value="None" disabled>
                  No Ports Available
                </SelectItem>
              )}
            </SelectContent>
          </Select>
        </div>

        {/* Baud Rate Selection */}
        <div>
          <label className="text-sm text-gray-400">Baud Rate</label>
          <Select value={baud} onValueChange={onBaudChange}>
            <SelectTrigger className="w-32 bg-gray-700 hover:bg-gray-600 text-gray-300">
              <SelectValue placeholder="Select Baud" />
            </SelectTrigger>
            <SelectContent className="bg-gray-700 text-gray-300">
              {[9600, 19200, 38400, 57600, 115200].map((b, index) => (
                <SelectItem key={index} value={b.toString()}>
                  {b}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
<div className="flex items-center gap-4 ml-16 mt-6">
        {/* Update Ports */}
        <CustomTooltip content="Update Ports">
          <Button
            onClick={onUpdatePorts}
            disabled={isUpdatingPorts}
            className="bg-gray-700 hover:bg-gray-600 text-gray-300 px-4 py-1"
          >
            {isUpdatingPorts ? <RotateCcw className="animate-spin mr-2" /> : null}
            Update Ports
          </Button>
        </CustomTooltip>

        {/* Connection Button */}
        <CustomTooltip content={isConnected ? "Disconnect" : "Connect"}>
          <Button
            onClick={onToggleConnection}
            className={`px-4 py-2 rounded-md ${
              isConnected
                ? "bg-red-600 hover:bg-red-500 text-white"
                : "bg-green-600 hover:bg-green-500 text-white"
            }`}
          >
            {isConnected ? <Plug2 className="w-5 h-5 mr-2" /> : <Power className="w-5 h-5 mr-2" />}
            {isConnected ? "Disconnect" : "Connect"}
          </Button>
        </CustomTooltip>
        </div>
      </div>

      {/* Direita: Production, Reset e Record */}
      <div className="flex items-center justify-end gap-4 mt-6">
        {/* Production */}
        <CustomTooltip content="Activate Production Mode">
          <Button onClick={onProduction} className="bg-gray-700 hover:bg-gray-600 text-gray-300 px-4">
            <Settings className="w-5 h-5 mr-1" />
            Production
          </Button>
        </CustomTooltip>

        {/* Reset */}
        <CustomTooltip content="Reset Device">
          <Button onClick={onReset} className="bg-gray-700 hover:bg-gray-600 text-gray-300 px-4">
            <RouteOff className="w-5 h-5 mr-1" />
            Reset
          </Button>
        </CustomTooltip>

        {/* Record */}
        <CustomTooltip content={isRecording ? "Stop Recording" : "Start Recording"}>
          <Button
            onClick={onRecord}
            className={`px-4 py-2 ${
              isRecording ? "bg-red-600 hover:bg-red-500" : "bg-purple-600 hover:bg-purple-500"
            } text-white`}
          >
            <Video className="w-5 h-5 mr-2" />
            {isRecording ? "Stop Record" : "Start Record"}
          </Button>
        </CustomTooltip>
      </div>
    </div>
  );
};

export default Navbar;
