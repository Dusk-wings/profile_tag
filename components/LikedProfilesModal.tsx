"use client";

import React from 'react';
import { Button } from '@/components/ui/Button';
import { X, Heart, User } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LikedProfilesModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const LikedProfilesModal: React.FC<LikedProfilesModalProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="bg-white w-full max-w-md rounded-xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 border border-zinc-200 flex flex-col max-h-[80vh]">

                <div className="flex items-center justify-between p-6 border-b border-zinc-100 bg-white/50 backdrop-blur-md sticky top-0 z-10">
                    <h3 className="text-xl font-semibold text-zinc-900 flex items-center gap-2">
                        <Heart className="w-5 h-5 text-red-500 fill-current" />
                        Liked Profiles
                    </h3>
                    <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full hover:bg-zinc-100">
                        <X className="w-5 h-5 text-zinc-500" />
                    </Button>
                </div>

                <div className="p-10 flex flex-col items-center justify-center text-center space-y-4">
                    <div className="bg-zinc-100 p-4 rounded-full">
                        <User className="w-8 h-8 text-zinc-400" />
                    </div>
                    <div>
                        <p className="text-lg font-medium text-zinc-900">No profiles liked yet</p>
                        <p className="text-sm text-zinc-500 max-w-[250px]">
                            Profiles you like will appear here for quick access.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LikedProfilesModal;
