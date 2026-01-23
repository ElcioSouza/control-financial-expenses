import React, { useContext, useState } from 'react';
import { Platform, ActivityIndicator } from 'react-native';
import { Background, SubmitButton, SubmitText, Link, LinkText, Container, Logo, AreaInput, Input,ErrorEmail } from "./styles";
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from './../../routes/types';
import { AuthContext } from '../../contexts/auth';
type NavigationProp = NativeStackNavigationProp<AuthStackParamList>;

export default function SignUp() {
    const navigation = useNavigation<NavigationProp>()
    const { user, signUp, loadingAuth } = useContext(AuthContext);
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errorEmail,setErrorEmail] = useState("")

    function handlerSignUp() {
        if (!name || !email || !password) {
            alert('Preencha todos os campos!');
            return;
        }
        const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
        if (!emailRegex.test(email)) {
            setErrorEmail("informar email valido")
            return;
        }    
        signUp(name, email, password);
    }

    return (
        <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Background>
                <Container behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                    enabled
                >
                    <Logo
                        source={require("../../assets/img/Logo.png")}
                    />
                    <AreaInput>
                        <Input
                            placeholder="Seu nome"
                            value={name}
                            placeholderTextColor="#121212"
                            onChangeText={(text) => setName(text)}
                        />
                    </AreaInput>

                    <AreaInput>
                        <Input
                            placeholder="Seu email"
                            textContentType='emailAddress'
                            keyboardType='email-address'
                            value={email}
                            placeholderTextColor="#121212"
                            onChangeText={setEmail}
                            autoCapitalize='none'
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

                    <SubmitButton activeOpacity={0.8} onPress={handlerSignUp}>
                        {
                            loadingAuth ? (
                                <ActivityIndicator size={20} color={"#FFF"} />
                            ) : (
                                <SubmitText>Cadastrar</SubmitText>
                            )
                        }

                    </SubmitButton>

                    <Link onPress={() => navigation.navigate('SignIn')}>
                        <LinkText>Entrar na conta</LinkText>
                    </Link>
                </Container>
            </Background>
        </SafeAreaView>
    );
}