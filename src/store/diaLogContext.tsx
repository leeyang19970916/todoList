import cn from "classnames";
import React, { createContext, useContext, useState } from "react";

export interface contentProps {
  status: "success" | "error";
  classNames?: string;
  value: string;
}

export const defaultDiaLogContent: contentProps = {
  status: "success",
  value: "修改成功"
} as const

const statusStyles = {
  success: "text-green-800 bg-green-300",
  error: "text-red-800 bg-red-300",
};

const DiaLogContext = createContext<{
  content: contentProps | null,
  handleDialog: (content: contentProps) => void
} | null>(null);

export const DiaLogProvider: React.FC<{ children: React.ReactNode }> = (
  { children }
) => {
  const [content, setContent] = useState<contentProps| null>(null);

console.log("??????")
  const handleDialog = ({ status, classNames, value }: contentProps) => {
    setContent({ status, classNames, value })
  }
  // useEffect(() => {
  //   if (content) {
  //     const id = setTimeout(() => {
  //       setContent(null);
  //     }, 3000);
  //     return () => clearTimeout(id);
  //   }

  // }, [content])
  return (
    <DiaLogContext.Provider value={{ content, handleDialog }}>
      {children}
      {content ? <DiaLog /> : null}
    </DiaLogContext.Provider>
  );
};


const DiaLog: React.FC = () => {
  const { content } = useDialogContext()
  if (!content) return null
  const { value, classNames, status } = content
console.log(status,"status",statusStyles[status])
  return (
      <div className="fixed top-[1.5rem] right-[1rem]">
        <span
          className={cn(
            " text-center tracking-wide  rounded-[16px] whitespace-nowrap py-[0.75rem] px-[2.5rem]",
            statusStyles[status] ? statusStyles[status] : null,
            classNames
          )}
        >
          {value}
        </span>
      </div>
    // </div>
  );
};


export const useDialogContext = () => {
  const context = useContext(DiaLogContext);
  if (!context) {
    throw new Error("useDialogContext must be used within a DiaLogProvider");
  }
  return context;
};

export default DiaLog;
