import React from "react";
import cn from "classnames";
import { todoProps } from "../App";
import { useTodoManager } from "../hook/useTodoManager";
import trashIcon from "../icon/trash.svg";
import Button from "../ui/button";

export function TodoList({
  classNames,
  onClick,
  todoList,
}: {
  todoList: todoProps[] | null;
  classNames?: string;
  onClick: (id: todoProps["id"]) => void;
}) {
  return (
    <div
      className={cn(
        "border border-red-900 rounded-[0_0_12px_12px] min-h-[50%] p-[16px_12px] flex flex-col overflow-y-scroll",
        classNames
      )}
    >
      {todoList?.map((todo) => (
        <Todo key={todo.id} todo={todo} onClick={onClick} />
      ))}
    </div>
  );
}
export function Todo({
  todo,
  onClick: toggleOffCanVans,
}: {
  todo: todoProps;
  onClick: (id: todoProps["id"]) => void;
}) {
  const { deleteTodo, toggleIsCompleted } = useTodoManager();
  const { title, desc, startDate, isCompleted, id } = todo;

  return (
    <div className="group flex flex-col p-[1rem_0.75rem] w-full gap-[8px] hover:bg-gray-100 hover:rounded-[12px]">
      <div className="flex items-center">
        <input
          type="checkbox"
          defaultChecked={isCompleted}
          onChange={() => toggleIsCompleted(id)}
          className="w-[1rem] h-[1rem] mr-[8px]"
        />
        <span className="flex-1" onClick={() => toggleOffCanVans(id)}>
          {title}
        </span>
        { (
          <Button
            type="DELETE"
            className="bg-transparent flex justify-end w-auto  p-0  opacity-1  group-hover:opacity-100 transition-opacity duration-75 "
            onClick={() => deleteTodo(id)}
          >
            <img
              className="cursor-pointer"
              src={trashIcon}
              height={16}
              width={16}
              alt="trashIcon"
            />
          </Button>
        )}
      </div>
      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-75 flex justify-between">
        <span className="w-[15px] mr-[8px]"></span>
        <span className="flex-1">{desc}</span>
        <span>{startDate}</span>
      </div>
    </div>
  );
}
