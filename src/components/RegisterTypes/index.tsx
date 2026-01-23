import React, { useState } from 'react';
import { RegisterContainer, RegisterTypeButton, RegisterLabel } from './styles';
import { Feather } from '@expo/vector-icons';

type RegisterType = 'receita' | 'despesa';

interface RegisterTypesProps {
    type: RegisterType;
    sendTypeChanged: (name: string) => void;
}

export function RegisterTypes({ type, sendTypeChanged }: RegisterTypesProps) {
    const [typeChecked, setTypeChecked] = useState<RegisterType>(type);

    function changeType(name: string) {
        if(name === 'receita') {
            setTypeChecked("receita")
            sendTypeChanged("receita")
        } else {
            setTypeChecked("despesa")
            sendTypeChanged("despesa")
        }
    }
    return (
        <RegisterContainer>

            <RegisterTypeButton
                checked={typeChecked === 'receita'}
                onPress={() => changeType('receita')}
            >
                <Feather name="arrow-up" size={25} color='#121212' />
                <RegisterLabel>
                    Receita
                </RegisterLabel>
            </RegisterTypeButton>

            <RegisterTypeButton
                checked={typeChecked === 'despesa'}
                onPress={() => changeType('despesa')}
            >
                <Feather name="arrow-down" size={25} color='#121212' />
                <RegisterLabel>
                    Despesa
                </RegisterLabel>
            </RegisterTypeButton>


        </RegisterContainer>
    )
}