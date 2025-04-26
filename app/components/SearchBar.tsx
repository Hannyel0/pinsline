'use client'
import React, { useState, ChangeEvent, useRef, useEffect } from 'react';
import DatePicker from './DatePicker';
import BusinessLocation from './BusinessLocation';
import { format } from 'date-fns';
import { motion, AnimatePresence } from 'framer-motion';

type TimePeriod = 'Morning' | 'Afternoon' | 'Evening' | 'Anytime' | null;

interface SearchBarProps {
  isMobile?: boolean;
}

const SearchBar = ({ isMobile = false }: SearchBarProps) => {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [isBusinessLocationOpen, setIsBusinessLocationOpen] = useState(false);
  const [isServicesModalOpen, setIsServicesModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTimePeriod, setSelectedTimePeriod] = useState<TimePeriod>(null);
  const [selectedLocation, setSelectedLocation] = useState<string>('');
  const [selectedService, setSelectedService] = useState<string>('');
  const [activeInput, setActiveInput] = useState<string | null>(null);
  const servicesModalRef = useRef<HTMLDivElement>(null);
  
  // Handle clicks outside the services modal
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (servicesModalRef.current && !servicesModalRef.current.contains(event.target as Node)) {
        handleCloseServicesModal();
      }
    };
    
    // Add event listener when the services modal is open
    if (isServicesModalOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    // Clean up the event listener
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isServicesModalOpen]);
  
  const toggleDatePicker = () => {
    setIsDatePickerOpen(!isDatePickerOpen);
    setIsBusinessLocationOpen(false);
    setIsServicesModalOpen(false);
    setActiveInput(isDatePickerOpen ? null : 'date');
  };

  const toggleBusinessLocation = () => {
    setIsBusinessLocationOpen(!isBusinessLocationOpen);
    setIsDatePickerOpen(false);
    setIsServicesModalOpen(false);
    setActiveInput(isBusinessLocationOpen ? null : 'location');
  };

  const toggleServicesModal = () => {
    setIsServicesModalOpen(!isServicesModalOpen);
    setIsDatePickerOpen(false);
    setIsBusinessLocationOpen(false);
    setActiveInput(isServicesModalOpen ? null : 'services');
  };

  // Handle date selection from DatePicker
  const handleDateSelect = (date: Date, timePeriod: TimePeriod) => {
    setSelectedDate(date);
    setSelectedTimePeriod(timePeriod);
    setIsDatePickerOpen(false);
    setActiveInput(null);
  };

  // Handle location selection from BusinessLocation
  const handleLocationSelect = (location: string) => {
    setSelectedLocation(location);
    setIsBusinessLocationOpen(false);
    setActiveInput(null);
  };

  // Handle service selection
  const handleServiceSelect = (service: string) => {
    setSelectedService(service);
    setIsServicesModalOpen(false);
    setActiveInput(null);
  };

  // Handle input change
  const handleLocationChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSelectedLocation(e.target.value);
  };

  const handleServiceChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSelectedService(e.target.value);
  };

  // Close the date picker
  const handleCloseDatePicker = () => {
    setIsDatePickerOpen(false);
    setActiveInput(null);
  };

  // Close the business location suggestions
  const handleCloseBusinessLocation = () => {
    setIsBusinessLocationOpen(false);
    setActiveInput(null);
  };

  // Close the services modal
  const handleCloseServicesModal = () => {
    setIsServicesModalOpen(false);
    setActiveInput(null);
  };

  // Get formatted date and time display
  const getDateTimeDisplay = () => {
    if (!selectedDate) return 'Date';
    
    let display = format(selectedDate, 'PP');
    if (selectedTimePeriod) {
      display += ` · ${selectedTimePeriod}`;
    }
    return display;
  };

  // Mobile search bar layout
  if (isMobile) {
    return (
      <div className="w-full">
        <motion.div 
          className="relative"
          animate={{ 
            scale: isBusinessLocationOpen ? 1.02 : 1 
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
              className={`w-full py-3 pl-12 pr-4 bg-[#f7f7f7] outline-none text-gray-600 text-sm rounded-full transition-all duration-300 ${isBusinessLocationOpen ? 'ring-2 ring-pink-200' : ''}`}
              value={selectedLocation}
              onChange={handleLocationChange}
              onClick={toggleBusinessLocation}
            />
          </div>
        </motion.div>

        {/* Business Location for Mobile */}
        <div className="relative">
          <AnimatePresence>
            {isBusinessLocationOpen && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
              >
                <BusinessLocation
                  isOpen={isBusinessLocationOpen}
                  onSelect={handleLocationSelect}
                  onClose={handleCloseBusinessLocation}
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
        <div className="w-full sm:w-auto sm:flex-1 px-4 sm:px-6 py-3 relative border-b sm:border-b-0">
          <div className="text-xs sm:text-sm font-medium">Services or business</div>
          <motion.input 
            type="text" 
            placeholder="What are you looking for?" 
            className={`w-full outline-none text-gray-600 text-sm sm:text-base ${activeInput === 'services' ? 'text-pink-500' : ''}`}
            value={selectedService}
            onChange={handleServiceChange}
            onClick={toggleServicesModal}
            whileFocus={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          />
        </div>
        
        {/* Divider */}
        <div className="hidden sm:block h-10 w-px bg-gray-200 mx-1"></div>
        
        <div className="w-full sm:w-auto sm:flex-1 px-4 sm:px-6 py-3 relative border-b sm:border-b-0">
          <div className="text-xs sm:text-sm font-medium">Where</div>
          <motion.input 
            type="text" 
            placeholder="Location" 
            className={`w-full outline-none text-gray-600 text-sm sm:text-base ${activeInput === 'location' ? 'text-pink-500' : ''}`}
            value={selectedLocation}
            onChange={handleLocationChange}
            onClick={toggleBusinessLocation}
            whileFocus={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          />
        </div>
        
        {/* Divider */}
        <div className="hidden sm:block h-10 w-px bg-gray-200 mx-1"></div>
        
        <div className="w-full sm:w-auto sm:flex-1 px-4 sm:px-6 py-3 relative">
          <div className="text-xs sm:text-sm font-medium">When</div>
          <motion.button 
            className={`w-full text-left outline-none cursor-pointer text-sm sm:text-base ${activeInput === 'date' ? 'text-pink-500' : 'text-gray-600'}`}
            onClick={toggleDatePicker}
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            {getDateTimeDisplay()}
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

      {/* Services Modal */}
      <div className="relative">
        <AnimatePresence>
          {isServicesModalOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
              <div 
                ref={servicesModalRef}
                className="absolute z-10 mt-2 w-full bg-white rounded-2xl shadow-lg p-6 max-h-[80vh] overflow-y-auto"
              >
                <h3 className="text-lg font-semibold mb-5">Services and businesses</h3>
                {/* Empty modal content as requested */}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

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

      {/* Business Location */}
      <div className="relative">
        <AnimatePresence>
          {isBusinessLocationOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
              <BusinessLocation
                isOpen={isBusinessLocationOpen}
                onSelect={handleLocationSelect}
                onClose={handleCloseBusinessLocation}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SearchBar; 