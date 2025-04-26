'use client'
import { useState, useEffect } from 'react';
import SearchBar from './SearchBar';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  // Track scroll position for shadow effects
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <div className={`sticky top-0 z-50 w-full ${isScrolled ? 'shadow-md' : ''} bg-white`}>
        <nav className={`w-full py-3 px-4 bg-white transition-all duration-300`}>
          <div className="max-w-7xl mx-auto flex items-center justify-center md:justify-between">
            {/* Logo - Centered on mobile, aligned left on desktop */}
            <div className="flex items-center space-x-4 md:space-x-10">
              {/* Logo */}
              <div className="text-pink-500 font-bold text-xl md:text-2xl">pinsline</div>
              
              {/* Main Navigation - Hidden on mobile */}
              <div className="hidden md:flex space-x-8">
                <a href="#" className="text-gray-700 font-medium">Explore</a>
                <div className="h-5 border-r border-gray-300"></div>
                <a href="#" className="text-gray-500 hover:text-gray-700">Pricing</a>
              </div>
            </div>
            
            {/* Right side - Login and Set up business buttons */}
            <div className="hidden md:flex items-center space-x-3">
              <button className="px-4 py-2 rounded-lg text-gray-700 font-medium hover:bg-gray-100 transition-colors">
                Login
              </button>
              <button className="px-4 py-2 bg-[#FF375C] text-white rounded-lg font-medium hover:bg-red-600 transition-colors">
                Set up my business
              </button>
            </div>
          </div>
        </nav>

        {/* Mobile Search Bar - Always visible, only on mobile */}
        <div className="md:hidden bg-white px-4 py-3 border-t border-gray-100">
          <SearchBar isMobile={true} />
        </div>
      </div>

      {/* Mobile Bottom Navigation Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
        <div className="flex justify-around items-center py-3">
          <a href="#" className="flex flex-col items-center">
            <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <span className="text-xs mt-1">Explore</span>
          </a>
          <a href="#" className="flex flex-col items-center">
            <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <span className="text-xs mt-1">Wishlists</span>
          </a>
          <a href="#" className="flex flex-col items-center">
            <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span className="text-xs mt-1">Log in</span>
          </a>
        </div>
      </div>
    </>
  );
} 