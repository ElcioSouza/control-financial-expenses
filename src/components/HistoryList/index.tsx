import { View, TouchableWithoutFeedback, Alert,Text } from 'react-native';
import { Container, TipoText, Tipo, IconView, ValorText } from './style';
import { Feather } from '@expo/vector-icons';
import { ListReceives } from './type';

interface HistoryListProps {
  data: ListReceives,
  deleteItem: (id: string) => Promise<void>
}

export default function HistoryList({ data, deleteItem }: HistoryListProps) {

  function handleDeleteItem(){
    Alert.alert(
      "Atenção",
      "Você tem  certeza que deseja deletar esse registro?",
      [
        {
          text: 'Cancelar',
          style: 'cancel'
        },
        {
          text: 'Continuar',
          onPress: () => {
            if(data.id) {
              deleteItem(data.id)
            }
          }
        }
      ]
    )
  }
  return (
    <TouchableWithoutFeedback onPress={handleDeleteItem}>
      <Container>
        <Tipo>
          <IconView tipo={data?.type || ''}>
            <Feather name={data?.type === 'despesa' ? 'arrow-down' : 'arrow-up'} size={20} color="#fff"></Feather>
            <TipoText>{data?.type}</TipoText>
          </IconView>
        </Tipo>
        <ValorText>
          R$ {data?.value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </ValorText>
      </Container>
    </TouchableWithoutFeedback>
  );
}