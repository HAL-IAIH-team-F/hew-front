import React, { useEffect, useState } from "react";

export function FullScreenLoader() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    return () => setIsVisible(false);
  }, []);

  return (
    <div 
      className={`
        fixed inset-0 flex items-center justify-center z-50
        transition-opacity duration-700 ease-in-out
        ${isVisible ? 'opacity-100' : 'opacity-0'}
      `}
    >
      <div className="relative">
        {/* メインのローダー */}
        <div className="w-16 h-16 border-4 border-purple-300/20 border-t-purple-500 rounded-full animate-spin" />
        
        {/* 内側のグロー効果 */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-purple-500/20 rounded-full blur-xl" />
        
        {/* パルスエフェクト */}
        <div className="absolute -inset-1 bg-purple-500/10 rounded-full animate-pulse" />
      </div>
    </div>
  );
}