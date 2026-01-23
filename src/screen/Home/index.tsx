import React, { useEffect, useState, useContext } from 'react'
import { TouchableOpacity, Modal, Alert } from 'react-native';
import { Background,ListBalance,Area,Title,List } from './styles';
import { Header } from '../../components/Header';
import { SafeAreaView } from 'react-native-safe-area-context';
import { format } from 'date-fns'
import { useIsFocused } from '@react-navigation/native';
import { BalanceItem, ListReceives } from './types';
import BalanceItems from '../../components/BalanceItems';
import { Feather } from '@expo/vector-icons';
import HistoryList from '../../components/HistoryList'
import CalendarModal from '../../components/CalendarModal';
import { AuthContext } from '../../contexts/auth';
import { ListReceivesController } from '../../controllers/receive/ListReceivesController';
import { ListUserBalanceController } from '../../controllers/user/ListUserBalanceController';
import { DeleteReceiveController } from '../../controllers/receive/DeleteReceiveController';

export default function Home() {
  const isFocused = useIsFocused();
  const { user } = useContext(AuthContext);
  const [listBalance, setListBalance] = useState<BalanceItem[]>([]);
  const [dateMovements, setDateMovements] = useState(new Date());
  const [listReceives, setListReceives] = useState<ListReceives[]>([]);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    let isActive = true;

    async function getMovements() {
      if (!user) {
        console.log("Usuário não autenticado");
        return;
      }

      try {
        let date = new Date(dateMovements);
        let onlyDate = date.valueOf() + date.getTimezoneOffset() * 60 * 1000;
        let dateFormated = format(onlyDate, "yyyy-MM-dd");

        const listReceivesController = new ListReceivesController();
        const receivesResult = await listReceivesController.handle({
          user_id: user.id,
          date: dateFormated
        });

        const listBalanceController = new ListUserBalanceController();
        const balanceResult = await listBalanceController.handle({
          user_id: user.id,
          date: dateFormated
        });

        if (isActive) {
          if (receivesResult.success) {
            setListReceives(receivesResult.data);
          }

          if (balanceResult.success) {
          
            const balanceData = [
              {
                tag: 'saldo',
                saldo: balanceResult.data.balance
              },
              {
                tag: 'receita',
                saldo: balanceResult.data.receitas
              },
              {
                tag: 'despesa',
                saldo: balanceResult.data.despesas
              }
            ];
            setListBalance(balanceData);
          }
        }
      } catch (error) {
        console.error("Erro ao buscar movimentações:", error);
      }
    }

    getMovements();

    return () => {
      isActive = false;
    }
  }, [isFocused, dateMovements, user]);

  async function handleDeleteMovementRegister(id: string) {
    if (!user) {
      Alert.alert("Erro", "Usuário não autenticado");
      return;
    }

    try {
      const deleteController = new DeleteReceiveController();
      const result = await deleteController.handle({
        item_id: id,
        user_id: user.id
      });

      if (result.success) {
        Alert.alert("Sucesso", "Movimentação deletada com sucesso!");
        setDateMovements(new Date());
      } else {
        Alert.alert("Erro", result.error || "Erro ao deletar movimentação");
      }
    } catch (err) {
      console.error("Erro ao deletar:", err);
      Alert.alert("Erro", "Erro ao deletar movimentação");
    }
  }

  function filterDateMovements(dateSelected: Date) {
    setDateMovements(dateSelected);
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Background>
        <Header title="Minhas Movimentações" />
        <ListBalance
          data={listBalance}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => String(index)}
          renderItem={({ item }) => (
            <BalanceItems data={item} />
          )}
        />

        <Area>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Feather name='calendar' color="#121212" size={30} />
          </TouchableOpacity>
          <Title>Ultimas Movimentações</Title>
        </Area>

        <List 
          data={listReceives}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (<HistoryList data={item} deleteItem={handleDeleteMovementRegister} />)}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
        />

        <Modal visible={modalVisible} animationType='fade' transparent={true}>
          <CalendarModal modalVisible={() => setModalVisible(!modalVisible)} handleFilter={filterDateMovements} />
        </Modal>
      </Background>
    </SafeAreaView>
  );
}
