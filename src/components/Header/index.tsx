import React from 'react';
import { Container, Title,ButtonMenu } from './styles';
import { headerProps } from './headerType'
import { Feather } from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import {AuthStackParamList} from './../../routes/types';

type NavigationProp = DrawerNavigationProp<AuthStackParamList, keyof AuthStackParamList>

export function Header({ title }: headerProps) {
  const navigation = useNavigation<NavigationProp>();
  return (
    <Container>
      <ButtonMenu onPress={() => navigation.openDrawer() }>
        <Feather name="menu" size={35} color="#121212" />
      </ButtonMenu>
      {title && (
        <Title>
          {title}
        </Title>
      )}

    </Container>
  )
} 7