import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const getPriorityColor = (priority) => {
  switch (priority) {
    case "Urgent":
      return "bg-red-500 text-gray-100";
    case "High":
      return "bg-orange-500 text-gray-100";
    case "Medium":
      return "bg-yellow-400 text-gray-800";
    default:
      return "bg-gray-400 text-gray-100";
  }
};
