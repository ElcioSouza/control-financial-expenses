import React,{useState} from 'react';
import {Container, ButtonFilterText, ModalContent,ButtonFilter} from './styles'
import {Calendar, LocaleConfig,DateData} from 'react-native-calendars'
import {ptBR} from './localeCalendar'

LocaleConfig.locales['pt-br'] = ptBR;
LocaleConfig.defaultLocale = 'pt-br';

import { View, TouchableWithoutFeedback } from 'react-native';

interface CalendarModalProps {
  modalVisible: () => void;
  handleFilter: (dateSelected: Date) => void;
}

export default function CalendarModal({modalVisible,handleFilter}: CalendarModalProps) {
  const [dataNow, setDataNow] = useState(new Date());
  const [markedDates, setmarkedDate] = useState({});

function handleOnDayPress(date: DateData) {
  setDataNow(new Date(date.dateString))
  let markedDay: Record<string, {selected: boolean, selectedColor: string, textColor: string}> = {};

  markedDay[date.dateString] = {
    selected: true,
    selectedColor: '#3d3dbf',
    textColor: '#ffff'
  }

  setmarkedDate(markedDay);

}

function handleFilterDate() {
  handleFilter(dataNow)
  modalVisible()
} 

 return (
    <Container>
      <TouchableWithoutFeedback onPress={modalVisible}>
        <View style={{flex:1}}></View>
      </TouchableWithoutFeedback>
      <ModalContent>

        <Calendar
          onDayPress={handleOnDayPress}
          markedDates={markedDates}
          enableSwipeMonths={true}
          theme={{
            todayTextColor: '#ff0000',
            selectedDayBackgroundColor: '#00adf5',
            selectedDayTextColor: '#fff'
          }}
        />

        <ButtonFilter onPress={handleFilterDate}>
          <ButtonFilterText>Filtrar</ButtonFilterText>
        </ButtonFilter>
      </ModalContent>
    </Container>
  )
}