import React, { useMemo }from 'react';
import { Balance, Container, Label } from './styles';
interface BalanceItemsProps {
  data: {
    tag?: string;
    saldo?: number;
  };
}
export default function BalanceItems({ data }:BalanceItemsProps) {
  const labelName = useMemo(()=>{
    if(data.tag === 'saldo') {
      return {
        label: 'Saldo atual',
        color: '3d3dbf'
      }
    }
    else if(data.tag === 'receita') {
      return {
        label: 'Entrada de hoje',
        color: '00b94a'
      }
    } else {
       return {
        label: 'Saida de hoje',
        color: 'ef463a'
      }
    } 
  },[data])  
  return (
        <Container bg={labelName.color} >
            <Label> {labelName.label} </Label>
            <Balance>R$ {data.saldo.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Balance>
        </Container>
    );
}