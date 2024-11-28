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
  const [todoList, updateList] = useLocalStorageSync("todoList");
  console.log(updateList)

  const handleTabChange = (name: tabProps["name"]) => {
    const isCompleted:boolean = name === "completed";
    // setTodoList(todoList.filter(todo => todo.isCompleted === isCompleted));
    console.log(isCompleted)
  }
  const handleEditTodo = async (id: todoProps["id"]) => {
    try {
      setCurrentTodo(useTodoManager().getTodo(id));
      setIsOpen(true); 
    } catch (error) {
      console.error("Failed to fetch todo:", error);
    }
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
          todoList={todoList}
          classNames="w-[750px]"
          onClick={(id) => handleEditTodo(id)}
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


