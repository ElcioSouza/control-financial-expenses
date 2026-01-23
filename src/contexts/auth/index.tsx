import React, { createContext, useState, useEffect } from "react";
import { AuthProviderProps } from './type';
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from './../../routes/types';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CreateUserController } from "../../controllers/user/CreateUserController";
import { AuthUserController } from "../../controllers/user/AuthUserController";
import { Alert } from "react-native";

export interface User {
    id: string;
    name: string;
    email: string;
    balance: number;
}

export interface AuthContextType {
    user: User | null;
    signed: boolean;
    signUp: (name: string, email: string, password: string) => Promise<void>;
    signIn: (email: string, password: string) => Promise<void>;
    signOut: () => Promise<void>;
    loadingAuth: boolean;
    loading: boolean;
}

type NavigationProp = NativeStackNavigationProp<AuthStackParamList>;
export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

const USER_STORAGE_KEY = "@financialexpenses:user";

function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<User | null>(null);
    const [loadingAuth, setLoadingAuth] = useState(false);
    const navigation = useNavigation<NavigationProp>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadStorage() {
            try {
                const storageUser = await AsyncStorage.getItem(USER_STORAGE_KEY);
                if (storageUser) {
                    const userData = JSON.parse(storageUser) as User;
                    setUser(userData);
                }
            } catch (error) {
                console.error("Erro ao carregar usuário do storage:", error);
            } finally {
                setLoading(false);
            }
        }
        loadStorage();
    }, []);

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
                Alert.alert("Erro", result.error || "Erro ao cadastrar usuário");
            }
        } catch (err) {
            console.error("Erro ao cadastrar:", err);
            Alert.alert("Erro", "Erro ao cadastrar usuário");
        } finally {
            setLoadingAuth(false);
        }
    }

    async function signIn(email: string, password: string) {
        setLoadingAuth(true);
        try {
            const authUserController = new AuthUserController();
            const result = await authUserController.handle({
                email,
                password
            });

            if (result && result.success && result.data) {
                const userData: User = {
                    id: result.data.id,
                    name: result.data.name,
                    email: result.data.email,
                    balance: result.data.balance
                };
                await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userData));
                setUser(userData);
            } else {
                Alert.alert("Erro ao entrar", result.error || "Email ou senha incorretos");
            }
        } catch (err) {
            console.error("Erro ao logar:", err);
            Alert.alert("Erro", "Erro ao fazer login");
        } finally {
            setLoadingAuth(false);
        }
    }

    async function signOut() {
        try {
            await AsyncStorage.removeItem(USER_STORAGE_KEY);
            setUser(null);
        } catch (error) {
            console.error("Erro ao fazer logout:", error);
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