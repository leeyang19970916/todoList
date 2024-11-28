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
        <div className={cn("flex flex-col gap-3", classNames)}>
            <label className="text-gray-700 font-medium ">
                {label}
                <span className="mr-1">:</span>
            </label>

            <textarea className="min-h-[100px] p-[0.5rem_1rem]" placeholder={placeholder?placeholder:"備註..."} name="" id="" onChange={onChange}>{text}</textarea>
        </div>
    )
}



export default Textarea