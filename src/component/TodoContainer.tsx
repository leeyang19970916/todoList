import React, { useCallback, useState } from "react";
import {TodoProps as T } from "../store/todoContext";
import { useTodoManager } from "../hook/useTodoManager";
import { TabList, TabProps } from "./tabList";
import { TodoList } from "./todoList";
import OffCanvas from "./offCanvas";
import Button from "../ui/button";

const TodoContainer: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [currentTodo, setCurrentTodo] = useState<T | null>(null);

  const { todoList,getTodo } = useTodoManager();

  const [filterIsCompleted, setFilterIsCompleted] =
    useState<T["isCompleted"]>(false);

  const handleEditTodo = useCallback(
    (id: T["id"]) => {
      setCurrentTodo(getTodo(id));
      setIsOpen(true);
    },
    [getTodo]
  );

  const handleAddTodo = useCallback(() => {
    setCurrentTodo(null);
    setIsOpen(true);
  }, []);

  return (
    <>
      <div className="w-full p-[1rem_3rem]">
        <div className="w-[750px] flex justify-end">
          <Button type="ADD" onClick={handleAddTodo} />
        </div>
        <TabList
          onTabChange={(name: TabProps["name"]) =>
            setFilterIsCompleted(name === "completed" ? true : false)
          }
        />
        <TodoList
          todoList={todoList.filter(
            (todo: T) => todo.isCompleted === filterIsCompleted
          )}
          className="w-[750px]"
          onClick={handleEditTodo}
        />
      </div>
      {isOpen && (
        <OffCanvas onClose={() => setIsOpen(false)} todo={currentTodo} />
      )}
    </>
  );
};

export default TodoContainer;