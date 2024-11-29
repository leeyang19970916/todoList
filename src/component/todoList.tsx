import React, { useCallback } from "react";
import cn from "classnames";
import { todoProps } from "../App";
import { useTodoManager } from "../hook/useTodoManager";
import trashIcon from "../icon/trash.svg";
import Button from "../ui/button";

export const TodoList = ({
  className,
  onClick,
  todoList,
}: {
  todoList: todoProps[] | null;
  className?: string;
  onClick: (id: todoProps["id"]) => void;
}) => {
  return (
    <div
      className={cn(
        "border border-gray-200 bg-gray-100 rounded-[0_12px_12px_12px] h-[500px] p-[16px_12px] flex flex-col overflow-y-scroll",
        className
      )}
    >
      {todoList?.length ? (
        todoList.map((todo) => (
          <Todo key={todo.id} todo={todo} onClick={onClick} />
        ))
      ) : (
        <p className="py-2 text-slate-700 text-center">無待辦事項</p>
      )}
    </div>
  );
};

export const Todo = ({
  todo,
  onClick: toggleOffCanVans,
}: {
  todo: todoProps;
  onClick: (id: todoProps["id"]) => void;
}) => {
  const {deleteTodo, toggleIsCompleted } = useTodoManager();
  const { title, desc, startDate, isCompleted, id } = todo;

  const handleToggleCompleted = useCallback(() => {
    toggleIsCompleted(id);
  }, [id, toggleIsCompleted]);

  const handleDeleteTodo = useCallback(() => {
    deleteTodo(id);
  }, [id, deleteTodo]);

  return (
    <div className="group flex flex-col p-[1rem_0.75rem] w-full gap-[8px] hover:bg-gray-400 hover:text-white hover:rounded-[12px]">
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={isCompleted}
          onChange={handleToggleCompleted}
          className="w-[1rem] h-[1rem] mr-[8px]"
        />
        <span className="flex-1" onClick={() => toggleOffCanVans(id)}>
          {title}
        </span>
        <Button
          type="DELETE"
          className=" flex justify-end w-auto p-[0_0] opacity-1 group-hover:opacity-100 transition-opacity duration-75"
          onClick={handleDeleteTodo}
        >
          <img
            src={trashIcon || "/fallback-icon.svg"}
            height={16}
            width={16}
            alt="trashIcon"
          />
        </Button>
      </div>
      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-75 flex justify-between">
        <span className="w-[15px] mr-[8px]"></span>
        <span className="flex-1">{desc}</span>
        <span>{startDate}</span>
      </div>
    </div>
  );
};
