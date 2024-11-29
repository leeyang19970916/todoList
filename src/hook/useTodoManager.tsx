import dayjs from "dayjs";
import { todoProps } from "../App";
import useLocalStorageSync from "./useLocalStorageSync";

type addProps = Pick<todoProps, "title" | "desc">;
type deleteProps = todoProps["id"];
type editProps = Pick<todoProps, "id" | "title" | "desc">;

export function useTodoManager() {

  const [todoList, updateTodoList] = useLocalStorageSync<todoProps[]>("todoList", []);

  const addTodo = ({ title, desc }: addProps) => {
    console.log("add")
    const newTodo: todoProps = {
      id: Math.random(), 
      title,
      desc,
      startDate: dayjs().format("YYYY/MM/DD"),
      isCompleted: false,
    };
    updateTodoList([newTodo,...todoList ]);
  };

  const editTodo = ({ id, title, desc }: editProps) => {
    console.log("edit")
    const updatedList = todoList.map((todo) =>
      todo.id === id ? { ...todo, title, desc } : todo
    );
    updateTodoList(updatedList);
  };

  const deleteTodo = (id: deleteProps) => {
    console.log("delete")
    const updatedList = todoList.filter((todo) => todo.id !== id);
    updateTodoList(updatedList);
  };

  const toggleIsCompleted = (id: todoProps["id"]) => {
    console.log("add")
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
