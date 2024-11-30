import dayjs from "dayjs";
import { v4 as uuidv4 } from "uuid";
import { useTodoContext, TodoProps as T } from "../store/todoContext";

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
    console.log("add");
    updateTodoList([newTodo, ...todoList]);
  };

  const editTodo = ({ id, title, desc }: EditProps) => {
    console.log("edit");
    const updatedList = todoList.map((todo: T) =>
      todo.id === id ? { ...todo, title, desc } : todo
    );
    updateTodoList(updatedList);
  };

  const deleteTodo = (id: DeleteProps) => {
    const updatedList = todoList.filter((todo: T) => todo.id !== id);
    console.log("delete id:", id, "in deleteTodo func");
    updateTodoList(updatedList);
  };

  const toggleIsCompleted = (id: T["id"]) => {
    console.log("isCompleted");
    const updatedList = todoList.map((todo: T) =>
      todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
    );
    updateTodoList(updatedList);
    // setTimeout
  };

  const getTodo = (id: T["id"]) => {
    return todoList.find((todo: T) => todo.id === id) || null;
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

// diaLog{
// (title block/ save /edit /delete)
// }

// todoProps united

// useContext united

// declare function name /variable
