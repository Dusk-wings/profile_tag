"use client";

import React, { useEffect, useRef, useState } from 'react';
import { Controller, useForm } from "react-hook-form";
import gsap from 'gsap';
import { Input } from './ui/Input';
import ImageUpload from './ui/ImageUpload';
import { Button } from './ui/Button';
import { Github, Linkedin, Link as LinkIcon, Mail, User, Image as ImageIcon, Heart, Settings } from "lucide-react";
import BackgroundPicker from './BackgroundPicker';
import { cn } from '@/lib/utils';

interface AccountFormProps {
    onBackgroundChange: (url: string | null) => void;
    onMusicUpload: (file: File) => void;
}

interface FormValues {
    name: string;
    email: string;
    linkedin: string;
    github: string;
    otherLink: string;
    profilePhoto: File | null;
    backgroundImage: File | null;
    summary: string;
}

const AccountForm: React.FC<AccountFormProps> = ({
    onBackgroundChange,
    onMusicUpload
}) => {
    const formRef = useRef<HTMLDivElement>(null);
    const [backgroundPickerOpen, setBackgroundPickerOpen] = useState(false);
    const [recentUploads, setRecentUploads] = useState<string[]>([]);
    const [liked, setLiked] = useState<boolean>(false);
    const { register, control, handleSubmit, watch, formState: { errors } } = useForm<FormValues>({
        defaultValues: {
            name: '',
            email: '',
            linkedin: '',
            github: '',
            otherLink: '',
            profilePhoto: null,
            backgroundImage: null
        }
    });

    const backgroundImage = watch('backgroundImage');

    // Handle custom file upload from picker
    const handleCustomBackground = (file: File) => {
        const url = URL.createObjectURL(file);
        onBackgroundChange(url);
        // Add to recent uploads mock
        setRecentUploads(prev => [url, ...prev].slice(0, 3));
        setBackgroundPickerOpen(false);
    };

    const handleSelectBackground = (url: string) => {
        onBackgroundChange(url);
        setBackgroundPickerOpen(false);
    };

    useEffect(() => {
        if (formRef.current) {
            gsap.fromTo(
                formRef.current.children,
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out' }
            );
        }
    }, []);

    const onSubmit = (data: FormValues) => {
        console.log("Form Data:", data);
        alert("Form Submitted! Check console for details.");
    };

    return (
        <div className="w-full max-w-5xl mx-auto p-4 md:p-8" ref={formRef}>

            <div
                className="bg-zinc-500/20 backdrop-blur-xl rounded-xl shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[600px] transition-colors duration-500"
            >

                {/* Left Column: Profile Image (Full Height on desktop) */}
                <div
                    className="w-full md:w-1/3 min-h-[300px] md:min-h-auto border-b md:border-b-0 md:border-r border-gray-200/50 p-6 flex flex-col justify-center items-center relative overflow-hidden group transition-colors duration-500"
                >

                    {/* Like Button Overlay */}
                    <div className="absolute top-4 right-4 z-10">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setLiked(!liked)}
                            className="rounded-full bg-white/10 hover:bg-white/30 backdrop-blur-md transition-all active:scale-90"
                        >
                            <Heart
                                className={cn(
                                    "w-6 h-6 transition-all duration-300 ease-in-out",
                                    liked ? "scale-110 fill-red-500 text-red-500" : "text-white/80 hover:text-white"
                                )}
                            />
                        </Button>
                    </div>

                    <Controller
                        control={control}
                        name="profilePhoto"
                        render={({ field: { onChange, value } }) => (
                            <ImageUpload
                                label="Profile Photo"
                                id="profile-photo"
                                value={value}
                                onChange={onChange}
                                className="w-full h-full flex flex-col"
                                fillHeight={true}
                                // Pass props to ensure it fills height and looks nice
                                previewUrl={value instanceof File ? URL.createObjectURL(value) : undefined}
                            />
                        )}
                    />
                    {/* Hint text overlay if needed, or rely on ImageUpload's empty state */}
                    <div className="absolute inset-x-0 bottom-4 text-center text-xs text-gray-400 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                        Drag & Drop your photo here
                    </div>
                </div>

                {/* Right Column: Form Fields */}
                <div className="w-full md:w-2/3 p-6 md:p-8 relative">

                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                        <h2
                            className="text-3xl font-bold transition-colors duration-300 text-indigo-600"
                        >
                            Profile Tagger
                        </h2>

                        <Button
                            variant="outline"
                            onClick={() => setBackgroundPickerOpen(true)}
                            className="flex items-center gap-2 transition-all hover:bg-zinc-100 bg-white border-zinc-200 text-zinc-700"
                        >
                            <Settings className="w-4 h-4" />
                            Customize
                        </Button>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

                        <Input
                            label="Full Name"
                            placeholder="John Doe"
                            icon={<User className="w-4 h-4 text-indigo-500" />}
                            error={errors.name?.message}
                            {...register("name", { required: "Name is required" })}
                        />

                        <Input
                            label="Email Address"
                            placeholder="john@example.com"
                            type="email"
                            icon={<Mail className="w-4 h-4 text-indigo-500" />}
                            error={errors.email?.message}
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: "Invalid email address"
                                }
                            })}
                        />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <Input
                                label="LinkedIn URL"
                                placeholder="https://linkedin.com/in/..."
                                icon={<Linkedin className="w-4 h-4 text-indigo-500" />}
                                {...register("linkedin")}
                            />

                            <Input
                                label="GitHub URL"
                                placeholder="https://github.com/..."
                                icon={<Github className="w-4 h-4 text-indigo-500" />}
                                {...register("github")}
                            />
                        </div>

                        <Input
                            label="Other Link"
                            placeholder="https://portfolio.com"
                            icon={<LinkIcon className="w-4 h-4 text-indigo-500" />}
                            {...register("otherLink")}
                        />

                        <div className="space-y-2">
                            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-700">
                                Professional Summary
                            </label>
                            <textarea
                                className="flex min-h-[100px] w-full rounded-md border border-gray-300 bg-white/50 px-3 py-2 text-sm ring-offset-background placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 disabled:cursor-not-allowed disabled:opacity-50 text-gray-900 transition-all duration-200 resize-none"
                                placeholder="Tell us about yourself..."
                                {...register("summary")}
                            />
                        </div>

                        <div className="pt-6 mt-4">
                            <Button
                                type="submit"
                                className="w-full py-6 text-lg font-semibold text-white shadow-xl transform transition-all duration-200 bg-indigo-600 hover:bg-indigo-700"
                            >
                                Save Profile
                            </Button>
                        </div>

                    </form>
                </div>
            </div>

            <BackgroundPicker
                isOpen={backgroundPickerOpen}
                onClose={() => setBackgroundPickerOpen(false)}
                onSelect={handleSelectBackground}
                onCustomUpload={handleCustomBackground}
                onMusicUpload={onMusicUpload}
                recentUploads={recentUploads}
            />
        </div>
    );
};

export default AccountForm;
