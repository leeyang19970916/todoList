import dayjs from "dayjs";
import { todoProps } from "../App";
import { useContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useTodoContext } from "../store/todoListContext";

type addProps = Pick<todoProps, "title" | "desc">;
type deleteProps = todoProps["id"];
type editProps = Pick<todoProps, "id" | "title" | "desc">;

export function useTodoManager() {
  const { data, updateTodoList } = useTodoContext();
  
  const addTodo = ({ title, desc }: addProps) => {
    const newTodo: todoProps = {
      id: uuidv4(),
      title,
      desc,
      startDate: dayjs().format("YYYY/MM/DD"),
      isCompleted: false,
    };
    console.log("add");
    updateTodoList([newTodo, ...data]);
  };

  const editTodo = ({ id, title, desc }: editProps) => {
    console.log("edit");
    const updatedList = data.map((todo: todoProps) =>
      todo.id === id ? { ...todo, title, desc } : todo
    );
    updateTodoList(updatedList);
  };

  const deleteTodo = (id: deleteProps) => {
    const updatedList = data.filter((todo: todoProps) => todo.id !== id);
    console.log("delete id:", id, "in deleteTodo func");
    updateTodoList(updatedList);
  };

  const toggleIsCompleted = (id: todoProps["id"]) => {
    console.log("isCompleted");
    const updatedList = data.map((todo: todoProps) =>
      todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
    );
    updateTodoList(updatedList);
  };

  const getTodo = (id: todoProps["id"]) => {
    return data.find((todo: todoProps) => todo.id === id) || null;
  };
  console.log("data最新的1:", data);
  return {
    data,
    addTodo,
    editTodo,
    deleteTodo,
    toggleIsCompleted,
    getTodo,
  };
}
