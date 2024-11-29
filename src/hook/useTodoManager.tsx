import dayjs from "dayjs";
import { todoProps } from "../App";
// import useLocalStorageSync from "./useLocalStorageSync";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

type addProps = Pick<todoProps, "title" | "desc">;
type deleteProps = todoProps["id"];
type editProps = Pick<todoProps, "id" | "title" | "desc">;

// export

export function useTodoManager() {
  // const [is,setis]=useState(localStorage)
  // const [todoList, updateTodoList] = useLocalStorageSync<todoProps[]>("todoList", []);
  const [data, setData] = useState(() => {
    try {
      const storedData = localStorage.getItem("todoList");
      return storedData ? JSON.parse(storedData) : [];
    } catch {
      console.error("Failed to parse localStorage data");
      return [];
    }
  });

  const updateTodoList = (newData: todoProps[]) => {
    setData((prevData: todoProps[]) => {
      console.log(JSON.stringify(newData) === JSON.stringify(prevData));
      if (JSON.stringify(prevData) !== JSON.stringify(newData)) {
        localStorage.setItem("todoList", JSON.stringify(newData));
        return newData;
      }
      return prevData;
    });
  };

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

    console.log("delete","data:",data,"updateList",updatedList);
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
  useEffect(() => {
    console.log("觸發 轉換更新 data:", data);
  }, [data]);

  return {
    data,
    addTodo,
    editTodo,
    deleteTodo,
    toggleIsCompleted,
    getTodo,
  };
}
