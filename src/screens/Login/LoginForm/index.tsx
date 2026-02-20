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
            <Text className="text-white">Login Form</Text>
        </>
    )
}