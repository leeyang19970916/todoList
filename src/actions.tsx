import dayjs from "dayjs";
import { todoProps } from "./component/todoList";

type addProps = Pick<todoProps, "title" | "desc">;
export function addTodo({ title, desc }: addProps) {
  const list = getLocalList();
  const todo: todoProps = {
    id: Math.random(),
    title,
    desc,
    startDate: dayjs().format("YYYY/MM/DD"),
    isCompleted: false,
  };

  list?.push(todo);
}

type editProps = Pick<todoProps, "id" | "title" | "desc">;
export function EditTodo({ id, title, desc }: editProps) {
  // setLocalList("EDIT",todo)
  const list = getLocalList();
  const editIndex = list.findIndex((todo) => todo.id === id);
  if (editIndex !== -1) {
    // 找到對應 id 的 todo，並更新它
    list[editIndex] = { ...list[editIndex], title, desc };
  }
}

type deleteProps = todoProps["id"];
export function deleteTodo( id: deleteProps) {
  // setLocalList("DELETE",id)
  const list = getLocalList();
  const index = list.findIndex((todo) => todo.id === id);
  if (index !== -1) {
    // 找到對應 id 的 todo，並刪除它
    list.splice(index, 1);
  }
}

type toggleIsCompletedProps = Pick<todoProps, "id" | "isCompleted">;
export function toggleIsCompleted({ id, isCompleted }: toggleIsCompletedProps) {
  const list = getLocalList();
  const index = list.findIndex((todo) => todo.id === id);
  if (index !== -1) {
    // 切換對應 id 的 todo 的 completed 狀態
    list[index].isCompleted = !isCompleted;
  }
}

export const getLocalList = (): todoProps[] => {
  const todoList = localStorage.getItem("todoList");
  // 檢查 localStorage 是否有該項目，並確保它不為 null
  if (todoList) {
    return JSON.parse(todoList);
  }
  return [];
};

export const setLocalList = ({ todoList }: { todoList: todoProps[] }): void => {
  localStorage.setItem("todoList", JSON.stringify(todoList));
};
