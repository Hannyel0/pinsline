'use client'
import React, { useState, useRef, useEffect } from 'react';
import { DayPicker } from 'react-day-picker';
import { format, isBefore, isAfter, startOfDay, addYears } from 'date-fns';
import 'react-day-picker/dist/style.css';

interface DatePickerProps {
  isOpen: boolean;
  onDateSelect?: (date: Date) => void;
  onClose?: () => void;
}

const DatePicker: React.FC<DatePickerProps> = ({ isOpen, onDateSelect, onClose }) => {
  const [selected, setSelected] = useState<Date | undefined>(undefined);
  const datePickerRef = useRef<HTMLDivElement>(null);
  
  // Handle clicks outside the date picker
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (datePickerRef.current && !datePickerRef.current.contains(event.target as Node) && onClose) {
        onClose();
      }
    };
    
    // Add event listener when the picker is open
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    // Clean up the event listener on unmount or when isOpen changes
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);
  
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
  // Calculate maximum date (1 year from today)
  const maxDate = addYears(today, 1);
  
  // Disable dates that are either in the past or more than a year in future
  const isDateDisabled = (date: Date) => {
    return isBefore(date, today) || isAfter(date, maxDate);
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
    <div 
      ref={datePickerRef}
      className="absolute top-full left-0 mt-3 bg-white rounded-3xl shadow-lg p-6 w-full z-10"
    >
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
          disabled={isDateDisabled}
          fromDate={today}
          toDate={maxDate}
          footer={selected 
            ? `${format(selected, 'PP')}` 
            : "Please select a date within the next year"}
        />
      </div>
    </div>
  );
};

export default DatePicker; 