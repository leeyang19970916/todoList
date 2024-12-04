import cn from "classnames";
import React, { createContext, useContext, useEffect, useState } from "react";

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
  const [content, setContent] = useState<contentProps | null>(null);
  const handleDialog = ({ status, classNames, value }: contentProps) => {
    if (content) return
    setContent({ status, classNames, value })
  }
  const onClose = () => setContent(null)
  return (
    <DiaLogContext.Provider value={{ content, handleDialog }}>
      {children}
      {content ? <DiaLog onClose={onClose} /> : null}
    </DiaLogContext.Provider>
  );
};
const DiaLog: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { content } = useDialogContext()
  const [isFading, setIsFading] = useState<boolean>(false);

  useEffect(() => {
    if (!content) return;
    const fadeTimer = setTimeout(() => {
      setIsFading(true);
    }, 1000);

    const closeTimer = setTimeout(() => {
      onClose();
    }, 2000);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(closeTimer);
    };
  }, [onClose, content]);
  if (!content) return null
  const { value, classNames, status } = content

  return (
    <div className="fixed top-[1.5rem] right-[1rem]">
      <span
        className={cn(
          "text-center tracking-wide  rounded-[16px] whitespace-nowrap py-[0.75rem] px-[2.5rem]",
          isFading ? "animate-fade-out" : "opacity-100",
          statusStyles[status],
          classNames
        )}
      >
        {value}
      </span>
    </div>
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
