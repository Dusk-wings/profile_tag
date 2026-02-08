"use client";

import React from 'react';
import { X, Upload, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./ui/Button";

import { Moon, Sun, Monitor, Check, Music } from "lucide-react";

interface BackgroundPickerProps {
    isOpen: boolean;
    onClose: () => void;
    onSelect: (url: string) => void;
    onCustomUpload: (file: File) => void;
    onMusicUpload: (file: File) => void;
    recentUploads?: string[];
}

const DEFAULT_BACKGROUNDS = [
    { name: 'Cloud', url: '/backgrounds/cloud.gif' },
    { name: 'Leafs', url: '/backgrounds/leafs.gif' },
    { name: 'Ocean', url: '/backgrounds/ocean.gif' },
    { name: 'Night', url: '/backgrounds/night.gif' },
    { name: 'Town', url: '/backgrounds/town.gif' },
];

const BackgroundPicker: React.FC<BackgroundPickerProps> = ({
    isOpen,
    onClose,
    onSelect,
    onCustomUpload,
    onMusicUpload,
    recentUploads = []
}) => {
    const fileInputRef = React.useRef<HTMLInputElement>(null);
    const musicInputRef = React.useRef<HTMLInputElement>(null);

    if (!isOpen) return null;

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            onCustomUpload(file);
        }
    };

    const handleMusicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            onMusicUpload(file);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="bg-white w-full max-w-2xl rounded-xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 border border-zinc-200 flex flex-col max-h-[90vh]">

                <div className="flex items-center justify-between p-6 border-b border-zinc-100 bg-white/50 backdrop-blur-md sticky top-0 z-10">
                    <h3 className="text-xl font-semibold text-zinc-900">
                        Customize Profile
                    </h3>
                    <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full hover:bg-zinc-100">
                        <X className="w-5 h-5 text-zinc-500" />
                    </Button>
                </div>

                <div className="p-6 space-y-8 max-h-[80vh] overflow-y-auto">



                    {/* Music Upload Section */}
                    <div className="space-y-4">
                        <h4 className="text-sm font-medium text-zinc-500 uppercase tracking-wider">
                            Profile Music
                        </h4>
                        <div className="bg-zinc-50 p-4 rounded-lg">
                            <input
                                type="file"
                                ref={musicInputRef}
                                className="hidden"
                                accept="audio/*"
                                onChange={handleMusicChange}
                            />
                            <Button
                                onClick={() => musicInputRef.current?.click()}
                                className="w-full h-12 gap-2 bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-500/20"
                            >
                                <Music className="w-4 h-4" />
                                Upload Custom Music
                            </Button>
                            <p className="text-[10px] text-zinc-500 mt-2 text-center">
                                MP3, WAV or OGG supported. Max size 10MB.
                            </p>
                        </div>
                    </div>

                    {/* Background Selection Section */}
                    <div className="space-y-4">
                        <h4 className="text-sm font-medium text-zinc-500 uppercase tracking-wider">
                            Curated Backgrounds
                        </h4>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                            {DEFAULT_BACKGROUNDS.map((bg) => (
                                <button
                                    key={bg.name}
                                    onClick={() => onSelect(bg.url)}
                                    className="group relative aspect-video rounded-lg overflow-hidden border border-zinc-200 hover:ring-2 hover:ring-indigo-500 transition-all"
                                >
                                    <img
                                        src={bg.url}
                                        alt={bg.name}
                                        className="w-full h-full object-cover transition-transform group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                                    <span className="absolute bottom-2 left-2 text-xs font-medium text-white shadow-sm">
                                        {bg.name}
                                    </span>
                                </button>
                            ))}

                            <button
                                onClick={() => fileInputRef.current?.click()}
                                className="flex flex-col items-center justify-center aspect-video rounded-lg border-2 border-dashed border-zinc-300 hover:border-indigo-500 hover:bg-zinc-50 transition-all text-zinc-500"
                            >
                                <Upload className="w-6 h-6 mb-2" />
                                <span className="text-xs font-medium">Upload GIF</span>
                            </button>
                            <input
                                type="file"
                                ref={fileInputRef}
                                className="hidden"
                                accept="image/*"
                                onChange={handleFileChange}
                            />
                        </div>
                    </div>

                    {/* Recent Uploads Section */}
                    {recentUploads.length > 0 && (
                        <div className="space-y-4 pt-4 border-t border-zinc-100">
                            <div className="flex items-center gap-2 text-sm font-medium text-zinc-500 uppercase tracking-wider">
                                <Clock className="w-4 h-4" />
                                <span>Recently Uploaded</span>
                            </div>
                            <div className="grid grid-cols-4 gap-4">
                                {recentUploads.map((url, i) => (
                                    <button
                                        key={i}
                                        onClick={() => onSelect(url)}
                                        className="relative aspect-square rounded-lg overflow-hidden border border-zinc-200 hover:ring-2 hover:ring-indigo-500 transition-all group"
                                    >
                                        <img
                                            src={url}
                                            alt={`Recent ${i}`}
                                            className="w-full h-full object-cover transition-transform group-hover:scale-110"
                                        />
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BackgroundPicker;
