import React, { forwardRef } from "react";
import cn from "classnames";

interface Props {
    placeholder?: string; // 預設為可選
    label: string;
    classNames?: string;
    value?: string; // 可選，因為可能非受控
}

const Input = forwardRef<HTMLInputElement, Props>(
    ({ placeholder, label, classNames, value }, ref) => {
        return (
            <div className={cn("flex flex-col gap-3", classNames)}>
                <label className="text-gray-700 font-medium">
                    {label}
                    <span className="mr-1">:</span>
                </label>
                <input
                    ref={ref}
                    type="text"
                    placeholder={placeholder || "請輸入..."}
                    defaultValue={value}
                    className={cn(
                        "border-gray-300 rounded-lg p-[0.5rem_1rem] text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    )}
                />
            </div>
        );
    }
);

Input.displayName = "Input"; // 為 forwardRef 元件指定 displayName 以便於調試

export default Input;
