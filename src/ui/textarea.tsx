import cn from "classnames";
import React,{ forwardRef } from "react";

interface Props {
  placeholder?: string;
  label: string;
  value?: string;
  classNames?: string;
}
const Textarea = forwardRef<HTMLTextAreaElement, Props>(
  ({ placeholder, label, value, classNames }, ref) => {
    return (
      <div className={cn("flex flex-col gap-3", classNames)}>
        <label className="text-gray-700 font-medium">
          {label}
          <span className="mr-1">:</span>
        </label>
        <textarea
          ref={ref}
          className="min-h-[100px] p-[0.5rem_1rem]"
          placeholder={placeholder || "備註..."}
          defaultValue={value}
        />
      </div>
    );
  }
);
Textarea.displayName = "Textarea";
export default Textarea;
