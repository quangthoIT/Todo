import * as React from "react";

import { cn } from "@/lib/utils";

function Textarea({ label, id, className, ...props }) {
  const textareaId = id || React.useId();
  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={textareaId}
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          {label}
        </label>
      )}
      <textarea
        data-slot="textarea"
        className={cn(
          "border-gray-300 placeholder:text-muted-foreground focus-visible:border-blue-500 focus-visible:ring-blue-500 focus-visible:ring-[1px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-24 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        {...props}
      />
    </div>
  );
}

export { Textarea };
