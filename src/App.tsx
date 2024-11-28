import React, { useState } from "react";
import { TodoList } from "./component/todoList";
import OffCanvas from "./component/offCanvas";
import Button from "./ui/button";
import { tabProps, TabList } from "./component/tabList";
import { useTodoManager } from "./hook/useTodoManager";
import useLocalStorageSync from "./hook/useLocalStorageSync";

export interface todoProps {
  id: number;
  title: string;
  desc?: string;
  startDate: string;
  isCompleted: boolean;
}
export const App: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentTodo, setCurrentTodo] = useState<todoProps | null>(null);
  const { getTodo } = useTodoManager();
  const [todoList] = useLocalStorageSync<todoProps[]>("todoList", []);
  const [filterCompleted, setFilterCompleted] = useState<boolean | null>(null);

  const handleTabChange = (name: tabProps["name"]) => {
    const isCompleted = name === "completed" ? true : false
    setFilterCompleted(isCompleted);
  };

  const handleEditTodo = (id: todoProps["id"]) => {
    setCurrentTodo(getTodo(id));
    setIsOpen(true);
  };

  const handleAddTodo = () => {
    setCurrentTodo(null);
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setCurrentTodo(null);
  };

  return (
    <div className="relative h-[100vh] flex flex-nowrap">
      <div className="w-full p-[1rem_3rem]">
        <div className="py-[2rem]">
          <h1 className="text-2xl font-bold">Todo List</h1>
        </div>
        <div className="w-[750px] flex justify-end">
          <Button type="ADD" onClick={handleAddTodo} />
        </div>
        <TabList onTabChange={handleTabChange} />
        <TodoList
          todoList={filterCompleted === null ? todoList : todoList.filter(todo => todo.isCompleted === filterCompleted)}
          classNames="w-[750px]"
          onClick={handleEditTodo}
        />
      </div>
      {isOpen && (
        <OffCanvas
          onClose={handleClose}
          todo={currentTodo}
        />
      )}
    </div>
  );
};
