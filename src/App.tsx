import React from "react";
import { TodoProvider} from "./store/todoContext";
import TodoContainer from "./component/todoContainer";
import { DiaLogProvider } from "./store/diaLogContext";

export const App: React.FC = () => {
  return (
    <DiaLogProvider>
    <div className="relative h-[100vh] flex flex-col flex-nowrap">
      <div className="p-[1rem_3rem] bg-gray-100">
        <h1 className="text-2xl font-bold">Todo List</h1>
      </div>
      <TodoProvider>
        <TodoContainer />
      </TodoProvider>
    </div>
    </DiaLogProvider>
  );
};
