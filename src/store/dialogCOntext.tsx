import React, { Children, ReactNode, useContext, useState } from "react"
import { createContext } from "vm"

interface Props {
    title?: string
    desc?: string,
    className?: string
    children: ReactNode,
    is
}



const DialogContext = createContext<{

} | null>(null)

export const DialogProvider: React.FC = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false)

    return (
        <DialogContext.Provider value={{isOpen, setIsOpen}}>
            {Children}
            {isOpen ? <Dialog /> : null}
        </DialogContext.Provider>
    )
}





export const Dialog: React.FC = () => {
    return <div>qwqeqweqwe</div>
}


export const useDialogContext = () => {
    const context = useContext(DialogContext)
    if (!context) {
        throw new Error("useDialogContext must be used within a DialogProvider")
    }
    return context
}