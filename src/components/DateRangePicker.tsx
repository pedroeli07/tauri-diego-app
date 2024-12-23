// src/components/DateRangePicker.tsx
import React from 'react';
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Button } from '@/components/ui/button';

interface DateRange {
  start: Date|null;
  end: Date|null;
}

interface DateRangePickerProps {
  value: DateRange;
  onChange: (range: DateRange) => void;
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({value, onChange}) => {
  return (
    <div className="flex space-x-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="bg-gray-800 text-white border-2 border-gray-600 rounded-md">
            {value.start ? value.start.toLocaleDateString() : 'Start Date'}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="bg-gray-800 border text-gray-200 border-gray-700">
          <Calendar
            mode="single"
            selected={value.start || new Date()}
            onSelect={(date) => onChange({ ...value, start: date || null })}

          />
        </PopoverContent>
      </Popover>

      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="bg-gray-800 text-white order-2 border-gray-600 rounded-md">
            {value.end ? value.end.toLocaleDateString() : 'End Date'}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="bg-gray-800 border text-gray-200 border-gray-700">
          <Calendar
            mode="single"
            selected={value.end || new Date()}
            onSelect={(date) => onChange({ ...value, end: date || null })}

          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default DateRangePicker;
