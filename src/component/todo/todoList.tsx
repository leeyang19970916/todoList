import cn from "classnames";
import { TodoProps as T } from "../../store/todoContext";
import { useTodoManager } from "../../hook/useTodoManager";
import trashIcon from "../../icon/trash.svg";
import Button from "../../ui/button";
import React from "react";
import { defaultDiaLogContent, useDialogContext } from "../../store/diaLogContext";


export const TodoList = ({
  classNames,
  onClick,
  todoList,
}: {
  todoList: T[] | null;
  classNames?: string;
  onClick: (id: T["id"]) => void;
}) => {
  return (
    <div
      className={cn(
        "border border-gray-200 bg-gray-100 rounded-[0_12px_12px_12px] h-[500px] p-[16px_12px] flex flex-col overflow-y-scroll",
        classNames
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
  todo: T;
  onClick: (id: T["id"]) => void;
}) => {
  const { deleteTodo, toggleTodoIsCompleted } = useTodoManager();
  const { title, desc, startDate, isCompleted, id } = todo;
  const {handleDialog}=useDialogContext()
  const handleDelTodo=()=>{
    deleteTodo(id)
    handleDialog({...defaultDiaLogContent,value:"刪除成功"})
  }
  const handleToggleCompleted=()=>{
    toggleTodoIsCompleted({id,isCompleted})
    const value=!isCompleted? "轉入已完成" :"轉入進行中"
    handleDialog({...defaultDiaLogContent,value})
  }

  return (
    <div className="group flex flex-col p-[1rem_0.75rem] w-full gap-[8px] hover:bg-gray-200 hover:text-slate-600 hover:rounded-[12px]">
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={isCompleted}
          onChange={handleToggleCompleted}
          className="w-[1rem] h-[1rem] mr-[8px]"
        />
        <span
          className="flex-1 flex-nowrap text-ellipsis overflow-hidden pr-[1rem] cursor-pointer whitespace-nowrap hover:text-slate-900"
          onClick={() => toggleOffCanVans(id)}
        >
          {title}
        </span>
        <Button
          type="DELETE"
          classNames="flex justify-end w-auto !p-[0] opacity-1 group-hover:opacity-100 transition-opacity duration-75"
          onClick={handleDelTodo}
        >
          <img
            src={trashIcon}
            height={16}
            width={16}
            alt="trashIcon"
          />
        </Button>
      </div>
      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-75 flex justify-between">
        <span className="w-[15px] mr-[8px]"></span>
        <span className="flex-1 flex-nowrap whitespace-nowrap text-ellipsis overflow-hidden pr-[1rem]">
          {desc}
        </span>
        <span>{startDate}</span>
      </div>
    </div>
  );
};
