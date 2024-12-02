import cn from "classnames";
import React, { createContext, useContext, useEffect, useState } from "react";

interface Props {
  status: "success" | "error";
  classNames?: string;
  value: string;
}
const statusStyles = {
  success: "text-green-700 bg-green-400",
  error: "text-red-700 bg-red-400",
};
const DiaLogContext = createContext<Props | null>(null);

export const DiaLogProvider: React.FC<{ children: React.ReactNode }> = (
  children
) => {
  const [diaLogContent, setDiaLogContent] = useState<Props|null>(null);
  const handleDialog=({status,classNames,value}:Props)=>{
    setDiaLogContent({status,classNames,value})
  }
  // useEffect(()=>{
  //   let id=null
  //   if (isShow) {
  //     id=setTimeout(()=>{
  //       setIsShow(false)
  //     },3000)
  //   }
  //   return ()=>{
  //     clearTimeout(id)
  //   }


  // },[isShow])
  return (
    <DiaLogContext.Provider value={{diaLogContent,handleDialog}}>
      {children}
      {diaLogContent ? <DiaLog /> : null}
    </DiaLogContext.Provider>
  );
};

export const useDialogContext = () => {
  const context = useContext(DiaLogContext);
  if (!context) {
    throw new Error("useDialogContext must be used within a DiaLogProvider");
  }
  return context;
};

export const DiaLog: React.FC = () => {
const { diaLogContent:{status,classNames,value} }=useDialogContext()
  return (
    <div className="relative">
      <div className="absolute top-0 right-0">
        <span
          className={cn(
            "w-[500px] text-center rounded-[12px] whitespace-nowrap py-[0.5rem] px-[1rem]",
            statusStyles?[status] ?statusStyles?[status]:null,
            classNames
          )}
        >
          {value}
        </span>
      </div>
    </div>
  );
};

export default DiaLog;
