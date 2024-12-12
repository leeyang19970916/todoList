import dayjs from "dayjs";
import { v4 as uuidv4 } from "uuid";
import { useTodoContext, TodoProps as T } from "../store/todoContext";

type AddProps = Pick<T, "title" | "desc" | "isPin">;
type DeleteProps = T["id"];
type EditProps = Pick<T, "id" | "title" | "desc" | "isPin">;
type ToggleCompleted = Pick<T, "id" | "isCompleted">


export function useTodoHandler() {
  const { todoList, updateTodoList } = useTodoContext();

  const addTodo = ({ title, desc, isPin }: AddProps) => {
    const newTodo: T = {
      id: uuidv4(),
      title,
      desc,
      startDate: dayjs().format("YYYY/MM/DD"),
      isCompleted: false,
      isPin
    };
    updateTodoList(handleSort([newTodo, ...todoList]));
  };
  const editTodo = ({ id, title, desc, isPin }: EditProps) => {
    updateTodoList(handleSort(todoList.map((todo: T) =>
      todo.id === id ? { ...todo, title, desc, isPin } : todo
    )));
  };

  const deleteTodo = (id: DeleteProps) =>
    updateTodoList(todoList.filter((todo: T) => todo.id !== id));
  const toggleTodoIsCompleted = ({ id, isCompleted }: ToggleCompleted) => {
    updateTodoList(todoList.map((todo: T) =>
      todo.id === id ? { ...todo, isCompleted: !isCompleted } : todo
    ));
  };
  const getTodo = (id: T["id"]) => todoList.find((todo: T) => todo.id === id) || null;

  const handleSort = (list: T[]) => list.sort((prev, next) => {
    if (prev.isPin && !next.isPin) return -1;
    if (!prev.isPin && next.isPin) return 1;
    return 0;
  })

  return {
    todoList,
    addTodo,
    editTodo,
    deleteTodo,
    toggleTodoIsCompleted,
    getTodo,
  };
}

