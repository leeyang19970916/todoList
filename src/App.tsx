import React, { useState } from 'react';
import TabList from './TabList';
import TodoList from './TodoList';

export interface Todo {
  id: number;
  title: string;
  remark: string;
  startDate: string;
  isFinished: boolean;
}



// App.tsx
// import React, { useState } from 'react';
// import { Todo } from './types';
const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState<string>('');
  const [remark, setRemark] = useState<string>('');
  const [isFinished, setIsFinished] = useState<boolean>(false);
  console.log(setIsFinished, "setIsFinished")
  const handleAddTodo = () => {
    if (title) {
      const newTodo: Todo = {
        id: Date.now(),
        title,
        remark,
        startDate: new Date().toISOString(),
        isFinished,
      };
      setTodos([...todos, newTodo]);
      setTitle('');
      setRemark('');
    }
  };

  const handleDeleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleEditTodo = (id: number, newTitle: string, newRemark: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, title: newTitle, remark: newRemark } : todo
      )
    );
  };

  const handleToggleFinish = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isFinished: !todo.isFinished } : todo
      )
    );
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">Todo List</h1>
      <TabList></TabList>
      <TodoList></TodoList>

      <div className="mb-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="border p-2 mr-2"
        />
        <input
          type="text"
          value={remark}
          onChange={(e) => setRemark(e.target.value)}
          placeholder="Remark"
          className="border p-2 mr-2"
        />
        <button
          onClick={handleAddTodo}
          className="bg-blue-500 text-white p-2 rounded"
        >
          Add Todo
        </button>
      </div>

      <div className="w-full max-w-lg">
        <h2 className="text-xl font-semibold mb-2">In Progress</h2>
        <ul className="space-y-2">
          {todos
            .filter((todo) => !todo.isFinished)
            .map((todo) => (
              <li key={todo.id} className="bg-white p-4 shadow-md rounded flex justify-between">
                <div>
                  <h3 className="font-semibold">{todo.title}</h3>
                  <p>{todo.remark}</p>
                  <p className="text-sm text-gray-500">{todo.startDate}</p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleToggleFinish(todo.id)}
                    className="bg-green-500 text-white p-2 rounded"
                  >
                    Mark as Finished
                  </button>
                  <button
                    onClick={() => handleEditTodo(todo.id, prompt("Edit title", todo.title) || todo.title, prompt("Edit remark", todo.remark) || todo.remark)}
                    className="bg-yellow-500 text-white p-2 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteTodo(todo.id)}
                    className="bg-red-500 text-white p-2 rounded"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
        </ul>

        <h2 className="text-xl font-semibold mt-4 mb-2">Completed</h2>
        <ul className="space-y-2">
          {todos
            .filter((todo) => todo.isFinished)
            .map((todo) => (
              <li key={todo.id} className="bg-white p-4 shadow-md rounded flex justify-between">
                <div>
                  <h3 className="font-semibold">{todo.title}</h3>
                  <p>{todo.remark}</p>
                  <p className="text-sm text-gray-500">{todo.startDate}</p>
                </div>
                <button
                  onClick={() => handleToggleFinish(todo.id)}
                  className="bg-blue-500 text-white p-2 rounded"
                >
                  Mark as In Progress
                </button>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
