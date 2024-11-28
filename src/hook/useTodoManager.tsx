import dayjs from "dayjs";
import { todoProps } from "../App";
import useLocalStorageSync from "./useLocalStorageSync";

type AddProps = Pick<todoProps, "title" | "desc">;
type DeleteProps = todoProps["id"];
type EditProps = Pick<todoProps, "id" | "title" | "desc">;

export function useTodoManager() {

  const [todoList, updateTodoList] = useLocalStorageSync<todoProps[]>("todoList", []);

  const addTodo = ({ title, desc }: AddProps) => {
    const newTodo: todoProps = {
      id: Math.random(), 
      title,
      desc,
      startDate: dayjs().format("YYYY/MM/DD"),
      isCompleted: false,
    };
    updateTodoList([...todoList, newTodo]);
  };

  const editTodo = ({ id, title, desc }: EditProps) => {
    const updatedList = todoList.map((todo) =>
      todo.id === id ? { ...todo, title, desc } : todo
    );
    updateTodoList(updatedList);
  };

  const deleteTodo = (id: DeleteProps) => {
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
