import React from "react"
import Input from "./ui/input"
import Button from "./ui/button"
import Textarea from "./ui/textarea"
const OffCanvas = () => {
    return (<>
        <div className="fixed top-0 bottom-0 right-0 left-0 bg-black opacity-10"> </div>
        <div className="absolute w-[500px] top-0 bottom-0 right-0 p-[1rem] bg-slate-100 border-[2px] border-l-black">
            <div className="flex flex-col gap-4">
                <Input placeholder="請輸入標題..." label="標題" onChange={() => { }} />
                <Textarea placeholder="備註..." label="備註" onChange={() => { }}></Textarea>
            </div>
            <div className="buttonGroup flex justify-end w-full gap-3">
                <Button type="SAVE" onClick={() => { }} />
                <Button type="CANCEL" onClick={() => { }} />
            </div>
        </div>
    </>)
}


export default OffCanvas