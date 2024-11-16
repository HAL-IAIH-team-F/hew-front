// components/Layout.tsx
import React from 'react';
import { useEffect, useState } from "react";
import { useSmoothScroll } from "../_hook/useSmoothScroll"
import { FaSearch } from 'react-icons/fa';

interface searchLayoutProps {
  children: React.ReactNode;
}

const searchLayout: React.VFC<searchLayoutProps> = ({ children }) => {
    const [containerId, setContainerId] = useState('');

    return (
        <div className="flex h-screen">
            <div className="w-1/4 bg-black text-white p-8 h-screen">
                <h1 className="text-2xl font-bold mb-4">検索ページ</h1>
                <div className="relative mb-4">
                    <span className="absolute inset-y-0 left-3 flex items-center text-gray-500">
                        <FaSearch />
                    </span>
                    <input 
                        type="text" 
                        placeholder="検索する" 
                        className="w-full pl-10 pr-4 py-2 bg-gray-800 text-white rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <p className="text-sm">
                    にします
                </p>
            </div>
            <div className="w-3/4 bg-black text-white p-8 h-screen overflow-y-scroll" id={containerId}>
                <h1 className="text-2xl font-bold mb-4">xxxxxxxxx</h1>
                <p className="text-sm">
                    xxxxxxxxxxxxxxxxxx 
                </p>
                <p className="mt-4 text-sm">
                    xxxxxxxxxxxxxxxxxx
                </p>
                <div className="space-y-8">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default searchLayout;
