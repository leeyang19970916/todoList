import cn from "classnames";
import React, { ReactElement, ReactNode } from "react";

type ButtonType = "ADD"|"SAVE" | "DELETE" | "EDIT" | "CANCEL";
interface Props {
  type: ButtonType;
  className?: string;
  onClick?: () => void;
  children?:ReactNode
}
const ADD = {
  variant: "bg-blue-500 text-white hover:bg-blue-700",
  text: "新增 +",
};
const SAVE = {
  variant: "bg-green-500 text-white hover:bg-green-700",
  text: "儲存",
};
const DELETE = {
  variant: "",
  text: "刪除",
};
const EDIT = {
  variant: "bg-pink-500 text-white hover:bg-pink-700",
  text: "編輯",
};
const CANCEL = {
  variant: "bg-red-500 text-white hover:bg-red-700",
  text: "取消",
};
export default function Button({ type, className, onClick,children }: Props) {
  const { variant, text } = typeHandler(type);
  return (
    <button
      type="button"
      className={cn(
        "rounded-[50px] p-[8px_16px] w-[100px]",
        variant,
        className
      )}
      onClick={onClick}
    >
     {children?children:text} 
    </button>
  );
}

function typeHandler(type: ButtonType) {
  switch (type) {
    case "ADD":
      return ADD;
    case "SAVE":
      return SAVE;
    case "DELETE":
      return DELETE;
    case "EDIT":
      return EDIT;
    case "CANCEL":
      return CANCEL;
    default:
      throw new Error(`Unhandled button type: ${type}`);
  }
}
