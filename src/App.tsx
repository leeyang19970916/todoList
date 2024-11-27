import React, { useState } from 'react';
import TabList from './component/tabList';
import {TodoList} from './component/todoList';
import OffCanvas from './component/offCanvas';


const App: React.FC = () => {
  const [isOpen,setIsOpen]=useState(false)
  return (
    <div className="relative h-[100vh] flex flex-nowrap">
      <div className='w-full p-[1rem_3rem]'>
        <div className='py-[2rem]'>
          <h1 className="text-2xl font-bold">Todo List</h1>
        </div>
        <TabList/>
        <TodoList classNames="w-[750px]" onClick={()=>setIsOpen(true)}/>
      </div>
      {!isOpen?<OffCanvas onClose={()=>setIsOpen(false)}/>:null}
    </div>
  );
};

export default App;

