import { useAuthContext } from "@/context/auth.context";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export function Home() {
    const { handleLogout } = useAuthContext();

    return (
        <SafeAreaView>
            <Text>Home</Text>
            <TouchableOpacity onPress={handleLogout}>
                <Text>Sair</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}