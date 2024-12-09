import dayjs from "dayjs";
import { v4 as uuidv4 } from "uuid";
import { useTodoContext, TodoProps as T } from "../store/todoContext";

type AddProps = Pick<T, "title" | "desc">;
type DeleteProps =T["id"];
type EditProps = Pick<T, "id" | "title" | "desc">;
type ToggleCompleted=Pick<T,"id"|"isCompleted">


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
  const toggleTodoIsCompleted = ({id,isCompleted}:ToggleCompleted) => {
    updateTodoList(todoList.map((todo: T) =>
      todo.id === id ? { ...todo, isCompleted: !isCompleted } : todo
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

