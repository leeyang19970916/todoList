import React, { useEffect, useState } from "react";
import cn from "classnames";
import { toggleIsCompleted, deleteTodo, getLocalList } from "../actions";

export interface todoProps {
  id: number;
  title: string;
  desc?: string;
  startDate: string;
  isCompleted: boolean;
}
const list: todoProps[] = getLocalList()

export function TodoList({
  classNames,
  onClick,
}: {
  classNames?: string;
  onClick: (id:todoProps["id"]) => void;
}) {
  const [todos, setTodos] = useState<todoProps[]>(list);

  useEffect(() => {
    setTodos(todos)
  }, [todos])
  return (
    <div
      className={cn(
        "border border-red-900 rounded-[0_0_12px_12px] min-h-[50%] p-[16px_12px] flex flex-col overflow-y-scroll",
        classNames
      )}
    >
      {todos.map((todo) => (
        <Todo key={todo.id} todo={todo} onClick={onClick} />
      ))}
    </div>
  );
}

export function Todo({
  todo,
  onClick,
}: {
  todo: todoProps;
  onClick: (id:todoProps["id"]) => void;
}) {
  const { title, desc, startDate, isCompleted, id } = todo;

  return (
    <div className="group flex flex-col p-[1rem_0.75rem] w-full gap-[8px] hover:bg-gray-100 hover:rounded-[12px]">
      <div className="flex ">
      <input
        type="checkbox"
        checked={isCompleted}
        onChange={() => toggleIsCompleted({ id, isCompleted })}
        className="w-[50px]"
      />
      <div className="flex-1" onClick={()=>onClick(id)}>
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
