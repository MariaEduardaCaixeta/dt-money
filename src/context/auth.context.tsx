import { LoginFormParams } from "@/screens/Login/LoginForm";
import { FormRegisterParams } from "@/screens/Register/RegisterForm";
import { createContext, useContext, useState } from "react";

type AuthContextType = {
    user: null;
    token: string | null;
    handleAuthenticate: (params: LoginFormParams) => Promise<void>;
    handleRegister: (params: FormRegisterParams) => Promise<void>;
    handleLogout: () => void;
};

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthContextProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState<string | null>(null);

    const handleAuthenticate = async ({ email, password }: LoginFormParams) => {
        // Implement authentication logic here
    };

    const handleRegister = async (formData: FormRegisterParams) => {
        // Implement registration logic here
    };

    const handleLogout = () => {
        setUser(null);
        setToken(null);
    };

    return (
        <AuthContext.Provider value={{
            user,
            token,
            handleAuthenticate,
            handleRegister,
            handleLogout
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuthContext = () => {
    const context = useContext(AuthContext);

    return context;
}