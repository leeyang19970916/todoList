import cn from "classnames"
import React from "react"

interface Props {
    placeholder?: string,
    label: string,
    text?: string,
    classNames?: string
    onChange:()=>void
}

const Textarea = ({ placeholder, label, text,classNames,onChange }: Props) => {

    return (
        <div className={cn("flex flex-col gap-2", classNames)}>
            <label className="text-gray-700 font-medium block">
                {label}
                <span className="mr-1">:</span>
            </label>

            <textarea className="block" placeholder={placeholder} name="" id="" onChange={onChange}>{text}</textarea>
        </div>
    )
}



export default Textarea