import { colors } from "@/shared/colors";
import { MaterialIcons } from "@expo/vector-icons";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { TextInput, TextInputProps, View, Text, TouchableOpacity } from "react-native";

interface AppInputParams<T extends FieldValues> extends TextInputProps {
    control: Control<T>
    name: Path<T>
    leftIconName?: keyof typeof MaterialIcons.glyphMap
    label?: string
}

export function AppInput<T extends FieldValues>({ control, name, leftIconName, label, ...rest }: AppInputParams<T>) {
    return (
        <Controller 
            control={control}
            name={name}
            render={({ field: { onChange, value } }) => (
                <View className="w-full">
                    {label && (<Text className="text-white">{label}</Text>)}

                    <TouchableOpacity className="flex-row items-center justify-between border-b-[1px] border-gray-600 px-3 py-2  h-16">
                        <TextInput
                            value={value}
                            onChangeText={onChange}
                            placeholderTextColor={colors.gray["700"]}
                            {...rest}
                        />
                    </TouchableOpacity>
                </View>
            )}
        />
    )
}