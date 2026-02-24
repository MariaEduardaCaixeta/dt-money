import { useAuthContext } from "@/context/auth.context";
import { colors } from "@/shared/colors";
import { useEffect } from "react";
import { ActivityIndicator, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface Props {
    setLoading: (loading: boolean) => void;
}

export function Loading({ setLoading }: Props) {
  const { restoreUserSession, handleLogout } = useAuthContext();

  useEffect(() => {
    (async () => {
      try {
        const user = await restoreUserSession();

        if (!user) {
          handleLogout();
        }
      } catch (error) {
        console.error("Error restoring user session:", error);
        handleLogout();
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <SafeAreaView className="bg-background-primary items-center justify-center flex-1">
      <>
        <Image className="h-[48px] w-[255px]" source={require("@/assets/logo.png")}/>
        <ActivityIndicator color={colors.white} className="mt-20" />
      </>
    </SafeAreaView>
  );
}
