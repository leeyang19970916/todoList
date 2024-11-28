import cn from "classnames";
import React from "react";

type ButtonType = "ADD"|"SAVE" | "DELETE" | "EDIT" | "CANCEL";
interface Props {
  type: ButtonType;
  classNames?: string;
  onClick?: () => void;
}
const ADD = {
  variant: "bg-blue-900 text-white",
  text: "新增",
};
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
export default function Button({ type, classNames, onClick }: Props) {
  const { variant, text } = typeHandler(type);
  return (
    <button
      type="button"
      className={cn(
        "rounded-[50px]  p-[8px_16px] bg-green-900 w-[100px]",
        variant,
        classNames
      )}
      onClick={onClick}
    >
      {text}
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
