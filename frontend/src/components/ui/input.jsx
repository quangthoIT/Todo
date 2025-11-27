import * as React from "react";
import { cn } from "@/lib/utils";

function Input({ className, type = "text", icon, label, id, ...props }) {
  const inputId = id || React.useId();

  return (
    <div className="w-full">
      {/* Label */}
      {label && (
        <label
          htmlFor={inputId}
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          {label}
        </label>
      )}

      {/* Wrapper để canh icon */}
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            {icon}
          </div>
        )}
        <input
          id={inputId}
          type={type}
          data-slot="input"
          className={cn(
            "w-full h-10 min-w-0 rounded-lg border border-gray-300 bg-white dark:bg-gray-800 py-2 text-base text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 shadow-sm transition-colors outline-none",
            "focus-visible:border-blue-500 focus-visible:ring-blue-500 focus-visible:ring-[1px]",
            "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
            icon ? "pl-10 pr-3" : "px-4",
            className
          )}
          {...props}
        />
      </div>
    </div>
  );
}

export { Input };
