import { AuthHeader } from "@/components/AuthHeader";
import { DismissKeyboardView } from "@/components/DismissKeyboardView";
import { Text, View } from "react-native";
import { LoginForm } from "../Login/LoginForm";
import { RegisterForm } from "./RegisterForm";

export function Register() {
  return (
    <DismissKeyboardView>
      <View className="flex-1 w-[82%] self-center">
        <AuthHeader />
        <RegisterForm />
      </View>
    </DismissKeyboardView>
  );
}
