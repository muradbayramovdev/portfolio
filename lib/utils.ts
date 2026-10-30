import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function slugifyFileName(fileName: string) {
  return fileName.toLowerCase().replace(/[^a-z0-9.-]+/g, "-");
}

export function safeHref(value: string) {
  if (!value) return "#";
  if (
    value.startsWith("#") ||
    value.startsWith("/") ||
    value.startsWith("mailto:") ||
    value.startsWith("tel:") ||
    value.startsWith("https://") ||
    value.startsWith("http://")
  ) {
    return value;
  }
  return "#";
}

export function isSafeHref(value: string) {
  return safeHref(value) === value;
}
