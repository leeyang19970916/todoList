import cn from "classnames";
import React from "react";

type ButtonType = "SAVE" | "DELETE" | "EDIT" | "CANCEL";
interface Props {
  type: ButtonType;
  classNames?: string;
  onClick?: () => void;
  onClose?: () => void;
}
const SAVE = {
  variant: "bg-green-900 text-white",
  text: "儲存",
};
const DELETE = {
  variant: "bg-red-900 text-white",
  text: "刪除",
};
const EDIT = {
  variant: "bg-gray-900 text-black",
  text: "編輯",
};
const CANCEL = {
  variant: "bg-red-900 text-white",
  text: "取消",
};
export default function Button({ type, classNames, onClick, onClose }: Props) {
  const { variant, text } = typeHandler(type);
  return (
    <button 
      type="button"
      className={cn(
        "rounded-[16px]  p-[8_16px] bg-green-900",
        variant,
        classNames
      )}
      onClick={onClick}
      onClose={onClose}
    >
      {text}
    </button>
  );
}

function typeHandler(type: ButtonType) {
  switch (type) {
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
