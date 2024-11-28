import React, { useRef } from "react";
import Input from "../ui/input";
import Button from "../ui/button";
import Textarea from "../ui/textarea";
import { todoProps } from "./todoList";

interface OffCanvasProps {
  onClose: () => void;
  todo: todoProps | null; // 当前编辑的 todo 数据，新增模式时为 null
}

const OffCanvas: React.FC<OffCanvasProps> = ({ onClose, todo }) => {
  const titleRef = useRef<HTMLInputElement>(null);
  const descRef = useRef<HTMLTextAreaElement>(null);

  const saveHandler = () => {
    const title = titleRef.current?.value || "";
    const desc = descRef.current?.value || "";
    console.log("Saving Data:", { title, desc });
    onClose();
  };

  return (
    <>
      <div
        className="fixed top-0 bottom-0 right-0 left-0 bg-black opacity-10"
        onClick={onClose}
      ></div>
      <div className="absolute w-[500px] top-0 bottom-0 right-0 p-[1rem] bg-slate-100 border-[2px] border-l-black">
        <div className="flex flex-col gap-4">
          <Input
            ref={titleRef}
            placeholder="請輸入標題..."
            label="標題"
            value={todo?.title || ""}
          />
          <Textarea
            ref={descRef}
            placeholder="備註..."
            label="備註"
            value={todo?.desc || ""}
          />
        </div>
        <div className="buttonGroup flex justify-end w-full gap-3 mt-5">
        {todo? <Button type="EDIT" onClick={saveHandler}/>:<Button type="SAVE" onClick={saveHandler} />}  
          <Button type="CANCEL" onClick={onClose} />
        </div>
      </div>
    </>
  );
};

export default OffCanvas;
