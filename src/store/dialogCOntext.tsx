import cn from "classnames";
import React, { FC, createContext, ReactNode, useContext, useState } from "react";

type DialogType = "delete" | "";
type OnConfirmCallbackType = (() => void) | null
type ActionType = 'confirm' | "cancel"
interface ContentProps {
    title: string;
    desc: string;
    buttonGroup: {
        confirm: string;
        cancel: string;
    };
    classNames?: string;
}
interface DialogStateProps {
    isOpen: boolean,
    content: ContentProps,
    onConfirm: OnConfirmCallbackType
}

interface DialogContextProps {
    content: ContentProps;
    dialogHandler: (params: { isOpen: boolean; type: DialogType, onConfirmCallback?: OnConfirmCallbackType }) => void
}

const DialogContext = createContext<DialogContextProps | null>(null);

export const DialogProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [dialogState, setDialogState] = useState<DialogStateProps>({ isOpen: false, content: defaultContent, onConfirm: null })

    const dialogHandler = ({ isOpen = false, type = "", onConfirmCallback = null }: { isOpen: boolean, type: DialogType, onConfirmCallback?: OnConfirmCallbackType }) => {
        const content = type ? typeHandler(type) : defaultContent;
        setDialogState({ isOpen, content, onConfirm: onConfirmCallback });
    };

    return (
        <DialogContext.Provider value={{ ...dialogState, dialogHandler }}>
            {children}
            {dialogState.isOpen && <Dialog isOpen={dialogState.isOpen} onConfirm={dialogState.onConfirm} />}
        </DialogContext.Provider>
    );
};

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
export const defaultContent: ContentProps = {
    title: "提示",
    desc: "操作無法恢復，請確認您的選擇。",
    classNames: "",
    buttonGroup: {
        confirm: "確定",
        cancel: "取消",
    },
};

export const Dialog: FC<{ onConfirm: OnConfirmCallbackType, isOpen: DialogStateProps["isOpen"] }> = ({ onConfirm, isOpen }) => {
    const { content, dialogHandler } = useDialogContext();
    const { title, desc, buttonGroup } = content;

    const closeDialog = () => dialogHandler({ isOpen: false, type: "" });
    const handleAction = (action: ActionType) => {
        if (action === "confirm" && onConfirm) onConfirm();
        closeDialog();
    };
    return (
        <div className={"fixed inset-0 bg-slate-500 bg-opacity-50 flex items-center justify-center"}>
            <div className={cn(isOpen ? 'scale-125' : 'scale-100',
                "bg-white shadow-lg rounded-lg p-6 w-[50%] min-w-[500px] flex flex-col gap-[1rem] transition-transform duration-500 ease-in-out transform")}>
                {title && <h2 className="text-xl font-bold py-[8px]">{title}</h2>}
                {desc && <p className="text-gray-700  min-h-[80px]">{desc}</p>}
                <div className="flex items-center justify-center gap-4">
                    <button
                        onClick={() => handleAction("confirm")}
                        className="rounded-lg bg-red-500 text-white px-4 py-2 w-full"
                    >
                        {buttonGroup.confirm}
                    </button>
                    <button
                        onClick={() => handleAction("cancel")}
                        className="rounded-lg bg-gray-200 text-gray-700 px-4 py-2 w-full"
                    >
                        {buttonGroup.cancel}
                    </button>
                </div>
            </div>
        </div>
    );
};

export const useDialogContext = () => {
    const context = useContext(DialogContext);
    if (!context) {
        throw new Error("useDialogContext must be used within a DialogProvider");
    }
    return context;
};
