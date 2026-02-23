import { AppButton } from "@/components/AppButton";
import { AppInput } from "@/components/AppInput";
import { PublicStackParamsList } from "@/routes/PublicRoutes";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useForm } from "react-hook-form";
import { View, Text } from "react-native";
import { schema } from "./schema";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup.js";

export interface FormRegisterParams {
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
}

export function RegisterForm() {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FormRegisterParams>({
    defaultValues: {
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    },
    resolver: yupResolver(schema)
  });

  const navigation = useNavigation<NavigationProp<PublicStackParamsList>>();

  const onSubmit = async () => {
    
  }

  return (
    <>
      <AppInput
        control={control}
        name="name"
        leftIconName="person"
        label="NOME"
        placeholder="Seu nome"
      />

      <AppInput
        control={control}
        name="email"
        leftIconName="mail-outline"
        label="EMAIL"
        placeholder="mail@example.br"
      />

      <AppInput
        control={control}
        name="password"
        leftIconName="lock-outline"
        label="SENHA"
        placeholder="Sua senha"
        secureTextEntry
      />

      <AppInput
        control={control}
        name="confirmPassword"
        leftIconName="lock-outline"
        label="CONFIRMAR SENHA"
        placeholder="Confirme sua senha"
        secureTextEntry
      />

      <View className="flex-1 justify-between mt-8 mb-6 min-h-[250px]">
        <AppButton onPress={handleSubmit(onSubmit)} iconName="arrow-forward">
          <Text>Cadastrar</Text>
        </AppButton>

        <View>
          <Text className="mb-6 text-gray-300 text-base">
            Já possui uma conta?
          </Text>
          <AppButton
            onPress={() => navigation.navigate("Login")}
            mode="outline"
            iconName="arrow-forward"
          >
            <Text>Acessar</Text>
          </AppButton>
        </View>
      </View>
    </>
  );
}
