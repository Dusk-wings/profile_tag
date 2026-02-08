"use client";

import React, { useState, useCallback } from 'react';
import CloudBackground from '@/components/CloudBackground';
import AccountForm from '@/components/AccountForm';
import LikedProfilesModal from '@/components/LikedProfilesModal';
import MusicPlayer from '@/components/MusicPlayer';
import SearchModal from '@/components/SearchModal';

export default function Home() {
  const [backgroundUrl, setBackgroundUrl] = useState<string | null>(null);
  const [showLikedProfiles, setShowLikedProfiles] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [musicSrc, setMusicSrc] = useState<string>("/music/music.mp3");

  const handleBackgroundChange = useCallback((url: string | null) => {
    setBackgroundUrl(url);
  }, []);

  const handleMusicUpload = useCallback((file: File) => {
    const url = URL.createObjectURL(file);
    setMusicSrc(url);
  }, []);

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center p-4 overflow-x-hidden pt-10 pb-10">

      {/* Search Button (Top Left) */}
      <div className="fixed top-6 left-6 z-50 animate-in slide-in-from-top-5 duration-700">
        <button
          onClick={() => setShowSearch(true)}
          className="flex items-center justify-center w-10 h-10 bg-white/20 backdrop-blur-md rounded-full border border-white/20 shadow-lg text-white hover:bg-white/30 transition-all hover:scale-105 active:scale-95 group"
          title="Search Profiles"
        >
          <span role="img" aria-label="search" className="group-hover:scale-110 transition-transform">🔍</span>
        </button>
      </div>

      {/* Liked Profiles Button (Floating) */}
      <div className="fixed top-6 right-6 z-50 animate-in slide-in-from-top-5 duration-700">
        <button
          onClick={() => setShowLikedProfiles(true)}
          className="flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-md rounded-full border border-white/20 shadow-lg text-sm font-medium text-white hover:bg-white/30 transition-all hover:scale-105 active:scale-95 group"
        >
          <span role="img" aria-label="heart" className="group-hover:scale-110 transition-transform">❤️</span>
          Liked Profiles
        </button>
      </div>

      <LikedProfilesModal
        isOpen={showLikedProfiles}
        onClose={() => setShowLikedProfiles(false)}
      />

      <SearchModal
        isOpen={showSearch}
        onClose={() => setShowSearch(false)}
      />

      {/* Background (GIF) */}
      <CloudBackground backgroundImage={backgroundUrl} />

      {/* Main Content Area */}
      <div className="z-10 w-full max-w-6xl animate-in zoom-in-95 duration-500 flex-1">
        <AccountForm
          onBackgroundChange={handleBackgroundChange}
          onMusicUpload={handleMusicUpload}
        />
      </div>

      <MusicPlayer musicSrc={musicSrc} />

      {/* Footer */}
      <footer className="mt-16 text-center text-sm text-gray-400 z-10 animate-in fade-in duration-1000 delay-500">
        <p>© {new Date().getFullYear()} Sample Testing Project. All rights reserved.</p>
      </footer>
    </main>
  );
}
