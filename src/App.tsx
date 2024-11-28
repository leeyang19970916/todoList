import React, { useState } from "react";
import TabList from "./component/tabList";
import { TodoList } from "./component/todoList";
import OffCanvas from "./component/offCanvas";
import Button from "./ui/button";
import { todoProps } from "./component/todoList";
import { getTodo } from "./actions";

const App: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false); // 控制 OffCanvas 的显示
  const [currentTodo, setCurrentTodo] = useState<todoProps | null>(null); // 当前编辑的 todo 数据

  // 打开编辑模式的处理函数
  const handleEditTodo = async (id: todoProps["id"]) => {
    try {
      const todo = await getTodo(id); // 获取 todo 数据
      setCurrentTodo(todo); // 设置当前 todo
      setIsOpen(true); // 打开 OffCanvas
    } catch (error) {
      console.error("Failed to fetch todo:", error);
    }
  };

  // 打开新增模式
  const handleAddTodo = () => {
    setCurrentTodo(null); // 新增模式下，不需要设置数据
    setIsOpen(true);
  };

  // 关闭 OffCanvas
  const handleClose = () => {
    setIsOpen(false);
    setCurrentTodo(null); // 清除当前的 todo 数据
  };

  return (
    <div className="relative h-[100vh] flex flex-nowrap">
      <div className="w-full p-[1rem_3rem]">
        <div className="py-[2rem]">
          <h1 className="text-2xl font-bold">Todo List</h1>
        </div>
        <div className="w-[750px] flex justify-end">
          <Button type="ADD" onClick={handleAddTodo} />
        </div>
        <TabList />
        <TodoList
          classNames="w-[750px]"
          onClick={(id) => handleEditTodo(id)} // 传入 ID 后执行编辑逻辑
        />
      </div>
      {isOpen && (
        <OffCanvas
          onClose={handleClose}
          todo={currentTodo} // 将当前的 todo 数据传递给 OffCanvas
        />
      )}
    </div>
  );
};

export default App;
