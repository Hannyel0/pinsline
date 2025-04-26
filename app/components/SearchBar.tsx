'use client'
import React, { useState, ChangeEvent } from 'react';
import DatePicker from './DatePicker';
import DestinationSuggestions from './DestinationSuggestions';
import { format } from 'date-fns';
import { motion, AnimatePresence } from 'framer-motion';

interface SearchBarProps {
  isMobile?: boolean;
}

const SearchBar = ({ isMobile = false }: SearchBarProps) => {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [isDestinationSuggestionsOpen, setIsDestinationSuggestionsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<string>('');
  const [activeInput, setActiveInput] = useState<string | null>(null);
  
  const toggleDatePicker = () => {
    setIsDatePickerOpen(!isDatePickerOpen);
    setIsDestinationSuggestionsOpen(false);
    setActiveInput(isDatePickerOpen ? null : 'date');
  };

  const toggleDestinationSuggestions = () => {
    setIsDestinationSuggestionsOpen(!isDestinationSuggestionsOpen);
    setIsDatePickerOpen(false);
    setActiveInput(isDestinationSuggestionsOpen ? null : 'location');
  };

  // Handle date selection from DatePicker
  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setIsDatePickerOpen(false);
    setActiveInput(null);
  };

  // Handle location selection from DestinationSuggestions
  const handleLocationSelect = (location: string) => {
    setSelectedLocation(location);
    setIsDestinationSuggestionsOpen(false);
    setActiveInput(null);
  };

  // Handle input change
  const handleLocationChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSelectedLocation(e.target.value);
  };

  // Close the date picker
  const handleCloseDatePicker = () => {
    setIsDatePickerOpen(false);
    setActiveInput(null);
  };

  // Close the destination suggestions
  const handleCloseDestinationSuggestions = () => {
    setIsDestinationSuggestionsOpen(false);
    setActiveInput(null);
  };

  // Mobile search bar layout
  if (isMobile) {
    return (
      <div className="w-full">
        <motion.div 
          className="relative"
          animate={{ 
            scale: isDestinationSuggestionsOpen ? 1.02 : 1 
          }}
          transition={{ type: "spring", bounce: 0.2 }}
        >
          <div className="relative flex items-center shadow-md rounded-full overflow-hidden">
            <div className="absolute left-4 text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input 
              type="text" 
              placeholder="Look for services" 
              className={`w-full py-3 pl-12 pr-4 bg-[#f7f7f7] outline-none text-gray-600 text-sm rounded-full transition-all duration-300 ${isDestinationSuggestionsOpen ? 'ring-2 ring-pink-200' : ''}`}
              value={selectedLocation}
              onChange={handleLocationChange}
              onClick={toggleDestinationSuggestions}
            />
          </div>
        </motion.div>

        {/* Destination Suggestions for Mobile */}
        <div className="relative">
          <AnimatePresence>
            {isDestinationSuggestionsOpen && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
              >
                <DestinationSuggestions
                  isOpen={isDestinationSuggestionsOpen}
                  onSelect={handleLocationSelect}
                  onClose={handleCloseDestinationSuggestions}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    );
  }

  // Desktop & tablet search bar layout
  return (
    <div className="w-full max-w-[1000px] mx-auto my-9 px-4 sm:px-6 lg:px-0 transition-all duration-300">
      <motion.div 
        className="flex flex-col sm:flex-row items-center rounded-3xl bg-white shadow-md overflow-hidden border border-gray-200"
        animate={{ 
          scale: activeInput ? 1.01 : 1,
          boxShadow: activeInput ? '0 8px 30px rgba(0, 0, 0, 0.12)' : '0 4px 6px -1px rgba(0, 0, 0, 0.1)' 
        }}
        transition={{ type: "spring", bounce: 0.2 }}
      >
        <div className="w-full sm:w-auto sm:flex-1 px-4 sm:px-6 py-3 relative border-b sm:border-b-0 sm:border-r border-gray-200">
          <div className="text-xs sm:text-sm font-medium">Services or business</div>
          <input 
            type="text" 
            placeholder="What are you looking for?" 
            className="w-full outline-none text-gray-600 text-sm sm:text-base"
          />
        </div>
        
        <div className="w-full sm:w-auto sm:flex-1 px-4 sm:px-6 py-3 relative border-b sm:border-b-0 sm:border-r border-gray-200">
          <div className="text-xs sm:text-sm font-medium">Where</div>
          <motion.input 
            type="text" 
            placeholder="Location" 
            className={`w-full outline-none text-gray-600 text-sm sm:text-base ${activeInput === 'location' ? 'text-pink-500' : ''}`}
            value={selectedLocation}
            onChange={handleLocationChange}
            onClick={toggleDestinationSuggestions}
            whileFocus={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          />
        </div>
        
        <div className="w-full sm:w-auto sm:flex-1 px-4 sm:px-6 py-3 relative">
          <div className="text-xs sm:text-sm font-medium">When</div>
          <motion.button 
            className={`w-full text-left outline-none cursor-pointer text-sm sm:text-base ${activeInput === 'date' ? 'text-pink-500' : 'text-gray-600'}`}
            onClick={toggleDatePicker}
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            {selectedDate ? format(selectedDate, 'PP') : 'Date'}
          </motion.button>
        </div>
        
        <div className="w-full sm:w-auto flex justify-center sm:block p-3">
          <motion.button 
            className="bg-[#FF375C] hover:bg-red-600 cursor-pointer text-white p-3 rounded-full"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </motion.button>
        </div>
      </motion.div>

      {/* Date Picker */}
      <div className="relative">
        <AnimatePresence>
          {isDatePickerOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
              <DatePicker 
                isOpen={isDatePickerOpen}
                onDateSelect={handleDateSelect}
                onClose={handleCloseDatePicker}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Destination Suggestions */}
      <div className="relative">
        <AnimatePresence>
          {isDestinationSuggestionsOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
              <DestinationSuggestions
                isOpen={isDestinationSuggestionsOpen}
                onSelect={handleLocationSelect}
                onClose={handleCloseDestinationSuggestions}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SearchBar; 