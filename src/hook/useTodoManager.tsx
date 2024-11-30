import dayjs from "dayjs";
import { v4 as uuidv4 } from "uuid";
import { useTodoContext, TodoProps as T } from "../store/todoContext";
import DiaLog from "../component/DiaLog";

type AddProps = Pick<T, "title" | "desc">;
type DeleteProps = T["id"];
type EditProps = Pick<T, "id" | "title" | "desc">;

export function useTodoManager() {
  const { todoList, updateTodoList } = useTodoContext();

  const addTodo = ({ title, desc }: AddProps) => {
    const newTodo: T = {
      id: uuidv4(),
      title,
      desc,
      startDate: dayjs().format("YYYY/MM/DD"),
      isCompleted: false,
    };
    updateTodoList([newTodo, ...todoList]);

  };
  const editTodo = ({ id, title, desc }: EditProps) => {
    updateTodoList(todoList.map((todo: T) =>
      todo.id === id ? { ...todo, title, desc } : todo
    ));
  };
  const deleteTodo = (id: DeleteProps) =>
    updateTodoList(todoList.filter((todo: T) => todo.id !== id));


  const toggleTodoIsCompleted = (id: T["id"]) => {
    updateTodoList(todoList.map((todo: T) =>
      todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
    ));
  };
  const getTodo = (id: T["id"]) => todoList.find((todo: T) => todo.id === id) || null;
  return {
    todoList,
    addTodo,
    editTodo,
    deleteTodo,
    toggleTodoIsCompleted,
    getTodo,
  };
}

