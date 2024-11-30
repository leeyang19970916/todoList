import React, { createContext, useContext, useState } from "react";
import { todoProps } from "../App";

const TodoListContext = createContext<{
  data: todoProps[];
  updateTodoList: (newData: todoProps[]) => void;
} | null>(null);

export const TodoProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [data, setData] = useState<todoProps[]>(() => {
    try {
      const storedData = localStorage.getItem("todoList");
      return storedData ? JSON.parse(storedData) : [];
    } catch {
      console.error("Failed to parse localStorage data");
      return [];
    }
  });

  const updateTodoList = (newData: todoProps[]) => {
    setData((prevData) => {
      if (JSON.stringify(prevData) !== JSON.stringify(newData)) {
        localStorage.setItem("todoList", JSON.stringify(newData)); // 保存到 localStorage
        return newData;
      }
      return prevData;
    });
  };

  return (
    <TodoListContext.Provider value={{ data, updateTodoList }}>
      {children}
    </TodoListContext.Provider>
  );
};

export const useTodoContext = () => {
  const context = useContext(TodoListContext);
  if (!context) {
    throw new Error("useTodoContext must be used within a TodoProvider");
  }
  return context;
};
