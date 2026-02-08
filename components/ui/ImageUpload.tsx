"use client";

import React, { useRef, useState } from 'react';
import { Camera, Image as ImageIcon, Upload } from "lucide-react";
import { cn } from '@/lib/utils';
import ImageCropper from '@/components/ImageCropper';

interface ImageUploadProps {
    label: string;
    value?: string | File | null;
    onChange: (file: File | null) => void;
    className?: string;
    previewUrl?: string | null;
    id?: string;
    accept?: string;
    fillHeight?: boolean;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
    label,
    value,
    onChange,
    className,
    previewUrl,
    id,
    accept = "image/*",
    fillHeight = false
}) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [internalPreview, setInternalPreview] = useState<string | null>(previewUrl || null);

    const [showCropper, setShowCropper] = useState(false);
    const [originalImageSrc, setOriginalImageSrc] = useState<string | null>(null);

    const handleFileSelect = (file: File) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            setOriginalImageSrc(reader.result as string);
            setShowCropper(true);
        };
        reader.readAsDataURL(file);
        // Clear input value so same file can be selected again if needed
        if (inputRef.current) inputRef.current.value = '';
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            handleFileSelect(file);
        }
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const file = e.dataTransfer.files?.[0];
        if (file && file.type.startsWith('image/')) {
            handleFileSelect(file);
        }
    };

    const handleCropComplete = async (croppedImageBase64: string) => {
        setInternalPreview(croppedImageBase64);
        setShowCropper(false);

        // Convert base64 to file for form submission if needed by parent
        const res = await fetch(croppedImageBase64);
        const blob = await res.blob();
        const file = new File([blob], "profile-cropped.jpg", { type: "image/jpeg" });
        onChange(file);
    };

    const handleCancelCrop = () => {
        setShowCropper(false);
        setOriginalImageSrc(null);
    };

    const handleClick = () => {
        inputRef.current?.click();
    };

    return (
        <div className={cn("w-full space-y-2", className)}>
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-700 dark:text-gray-200">
                {label}
            </label>

            <div
                onClick={handleClick}
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
                className={cn(
                    "relative flex items-center justify-center w-full transition-all duration-300 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50/50 dark:hover:bg-gray-800/50 group",
                    internalPreview ? "border-transparent p-0 overflow-hidden" : "border-gray-300 dark:border-gray-600 bg-white/50 dark:bg-black/20",
                    fillHeight ? "flex-1 min-h-[12rem] h-full" : "h-32"
                )}
            >
                <input
                    type="file"
                    ref={inputRef}
                    onChange={handleFileChange}
                    className="hidden"
                    accept={accept}
                    id={id}
                />

                {internalPreview ? (
                    <div className="relative w-full h-full min-h-[128px]">
                        <img
                            src={internalPreview}
                            alt="Preview"
                            className="object-cover w-full h-full rounded-lg"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg">
                            <Camera className="w-8 h-8 text-white" />
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-6 text-center">
                        <Upload className="w-8 h-8 mb-2 text-gray-400 group-hover:text-indigo-500 transition-colors" />
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                            Click or drag to upload
                        </p>
                    </div>
                )}
            </div>

            {showCropper && originalImageSrc && (
                <div onClick={(e) => e.stopPropagation()}>
                    <ImageCropper
                        imageSrc={originalImageSrc}
                        onCropComplete={handleCropComplete}
                        onCancel={handleCancelCrop}
                    />
                </div>
            )}
        </div>
    );
};

export default ImageUpload;
