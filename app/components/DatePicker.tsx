'use client'
import React, { useState } from 'react';
import { DayPicker } from 'react-day-picker';
import { format, isBefore, startOfDay } from 'date-fns';
import 'react-day-picker/dist/style.css';

interface DatePickerProps {
  isOpen: boolean;
  onDateSelect?: (date: Date) => void;
}

const DatePicker: React.FC<DatePickerProps> = ({ isOpen, onDateSelect }) => {
  const [selected, setSelected] = useState<Date | undefined>(undefined);
  
  // Handle date selection
  const handleSelect = (date: Date | undefined) => {
    setSelected(date);
    
    // If a date is selected and callback exists, call it
    if (date && onDateSelect) {
      onDateSelect(date);
    }
  };
  
  if (!isOpen) return null;

  // Get current date for initial display
  const now = new Date();
  const today = startOfDay(now);
  
  // Disable past dates
  const isPastDate = (date: Date) => {
    return isBefore(date, today);
  };

  const customStyles = `
    .rdp {
      --rdp-cell-size: 40px;
      margin: 0;
    }
    .rdp-caption {
      padding-bottom: 16px;
    }
    .rdp-day_selected {
      background-color: #FF375C !important;
      color: white !important;
    }
    .rdp-day_today {
      font-weight: bold;
    }
    .rdp-button:hover:not([disabled]):not(.rdp-day_selected) {
      background-color: #f3f4f6;
    }
    .rdp-day_disabled {
      opacity: 0.5;
    }
  `;

  return (
    <div className="absolute top-full left-0 mt-3 bg-white rounded-3xl shadow-lg p-6 w-full z-10">
      {/* Custom styles */}
      <style>{customStyles}</style>

      <div className="flex justify-between">
        {/* Calendar with 2 months side by side */}
        <DayPicker
          mode="single"
          selected={selected}
          onSelect={handleSelect}
          defaultMonth={now}
          numberOfMonths={2}
          showOutsideDays={false}
          weekStartsOn={0} // Sunday
          captionLayout="dropdown-months"
          className="w-full"
          modifiersClassNames={{
            selected: "bg-[#FF375C] text-white rounded-full",
            today: "font-bold",
            disabled: "text-gray-300"
          }}
          disabled={isPastDate}
          fromDate={today}
          footer={selected ? `${format(selected, 'PP')}` : "Please select a future date"}
        />
      </div>
    </div>
  );
};

export default DatePicker; 