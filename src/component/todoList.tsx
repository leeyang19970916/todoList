import React from "react";
import cn from "classnames";
import { todoProps } from "../App";
import { useTodoManager } from "../hook/useTodoManager";

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
  onClick:toggleOffCanVans,
}: {
  todo: todoProps;
  onClick: (id: todoProps["id"]) => void;
}) {
  const { deleteTodo, toggleIsCompleted } = useTodoManager();
  const { title, desc, startDate, isCompleted, id } = todo;

  return (
    <div className="group flex flex-col p-[1rem_0.75rem] w-full gap-[8px] hover:bg-gray-100 hover:rounded-[12px]">
      <div className="flex ">
        <input
          type="checkbox"
          checked={isCompleted}
          onChange={() => toggleIsCompleted(id)}
          className="w-[50px]"
        />
        <div className="flex-1" onClick={() => toggleOffCanVans(id)}>
          {title}
        </div>
        <div
          className="text-red-500 cursor-pointer  opacity-0  group-hover:opacity-100 transition-opacity duration-75 "
          onClick={() => deleteTodo(id)}
        >
          刪
        </div>
      </div>
      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-75 flex justify-between">
        <span className="w-[50px]"></span>
        <span className="flex-1">{desc}</span>
        <span>{startDate}</span>
      </div>
    </div>
  );
}
