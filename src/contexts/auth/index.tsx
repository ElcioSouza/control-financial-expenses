import React, { createContext, useState, useEffect } from "react";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthProviderProps, User, AuthContextType } from './type';
import { AuthStackParamList } from '../../routes/types';
import { CreateUserController } from "../../controllers/user/CreateUserController";
import { AuthUserController } from "../../controllers/user/AuthUserController";

type NavigationProp = NativeStackNavigationProp<AuthStackParamList>;

const USER_STORAGE_KEY = "@financialexpenses:user";

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<User | null>(null);
    const [loadingAuth, setLoadingAuth] = useState(false);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation<NavigationProp>();

    useEffect(() => {
        loadUserFromStorage();
    }, []);


    async function loadUserFromStorage(): Promise<void> {
        try {
            const storageUser = await AsyncStorage.getItem(USER_STORAGE_KEY);
            if (storageUser) {
                setUser(JSON.parse(storageUser));
            }
        } catch (error) {
            console.error("Erro ao carregar usuário do storage:", error);
        } finally {
            setLoading(false);
        }
    }


    async function signUp(name: string, email: string, password: string) {
        setLoadingAuth(true);
        try {
            const createUserController = new CreateUserController();
            const result = await createUserController.handle({
                name,
                email,
                password,
                balance: 0
            });
            if (result.success) {
                Alert.alert("Sucesso", "Conta criada com sucesso!");
               navigation.goBack();
            } else {
                console.log(result.message)
                Alert.alert("Erro", result.message);
            }
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : "Erro ao cadastrar usuário";
            Alert.alert("Erro", errorMessage);
        } finally {
            setLoadingAuth(false);
        }
    }

    async function signIn(email: string, password: string): Promise<void> {
        setLoadingAuth(true);
        try {
            const authUserController = new AuthUserController();
            const result = await authUserController.handle({ email, password });
            console.log(result)
            if (!result) {
                Alert.alert("Erro ao entrar", result.error || "Email ou senha incorretos");
                return
            }
            const userData: User = { ...result.data }
            await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userData));
            setUser(userData);
        } catch (err) {
            Alert.alert("Erro", err instanceof Error ? err.message : "Erro ao fazer login");
        } finally {
            setLoadingAuth(false);
        }
    }


    async function signOut(): Promise<void> {
        try {
            await AsyncStorage.removeItem(USER_STORAGE_KEY);
            setUser(null);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Erro ao fazer logout";
            console.error("Erro ao fazer logout:", errorMessage);
            Alert.alert("Erro", errorMessage);
        }
    }

    return (
        <AuthContext.Provider value={{
            signed: !!user,
            user,
            signUp,
            signIn,
            signOut,
            loadingAuth,
            loading
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;