'use client'
import React, { useState, useRef, useEffect } from 'react';
import { DayPicker } from 'react-day-picker';
import { format, isBefore, isAfter, startOfDay, addYears } from 'date-fns';
import 'react-day-picker/dist/style.css';
import { motion, AnimatePresence } from 'framer-motion';

type TimePeriod = 'Morning' | 'Afternoon' | 'Evening' | 'Anytime' | null;

interface DatePickerProps {
  isOpen: boolean;
  onDateSelect?: (date: Date, timePeriod: TimePeriod) => void;
  onClose?: () => void;
}

const DatePicker: React.FC<DatePickerProps> = ({ isOpen, onDateSelect, onClose }) => {
  const [selected, setSelected] = useState<Date | undefined>(undefined);
  const [timePeriod, setTimePeriod] = useState<TimePeriod>(null);
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
    setTimePeriod(null); // Reset time period when date changes
  };
  
  // Handle time period selection
  const handleTimeSelect = (period: TimePeriod) => {
    setTimePeriod(period);
    
    // If both date and time period are selected and callback exists, call it
    if (selected && period && onDateSelect) {
      onDateSelect(selected, period);
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
    .rdp-chevron {
      fill: #FF375C !important;
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

  // Time period options
  const timePeriods: TimePeriod[] = ['Morning', 'Afternoon', 'Evening', 'Anytime'];

  return (
    <div 
      ref={datePickerRef}
      className="absolute top-full left-0 mt-3 bg-white rounded-3xl shadow-lg p-6 w-full z-10"
    >
      {/* Custom styles */}
      <style>{customStyles}</style>

      <div className="flex">
        {/* Calendar with 2 months side by side */}
        <div className="flex-grow">
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
          />
        </div>
        
        {/* Vertical divider */}
        {selected && (
          <div className="w-px bg-gray-200 mx-9 my-5"></div>
        )}
        
        {/* Time period selection */}
        <AnimatePresence>
          {selected && (
            <motion.div 
              className="w-48 flex flex-col justify-center"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
              <h3 className="text-lg font-medium mb-4">Select time</h3>
              <div className="space-y-3">
                {timePeriods.map((period) => (
                  <button
                    key={period}
                    onClick={() => handleTimeSelect(period)}
                    className={`w-full py-3 px-4 rounded-xl text-left transition-colors cursor-pointer
                      ${timePeriod === period 
                        ? 'bg-[#FF375C] text-white' 
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                      }`}
                  >
                    {period}
                  </button>
                ))}
              </div>
              {selected && (
                <div className="mt-6 text-sm text-gray-600">
                  {format(selected, 'PP')}
                  {timePeriod && ` · ${timePeriod}`}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default DatePicker; 