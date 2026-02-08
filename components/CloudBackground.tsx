"use client";

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { cn } from '@/lib/utils';

interface CloudBackgroundProps {
    backgroundImage?: string | null;
}

const CloudBackground: React.FC<CloudBackgroundProps> = ({ backgroundImage }) => {
    // varied based on user preference, default to cloud gif
    const bgUrl = backgroundImage || '/backgrounds/cloud.gif';

    return (
        <div className="fixed inset-0 w-full h-full -z-10 bg-gray-900 transition-all duration-700 ease-in-out">
            <img
                src={bgUrl}
                alt="Background"
                className="w-full h-full object-cover opacity-100 transition-opacity duration-700"
            />
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-[2px] transition-colors duration-500"
            />
        </div>
    );
};

export default CloudBackground;
