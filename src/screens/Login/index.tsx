import { PublicStackParamsList } from "@/routes/PublicRoutes"
import { useNavigation } from "@react-navigation/native"
import { StackNavigationProp } from "node_modules/@react-navigation/stack/lib/typescript/src/types"
import { Text, TouchableOpacity, View } from "react-native"

export const Login = () => {

    const navigation = useNavigation<StackNavigationProp<PublicStackParamsList>>()

    return (
        <View className="flex-1 items-center justify-center">
            <Text>Login Screen</Text>
            <TouchableOpacity
                onPress={() => navigation.navigate("Register")}
            >
                <Text>Registrar</Text>
            </TouchableOpacity>
        </View>
    )
}