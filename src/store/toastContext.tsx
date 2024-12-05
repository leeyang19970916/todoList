import cn from "classnames";
import React, { createContext, useContext, useEffect, useState } from "react";

export interface contentProps {
  status: "success" | "error";
  classNames?: string;
  value: string;
}

export const defaultToastContent: contentProps = {
  status: "success",
  value: "修改成功"
} as const

const statusStyles = {
  success: "text-green-800 bg-green-300",
  error: "text-red-800 bg-red-300",
};

const ToastContext = createContext<{
  content: contentProps | null,
  handleToast: (content: contentProps) => void
} | null>(null);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = (
  { children }
) => {
  const [content, setContent] = useState<contentProps | null>(null);
  const handleToast = ({ status, classNames, value }: contentProps) => {
    if (content) return
    setContent({ status, classNames, value })
  }
  const onClose = () => setContent(null)
  return (
    <ToastContext.Provider value={{ content, handleToast }}>
      {children}
      {content ? <Toast onClose={onClose} /> : null}
    </ToastContext.Provider>
  );
};
const Toast: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { content } = useToastContext()
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
    <div className="fixed bottom-[1.5rem] right-[1rem]">
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
export const useToastContext = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToastContext must be used within a ToastProvider");
  }
  return context;
};

export default Toast;
