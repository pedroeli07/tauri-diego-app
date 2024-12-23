// src/components/TimeRangePicker.tsx
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import TimePicker from 'react-time-picker'; // Exemplo, pode instalar `npm install react-time-picker`

interface TimeRange {
  start: Date|null;
  end: Date|null;
}

interface TimeRangePickerProps {
  value: TimeRange;
  onChange: (range: TimeRange) => void;
}

const TimeRangePicker: React.FC<TimeRangePickerProps> = ({value, onChange}) => {
  const [startTime, setStartTime] = useState(value.start ? value.start.toTimeString().substr(0,8) : '');
  const [endTime, setEndTime] = useState(value.end ? value.end.toTimeString().substr(0,8) : '');

  const parseTime = (timeStr:string) => {
    if(!timeStr) return null;
    const [h,m,s] = timeStr.split(':').map(Number);
    const d = new Date();
    d.setHours(h||0,m||0,s||0,0);
    return d;
  }

  const updateRange = (st:string,et:string) => {
    onChange({
      start: parseTime(st),
      end: parseTime(et),
    });
  }

  return (
    <div className="flex space-x-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="bg-gray-800 text-white order-2 border-gray-600 rounded-md">
            {startTime || 'Start Time'}
          </Button>
        </PopoverTrigger>
          <PopoverContent className="bg-gray-800 border text-gray-200 border-gray-700 p-4 w-[130px]">
          <TimePicker
            onChange={(val:any)=>{
              setStartTime(val);
              updateRange(val,endTime);
            }}
            value={startTime}
            disableClock={true}
            clearIcon={null}
            className="bg-gray-800 p-4 items-center justify-center text-white order-2 border-gray-600 rounded-md"
          />
        </PopoverContent>
      </Popover>

      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="bg-gray-800 text-white order-2 border-gray-600 rounded-md">
            {endTime || 'End Time'}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="bg-gray-800 border text-gray-200 border-gray-700 p-4 w-[130px]">
          <TimePicker
            onChange={(val:any)=>{
              setEndTime(val);
              updateRange(startTime,val);
            }}
            value={endTime}
            disableClock={true}
            clearIcon={null}
            className="bg-gray-800 text-white order-2 border-gray-600 rounded-md"
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default TimeRangePicker;
