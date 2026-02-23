import { AppButton } from "@/components/AppButton"
import { AppInput } from "@/components/AppInput"
import { useForm } from "react-hook-form"
import { Text } from "react-native"

export interface LoginFormParams {
    email: string
    password: string
}

export function LoginForm() {
    const {
        control,
        handleSubmit,
        formState: { isSubmitting },
    } = useForm<LoginFormParams>()

    return (
        <>
            <AppInput
                control={control}
                name="email"
                label="EMAIL"
                leftIconName="mail-outline"
                placeholder="Digite seu email"
            />
            <AppInput
                control={control}
                name="password"
                label="SENHA"
                placeholder="Sua senha"
                leftIconName="lock-outline"
                secureTextEntry
            />

            <AppButton mode="outline" iconName="arrow-forward">
                <Text>Login</Text>
            </AppButton>
        </>
    )
}