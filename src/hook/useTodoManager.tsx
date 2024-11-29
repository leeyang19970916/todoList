import dayjs from "dayjs";
import { todoProps } from "../App";
import useLocalStorageSync from "./useLocalStorageSync";
import { useCallback } from "react";
import { v4 as uuidv4 } from "uuid";


type addProps = Pick<todoProps, "title" | "desc">;
type deleteProps = todoProps["id"];
type editProps = Pick<todoProps, "id" | "title" | "desc">;

export function useTodoManager() {

  const [todoList, updateTodoList] = useLocalStorageSync<todoProps[]>("todoList", []);

  const addTodo = useCallback(({ title, desc }: addProps) => {
    const newTodo: todoProps = {
      id: uuidv4(),
      title,
      desc,
      startDate: dayjs().format("YYYY/MM/DD"),
      isCompleted: false,
    };
    updateTodoList([newTodo, ...todoList]);
  }, [updateTodoList]);
  

  const editTodo = ({ id, title, desc }: editProps) => {
    const updatedList = todoList.map((todo) =>
      todo.id === id ? { ...todo, title, desc } : todo
    );
    updateTodoList(updatedList);
  };

  const deleteTodo = (id: deleteProps) => {
    const updatedList = todoList.filter((todo) => todo.id !== id);
    updateTodoList(updatedList);
  };

  const toggleIsCompleted = (id: todoProps["id"]) => {
    const updatedList = todoList.map((todo) =>
      todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
    );
    updateTodoList(updatedList);
  };

  const getTodo = (id: todoProps["id"]) => {
    return todoList.find((todo) => todo.id === id) || null;
  };

  return {
    todoList,
    addTodo,
    editTodo,
    deleteTodo,
    toggleIsCompleted,
    getTodo,
  };
}
