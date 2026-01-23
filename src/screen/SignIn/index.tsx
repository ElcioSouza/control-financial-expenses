import React, { useState, useContext } from 'react';
import { Platform, ActivityIndicator } from 'react-native';
import { Background, SubmitButton, SubmitText, Link, LinkText, Container, Logo, AreaInput, Input,ErrorEmail } from "./styles";
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from './../../routes/types';
import { AuthContext } from '../../contexts/auth';

type NavigationProp = NativeStackNavigationProp<AuthStackParamList>;

export default function SignIn() {
    const navigation = useNavigation<NavigationProp>();
    const [email, setEmail] = useState("");
    const [errorEmail, setErrorEmail] = useState("");
    const [password, setPassword] = useState("");
    const { signIn, loadingAuth } = useContext(AuthContext)

    function handlerLogin() {
        if (!email && !password) {
            alert('Preencha todos os campos!');
            return;
        }
        const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
        if (!emailRegex.test(email)) {
            setErrorEmail("informar email valido")
            return;
        }

        signIn(email, password)
    }

    return (
        <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Background>
                <Container
                    behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                    enabled
                >
                    <Logo
                        source={require("../../assets/img/Logo.png")}
                    />
                    <AreaInput>
                        <Input
                            placeholder="Seu email"
                            value={email}
                            autoCapitalize='none'
                            placeholderTextColor="#121212"
                            onChangeText={(text) => setEmail(text)}
                        />
                    </AreaInput>

                    {
                        errorEmail !== "" && (

                            <ErrorEmail>
                                {errorEmail}
                            </ErrorEmail>

                        )
                    }

                    <AreaInput>
                        <Input
                            placeholder="Sua senha"
                            value={password}
                            placeholderTextColor="#121212" 
                            onChangeText={(text) => setPassword(text)}
                            secureTextEntry={true}
                        />
                    </AreaInput>

                    <SubmitButton activeOpacity={0.8} onPress={handlerLogin}>
                        {
                            loadingAuth ? (
                                <ActivityIndicator size={20} color={"#fff"} />
                            ) : (
                                <SubmitText>Acessar</SubmitText>
                            )
                        }
                    </SubmitButton>

                    <Link onPress={() => navigation.navigate('SignUp')}>
                        <LinkText>Criar uma conta gratuita</LinkText>
                    </Link>
                </Container>
            </Background>
        </SafeAreaView>
    );
}
