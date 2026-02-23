import { colors } from "@/shared/colors";
import { MaterialIcons } from "@expo/vector-icons";
import clsx from "clsx";
import { TouchableOpacity, TouchableOpacityProps, Text } from "react-native";

type AppButtonMode = "fill" | "outline";

interface AppButtonParams extends TouchableOpacityProps {
    mode?: AppButtonMode;
    iconName?: keyof typeof MaterialIcons.glyphMap;
    children: React.ReactNode;
}

export function AppButton({ mode = "fill", iconName, children, ...rest }: AppButtonParams) {
    const isFillMode = mode === "fill";

    return (
        <TouchableOpacity 
            {...rest} 
            className={clsx(
                "w-full rounded-xl px-5 flex-row items-center h-button", 
                iconName ? "justify-between" : "justify-center",
                {
                    "bg-accent-brand": isFillMode,
                    "bg-none border-[1px] border-accent-brand": !isFillMode,
                }
            )}>
            <Text className={clsx("text-base", { "text-white": isFillMode, "text-accent-brand": !isFillMode })}>{children}</Text>

            {
                iconName && (
                    <MaterialIcons 
                        name={iconName} 
                        size={24} 
                        color={isFillMode ? colors.white : colors["accent-brand"] } 
                    />
                )
            }
        </TouchableOpacity>
    )
}