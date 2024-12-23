import React, { useCallback, useRef, useState } from "react";
import Input from "../ui/input";
import Button from "../ui/button";
import Textarea from "../ui/textarea";
import { TodoProps as T } from "../store/todoContext";
import { useTodoHandler } from "../hook/useTodoHandler";
import { useToastContext, defaultToastContent } from "../store/toastContext";
import ToggleSwtich from "../ui/toggleSwtich";

interface Props {
  onClose: () => void;
  todo: T | null;
}

const OffCanvas: React.FC<Props> = ({ onClose, todo }) => {
  const titleRef = useRef<HTMLInputElement>(null);
  const descRef = useRef<HTMLTextAreaElement>(null);
  const [isPin,setIsPin]=useState<boolean>(Boolean(todo?.isPin))
  const { addTodo, editTodo } = useTodoHandler();
  const { handleToast } = useToastContext()
  const handleSaveTodo = () => {
    const title = titleRef.current?.value.trim() || "";
    const desc = descRef.current?.value.trim() || "";
    if (!title) {
      handleToast({ ...defaultToastContent, status: "error", value: "標題不能為空白" })
      return
    }
    if (todo?.id) {
      editTodo({ isPin, title, desc, id: todo.id });

      handleToast({ ...defaultToastContent, value: "編輯成功" })
    } else {
      addTodo({ title, desc, isPin });

      handleToast({ ...defaultToastContent, value: "新增成功" })
    }
    onClose();
  };
  const handlePinChange=useCallback(()=>setIsPin(!isPin),[])

  return (
    <>
      <div
        className="fixed top-0 bottom-0 right-0 left-0 bg-black opacity-10"
        onClick={onClose}
      ></div>
      <div className="absolute w-[500px] top-0 bottom-0 right-0 p-[1rem] bg-slate-100 border-[2px] border-l-slate-400">
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
          {<ToggleSwtich checked={todo?.isPin ? true : false} label="釘選" onChange={handlePinChange} />}
          {todo ? (
            <div className="text-end text-gray-500">
              建立日期: {todo.startDate}
            </div>
          ) : null}
        </div>
        <div className="buttonGroup flex justify-end w-full gap-3 mt-5">
          {todo ? (
            <Button classNames="w-[200px]" type="EDIT" onClick={handleSaveTodo} />
          ) : (
            <Button classNames="w-[200px]" type="SAVE" onClick={handleSaveTodo} />
          )}
          <Button type="CANCEL" onClick={onClose} />
        </div>
      </div>
    </>
  );
};

export default OffCanvas;
