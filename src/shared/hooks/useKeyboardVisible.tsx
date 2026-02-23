import { useEffect, useState } from "react";
import { Keyboard } from "react-native";

export function useKeyboardVisible() {
    const [isKeyboardVisible, setKeyboardVisible] = useState(false);

    useEffect(() => {
       const keyboardShowListener = Keyboard.addListener("keyboardDidShow", () => {
            setKeyboardVisible(true);
        });

        const keyboardHideListener = Keyboard.addListener("keyboardDidHide", () => {
            setKeyboardVisible(false);
        });

        return () => {
            keyboardShowListener.remove();
            keyboardHideListener.remove();
        };
    }, []);
    return isKeyboardVisible;
}