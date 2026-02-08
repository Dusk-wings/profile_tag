"use client";

import React, { useState, useCallback } from 'react';
import Cropper, { Area } from 'react-easy-crop';
import { Button } from '@/components/ui/Button';
import getCroppedImg from '@/lib/canvasUtils';
import { ZoomIn, ZoomOut, Check, X } from 'lucide-react';

interface ImageCropperProps {
    imageSrc: string;
    onCropComplete: (croppedImage: string) => void;
    onCancel: () => void;
}

const ImageCropper: React.FC<ImageCropperProps> = ({ imageSrc, onCropComplete, onCancel }) => {
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

    const onCropChange = (crop: { x: number; y: number }) => {
        setCrop(crop);
    };

    const onZoomChange = (zoom: number) => {
        setZoom(zoom);
    };

    const onCropCompleteHandler = useCallback((croppedArea: Area, croppedAreaPixels: Area) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);

    const handleSave = async () => {
        try {
            if (croppedAreaPixels) {
                const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);
                if (croppedImage) {
                    onCropComplete(croppedImage);
                }
            }
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            <div className="w-full max-w-2xl bg-white dark:bg-zinc-900 rounded-xl overflow-hidden shadow-2xl flex flex-col h-[600px]">
                <div className="relative flex-1 bg-black">
                    <Cropper
                        image={imageSrc}
                        crop={crop}
                        zoom={zoom}
                        aspect={4 / 5}
                        onCropChange={onCropChange}
                        onCropComplete={onCropCompleteHandler}
                        onZoomChange={onZoomChange}
                        minZoom={1}
                        maxZoom={3}
                    />
                </div>

                <div className="p-4 bg-white dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800 space-y-4">
                    <div className="flex items-center gap-4">
                        <ZoomOut className="w-4 h-4 text-zinc-500" />
                        <input
                            type="range"
                            value={zoom}
                            min={1}
                            max={3}
                            step={0.1}
                            aria-labelledby="Zoom"
                            onChange={(e) => setZoom(Number(e.target.value))}
                            className="flex-1"
                        />
                        <ZoomIn className="w-4 h-4 text-zinc-500" />
                    </div>

                    <div className="flex justify-end gap-3">
                        <Button variant="outline" onClick={onCancel} className="gap-2">
                            <X className="w-4 h-4" /> Cancel
                        </Button>
                        <Button onClick={handleSave} className="gap-2">
                            <Check className="w-4 h-4" /> Save Crop
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ImageCropper;
