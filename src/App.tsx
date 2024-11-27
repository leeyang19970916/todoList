import React, {} from 'react';
import TabList from "./tabList";
import TodoList from './todoList';
import  OffCanvas  from './offCanvas';

export interface Todo {
  id: number;
  title: string;
  remark: string;
  startDate: string;
  isFinished: boolean;
}

const App: React.FC = () => {
  // const [todos, setTodos] = useState<Todo[]>([]);
  // const [title, setTitle] = useState<string>('');
  // const [remark, setRemark] = useState<string>('');
  // const [isFinished, setIsFinished] = useState<boolean>(false);
  // console.log(setIsFinished, "setIsFinished")
  // // const handleAddTodo = () => {
  // //   if (title) {
  // //     const newTodo: Todo = {
  // //       id: Date.now(),
  // //       title,
  // //       remark,
  // //       startDate: new Date().toISOString(),
  // //       isFinished,
  // //     };
  // //     setTodos([...todos, newTodo]);
  // //     setTitle('');
  // //     setRemark('');
  // //   }
  // // };

  // const handleDeleteTodo = (id: number) => {
  //   setTodos(todos.filter((todo) => todo.id !== id));
  // };

  // const handleEditTodo = (id: number, newTitle: string, newRemark: string) => {
  //   setTodos(
  //     todos.map((todo) =>
  //       todo.id === id ? { ...todo, title: newTitle, remark: newRemark } : todo
  //     )
  //   );
  // };

  // const handleToggleFinish = (id: number) => {
  //   setTodos(
  //     todos.map((todo) =>
  //       todo.id === id ? { ...todo, isFinished: !todo.isFinished } : todo
  //     )
  //   );
  // };

  return (
    <div className="relative h-[100vh] flex flex-nowrap">
      <div className='w-[300px] bg-orange-200'></div>
      <div className='w-full p-[1rem_3rem]'>
        <div className='py-[2rem]'>
          <h1 className="text-2xl font-bold">Todo List</h1>
        </div>
        <TabList/>
        <TodoList classNames="w-[750px]"/>
      </div>
      <OffCanvas/>
    </div>
  );
};

export default App;

