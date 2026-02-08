"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { X, Search } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SearchModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
    const [searchTerm, setSearchTerm] = useState('');

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="bg-white w-full max-w-lg rounded-xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 border border-zinc-200 flex flex-col">

                <div className="flex items-center justify-between p-6 border-b border-zinc-100 bg-white/50 backdrop-blur-md sticky top-0 z-10">
                    <h3 className="text-xl font-semibold text-zinc-900 flex items-center gap-2">
                        <Search className="w-5 h-5 text-zinc-500" />
                        Search Profiles
                    </h3>
                    <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full hover:bg-zinc-100">
                        <X className="w-5 h-5 text-zinc-500" />
                    </Button>
                </div>

                <div className="p-8 flex flex-col items-center justify-center space-y-6">
                    <div className="relative w-full">
                        <input
                            type="text"
                            placeholder="Enter username to search..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full px-4 py-3 pl-12 rounded-lg border border-zinc-300 bg-zinc-50 text-zinc-900 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                        />
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
                    </div>

                    <div className="text-center">
                        <Button
                            className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-2 rounded-full cursor-pointer shadow-lg hover:scale-105 active:scale-95 transition-all"
                            onClick={() => console.log('Searching for:', searchTerm)} // Mock action
                        >
                            Hit Search
                        </Button>
                    </div>

                    <p className="text-sm text-zinc-500">
                        Start typing to find other profiles.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SearchModal;
