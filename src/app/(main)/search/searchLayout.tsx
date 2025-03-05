"use client";
import React, { useEffect, useState } from "react";
import { Search, Command, ShoppingCart } from "lucide-react";
import SerchProductView from "./SerchProductView";

interface SearchLayoutProps {
  children: React.ReactNode;
}

const SearchLayout: React.FC<SearchLayoutProps> = ({ children }) => {
  const [isMobileView, setIsMobileView] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 820);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    
    // Add keyboard shortcut for search focus
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        document.getElementById("search-input")?.focus();
      }
    };
    
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b bg-gray-900 from-gray-900">
      {/* Header with Search Bar */}
      
      <div
        className={`
          ${isMobileView 
            ? "fixed top-10 left-0 w-full z-1" 
            : "absolute top-0 z-10 w-full"}
          backdrop-blur-xl bg-gray-900/80 border-b border-gray-800/50
        `}
      >
        <div className="max-w-7xl mx-auto px-4 h-28">
          <div className="h-full flex items-center justify-center">
            <div className={`
              relative w-full max-w-2xl transition-all duration-200
              ${isFocused ? 'scale-105' : 'scale-100'}
            `}>
              <div className={`
                absolute inset-y-0 left-4 flex items-center gap-2
                text-gray-400 transition-colors duration-200
                ${isFocused ? 'text-indigo-400' : 'text-gray-400'}
              `}>
                <Search size={18} />
                <div className="hidden sm:flex items-center gap-1 text-xs font-medium">
                  <Command size={14} />
                </div>
              </div>
              
              <input
                id="search-input"
                type="text"
                placeholder="探したい商品を検索..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                className={`
                  w-full pl-16 pr-4 py-3 rounded-2xl
                  bg-gray-800/50 text-gray-100
                  border border-gray-700/50
                  placeholder:text-gray-500
                  transition-all duration-200 ease-in-out
                  focus:outline-none focus:ring-2 focus:ring-indigo-500/50 
                  focus:bg-gray-800/80 focus:border-indigo-500/50
                  hover:bg-gray-800/80 hover:border-gray-600/50
                  text-sm sm:text-base
                `}
              />

              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 inset-y-0 flex items-center
                           text-gray-400 hover:text-gray-300 transition-colors"
                >
                  <span className="text-xs">ESC</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className={`
        w-full transition-all duration-200 ease-in-out
        ${isMobileView ? "pt-20" : "pt-20"}
      `}>
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="w-full h-full rounded-2xl overflow-y-auto"
          style={{
            height: "calc(100vh - 0px)",
            maxHeight: "calc(100vh - 200px)",
            boxSizing: "border-box",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}>
            <SerchProductView Search={searchQuery} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchLayout;