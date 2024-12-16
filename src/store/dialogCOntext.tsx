import React, { FC, createContext, ReactNode, useContext, useState } from "react";

type DialogType = "delete" | "";

interface ContentProps {
    title?: string;
    desc?: string;
    classNames?: string;
    buttonGroup: {
        confirm: string;
        cancel: string;
    };
}

interface DialogContextProps {
    content: ContentProps;
    dialogHandler: (params: { isOpen: boolean; type: DialogType }) => void;
}

const DialogContext = createContext<DialogContextProps | null>(null);

export const DialogProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [content, setContent] = useState<ContentProps>(defaultContent);

    // 处理对话框状态与内容
    const dialogHandler = ({ isOpen = false, type = "" }: { isOpen: boolean; type: DialogType }) => {
        setIsOpen(isOpen);
        if (type) {
            const content = typeHandler(type);
            setContent((prev) => ({ ...prev, ...content }));
        }
    };

    return (
        <DialogContext.Provider value={{ content, dialogHandler }}>
            {children}
            {isOpen && <Dialog />}
        </DialogContext.Provider>
    );
};

// 根据类型返回对应的内容
const typeHandler = (type: DialogType): ContentProps => {
    const templates: Record<DialogType, ContentProps> = {
        delete: deleteContent,
        "": defaultContent,
    };
    return templates[type];
};
export const deleteContent: ContentProps = {
    title: "確定刪除？",
    desc: "你已釘選此項目，若刪除則無法恢復，確定要刪除嗎？",
    classNames: "",
    buttonGroup: {
        confirm: "確定",
        cancel: "取消",
    }
};
// 默认对话框内容模板
export const defaultContent: ContentProps = {
    title: "提示",
    desc: "操作無法恢復，請確認您的選擇。",
    classNames: "",
    buttonGroup: {
        confirm: "確定",
        cancel: "取消",
    },
};

// 对话框组件
export const Dialog: FC = () => {
    const { content, dialogHandler } = useDialogContext();
    const { title, desc, buttonGroup } = content;

    // 关闭对话框
    const handleClose = () => dialogHandler({ isOpen: false, type: "" });

    return (
        <div className="fixed inset-0 bg-slate-500 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white shadow-lg rounded-lg p-6 w-[50%] min-w-[500px]">
                {title && <h2 className="text-xl font-bold mb-4">{title}</h2>}
                {desc && <p className="text-gray-700 mb-6">{desc}</p>}
                <div className="flex items-center justify-center gap-4">
                    <button
                        onClick={handleClose}
                        className="rounded-lg bg-red-500 text-white px-4 py-2 w-full"
                    >
                        {buttonGroup.confirm}
                    </button>
                    <button
                        onClick={handleClose}
                        className="rounded-lg bg-gray-200 text-gray-700 px-4 py-2 w-full"
                    >
                        {buttonGroup.cancel}
                    </button>
                </div>
            </div>
        </div>
    );
};

// 自定义 Hook
export const useDialogContext = () => {
    const context = useContext(DialogContext);
    if (!context) {
        throw new Error("useDialogContext must be used within a DialogProvider");
    }
    return context;
};
