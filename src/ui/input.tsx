import React from "react";
import cn from "classnames";

interface Props {
    placeholder: string;
    label: string;
    classNames?: string;
    value?: string; // 输入框的值
    onChange: (value: string) => void; // 父层管理状态的函数
}

const Input = ({
    placeholder,
    label,
    classNames,
    value,
    onChange,
}: Props) => {
    return (
        <div className={cn("flex flex-col gap-2", classNames)}>
            <label className="text-gray-700 font-medium">
                {label}
                <span className="mr-1">:</span>
            </label>
            <input
                type="text"
                placeholder={placeholder ? placeholder : "請輸入..."}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className={cn("border-gray-300 rounded-lg px-[1rem] py-[0.5rem] text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent")} 
            />
        </div>
    );
};


export default Input