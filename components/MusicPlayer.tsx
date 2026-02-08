"use client";

import React, { useRef, useState, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Upload, Music as MusicIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./ui/Button";

interface MusicPlayerProps {
    className?: string;
    musicSrc: string;
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({ className, musicSrc }) => {
    const audioRef = useRef<HTMLAudioElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);

    // Effect for controlling play/pause based on isPlaying state
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.loop = true; // Ensure looping
            if (isPlaying) {
                audioRef.current.play().catch(e => console.log("Audio play failed:", e));
            } else {
                audioRef.current.pause();
            }
        }
    }, [isPlaying]);

    // Effect for volume setting when music source changes
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = 0.5; // Set initial volume
        }
    }, [musicSrc]);

    const togglePlay = () => {
        setIsPlaying(!isPlaying);
    };

    const toggleMute = () => {
        if (audioRef.current) {
            audioRef.current.muted = !isMuted;
            setIsMuted(!isMuted);
        }
    };

    return (
        <div className={cn("fixed bottom-4 right-4 z-50 flex items-center gap-2 bg-white/10 dark:bg-black/40 backdrop-blur-md p-2 rounded-full border border-white/20 shadow-lg animate-in slide-in-from-bottom-5 duration-500", className)}>
            <audio ref={audioRef} src={musicSrc} loop />

            <Button
                variant="ghost"
                size="icon"
                onClick={togglePlay}
                className="rounded-full w-8 h-8 hover:bg-white/20 text-white"
                title={isPlaying ? "Pause" : "Play"}
            >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </Button>

            <div className="w-px h-4 bg-white/20 mx-0.5" />

            <Button
                variant="ghost"
                size="icon"
                onClick={toggleMute}
                className="rounded-full w-8 h-8 hover:bg-white/20 text-white"
                title={isMuted ? "Unmute" : "Mute"}
            >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </Button>

            <div className="flex items-center gap-1 px-2 border-l border-white/20 ml-1">
                <MusicIcon className="w-3 h-3 text-white/60 animate-pulse" />
                <span className="text-[10px] text-white/80 font-medium truncate max-w-[80px]">
                    Playing...
                </span>
            </div>
        </div>
    );
};

export default MusicPlayer;
