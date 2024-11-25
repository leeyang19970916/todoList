import React, { useState } from "react";

interface TodoProps {
  id: number;
  title: string;
  desc?: string;
  startDate: string;
  isCompleted: boolean;
}

const initialTodos: TodoProps[] = [
  {
    id: 12431234,
    title: "Task 1",
    desc: "Description 1",
    startDate: "2024-11-25",
    isCompleted: false,
  },
  {
    id: 1243134,
    title: "Task 2",
    desc: "Description 2",
    startDate: "2024-11-26",
    isCompleted: false,
  },
  {
    id: 12434,
    title: "Task 3",
    desc: "Description 3",
    startDate: "2024-11-27",
    isCompleted: false,
  },
  {
    id: 124321312311234,
    title: "Task 4",
    startDate: "2024-11-28",
    isCompleted: false,
  },
];

export default function TodoList() {
  const [todos, setTodos] = useState<TodoProps[]>(initialTodos);

  const toggleTodoCompletion = (id: number) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
      )
    );
  };

  return (
    <div>
      {todos.map((todo) => (
        <Todo key={todo.id} todo={todo} onToggle={() => toggleTodoCompletion(todo.id)} />
      ))}
    </div>
  );
}

interface SingleTodoProps {
  todo: TodoProps;
  onToggle: () => void;
}

export function Todo({ todo, onToggle }: SingleTodoProps) {
  const { title, desc, startDate, isCompleted } = todo;

  return (
    <div className="flex items-center w-[500px] gap-4">
      <input
        type="checkbox"
        checked={isCompleted}
        onChange={onToggle}
        className="w-[50px]"
      />
      <div className="flex-1">{title}</div>
      <div className="text-red-500 cursor-pointer w-[50px]">刪</div>
      {desc && <div className="flex-1">{desc}</div>}
      <div>{startDate}</div>
    </div>
  );
}
