import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ModalContextType {
    visible: boolean;
    setVisible: (visible: boolean) => void;
    closeModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const useModalContext = () => {
    const context = useContext(ModalContext);
    if (!context) {
        throw new Error('useModalContext must be used within ModalProvider');
    }
    return context;
};

export const ModalProvider = ({ children }: { children: ReactNode }) => {
    const [visible, setVisible] = useState(false);

    const closeModal = () => {
        setVisible(false);
    };

    return (
        <ModalContext.Provider value={{ visible, setVisible, closeModal }}>
            {children}
        </ModalContext.Provider>
    );
};