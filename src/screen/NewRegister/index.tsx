import React, { useContext, useState } from 'react';
import { TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import { Background, Input, SubmitButton, SubmitText, Container } from "./styles";
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from './../../routes/types';
import { Header } from '../../components/Header';
import { RegisterTypes } from '../../components/RegisterTypes';
import { format } from 'date-fns';
import { AuthContext } from '../../contexts/auth';
import { CreateReceiveController } from '../../controllers/receive/CreateReceiveController';

type RegisterType = 'receita' | 'despesa';
type NavigationProp = NativeStackNavigationProp<AuthStackParamList>;

export default function NewRegister() {
    const [description, setDescription] = useState('');
    const [valueInput, setValueInput] = useState('');
    const [type, setType] = useState<RegisterType>('receita');
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation<NavigationProp>();
    const { user } = useContext(AuthContext);

    function handlerSubmit() {
        Keyboard.dismiss();

        if (!description || !valueInput) {
            Alert.alert("Atenção", "Preencha todos os campos");
            return;
        }

        if (isNaN(parseFloat(valueInput)) || type === null) {
            Alert.alert("Atenção", "Valor inválido");
            return;
        }

        Alert.alert(
            "Confirmando dados",
            `Tipo: ${type} - Valor: R$ ${parseFloat(valueInput).toFixed(2)}`,
            [
                {
                    text: 'Cancelar',
                    style: 'cancel'
                },
                {
                    text: 'Continuar',
                    onPress: () => handleAdd()
                }
            ]
        );
    }

    async function handleAdd() {
        if (!user) {
            Alert.alert("Erro", "Usuário não autenticado");
            return;
        }

        setLoading(true);
        Keyboard.dismiss();

        try {
            const controller = new CreateReceiveController();
            const result = await controller.handle({
                description: description,
                value: Number(valueInput),
                type: type,
                date: format(new Date(), 'yyyy-MM-dd'),
                user_id: user.id
            });

            if (result.success) {
                Alert.alert("Sucesso", "Movimentação registrada com sucesso!");
                setDescription('');
                setValueInput('');
                navigation.navigate("Home");
            } else {
                Alert.alert("Erro", result.error || "Erro ao registrar movimentação");
            }
        } catch (error) {
            console.error("Erro ao adicionar movimentação:", error);
            Alert.alert("Erro", "Erro ao registrar movimentação");
        } finally {
            setLoading(false);
        }
    }

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <SafeAreaView style={{ flex: 1 }}>
                <Background>
                    <Header title="Registrando"></Header>

                    <Container>
                        <Input
                            placeholder="Descrição desse registro"
                            value={description}
                            placeholderTextColor="#121212"
                            onChangeText={(text) => setDescription(text)}
                        />
                        <Input
                            placeholder="Valor desejado"
                            keyboardType="numeric"
                            value={valueInput}
                            placeholderTextColor="#121212"
                            onChangeText={(text) => setValueInput(text)}
                        />

                        <RegisterTypes type={type} sendTypeChanged={(item) => setType(item as RegisterType)} />

                        <SubmitButton 
                            onPress={handlerSubmit} 
                            label={"Registrar"}
                            disabled={loading}
                        >
                            <SubmitText>{loading ? "Registrando..." : "Registrar"}</SubmitText>
                        </SubmitButton>

                        <SubmitButton onPress={() => navigation.navigate("Home")} label={"Voltar"}>
                            <SubmitText>Voltar</SubmitText>
                        </SubmitButton>

                    </Container>
                </Background>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    );
}