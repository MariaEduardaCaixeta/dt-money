import { AppButton } from "@/components/AppButton";
import { AppInput } from "@/components/AppInput";
import { useForm } from "react-hook-form";
import { Text, View } from "react-native";

export interface LoginFormParams {
  email: string;
  password: string;
}

export function LoginForm() {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<LoginFormParams>();

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

      <View className="flex-1 justify-between mt-8 mb-6 min-h-[250px]">
        <AppButton iconName="arrow-forward">
          <Text>Login</Text>
        </AppButton>

        <View>
            <Text className="mb-6 text-gray-300 text-base">Ainda não possui uma conta?</Text>
          <AppButton mode="outline" iconName="arrow-forward">
            <Text>Cadastrar</Text>
          </AppButton>
        </View>
      </View>
    </>
  );
}
