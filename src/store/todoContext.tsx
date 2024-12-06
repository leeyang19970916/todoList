import React, { createContext, useContext, useState } from "react";
import useFetchTodo from "../api/useFetchTodo";
export interface TodoProps {
  id: string;
  title: string;
  desc?: string;
  startDate: string;
  isCompleted: boolean;
}

type T=TodoProps

const TodoContext = createContext<{
  todoList: T[];
  updateTodoList: (newTodoList: T[]) => void;
} | null>(null);

export const TodoProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {

  useFetchTodo()
  const [todoList, setTodoList] = useState<T[]>(() => {
    try {
      const storedData = localStorage.getItem("todoList");
      return storedData ? JSON.parse(storedData) : [];
    } catch {
      console.error("Failed to parse localStorage data");
      return [];
    }
  });

  const updateTodoList = (newList: T[]) => {
    setTodoList((prevList) => {
      if (JSON.stringify(prevList) !== JSON.stringify(newList)) {
        localStorage.setItem("todoList", JSON.stringify(newList));
        return newList;
      }
      return prevList;
    });
  };

  return (
    <TodoContext.Provider value={{ todoList, updateTodoList }}>
      {children}
    </TodoContext.Provider>
  );
};

export const useTodoContext = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error("useTodoContext must be used within a TodoProvider");
  }
  return context;
};
