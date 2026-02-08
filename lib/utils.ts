import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    try {
        return twMerge(clsx(inputs))
    } catch (e) {
        // Fallback if tailwind-merge or clsx are missing/broken
        return inputs.filter(Boolean).join(" ");
    }
}
