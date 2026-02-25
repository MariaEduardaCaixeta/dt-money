import { createContext, useCallback, useState } from "react";
import { content } from "tailwind.config";

interface BottomSheetContextType {
  openBottomSheet: (content: React.ReactNode, index: number) => void;
  closeBottomSheet: () => void;
}

export const BottomSheetContext = createContext<BottomSheetContextType>(
  {} as BottomSheetContextType,
);

export function BottomSheetProvider({ children }: { children: React.ReactNode }) {
    const [content, setContent] = useState<React.ReactNode>(null);


    const openBottomSheet = useCallback(
        (newContent: React.ReactNode, index: number) => {
            setContent(newContent);
        },
        []
    );

    const closeBottomSheet = useCallback(() => {
        setContent(null);
    }, []);

    return (
        <BottomSheetContext.Provider
            value={{
                openBottomSheet,
                closeBottomSheet
            }}
        >
            {children}
        </BottomSheetContext.Provider>
    )
}

