import { ReactNode } from "react";

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

export interface AuthProviderProps {
    children: ReactNode;
}