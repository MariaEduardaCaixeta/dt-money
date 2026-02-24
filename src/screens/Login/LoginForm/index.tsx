import { AppButton } from "@/components/AppButton";
import { AppInput } from "@/components/AppInput";
import { PublicStackParamsList } from "@/routes/PublicRoutes";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useForm } from "react-hook-form";
import { ActivityIndicator, Text, View } from "react-native";
import { schema } from "./schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuthContext } from "@/context/auth.context";
import { AxiosError } from "axios";
import { useSnackbarContext } from "@/context/snackbar.context";
import { AppError } from "@/shared/helpers/AppError";
import { useErrorHandler } from "@/shared/hooks/useErrorHandler";
import { colors } from "@/shared/colors";

export interface LoginFormParams {
  email: string;
  password: string;
}

export function LoginForm() {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<LoginFormParams>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(schema),
  });

  const { handleAuthenticate } = useAuthContext();
  const { handleError } = useErrorHandler();

  const navigation = useNavigation<NavigationProp<PublicStackParamsList>>();

  const onSubmit = async (data: LoginFormParams) => {
    try {
      await handleAuthenticate(data);
    } catch (error) {
      handleError(error, "Falha ao realizar login");
    }
  };

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
        <AppButton onPress={handleSubmit(onSubmit)} iconName="arrow-forward">
          {isSubmitting ? (
            <ActivityIndicator color={colors.white} />
          ) : (
            <Text>Entrar</Text>
          )}
        </AppButton>

        <View>
          <Text className="mb-6 text-gray-300 text-base">
            Ainda não possui uma conta?
          </Text>
          <AppButton
            onPress={() => navigation.navigate("Register")}
            mode="outline"
            iconName="arrow-forward"
          >
            <Text>Cadastrar</Text>
          </AppButton>
        </View>
      </View>
    </>
  );
}
