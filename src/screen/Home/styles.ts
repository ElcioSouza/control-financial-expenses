import styled from "styled-components/native";
import { FlatList, FlatListProps } from "react-native";
import { BalanceItem } from "./types";
import { ListReceives } from "../../components/HistoryList/type";

export const Background = styled.View`
    flex: 1;
    background-Color: #F0F4FF
`
export const ListBalance = styled.FlatList<FlatListProps<BalanceItem>>`
 max-height: 190px;
` as unknown as typeof FlatList<BalanceItem>;

export const Area = styled.View`
margin-top: 24px;
background-color: #fff;
border-top-left-radius: 15px;
border-top-right-radius: 15px;
flex-direction: row;
padding-left: 14px;
padding-right: 14px;
padding-top: 14px;
align-items: baseline;
`

export const Title = styled.Text`
margin-left: 5px;
color: #121212;
margin-bottom: 14px;
font-weight: bold;
font-size: 18px;
`

export const List = styled.FlatList<FlatListProps<ListReceives>>`  
  flex: 1;
  background-color: #fff;
`  as unknown as typeof FlatList<ListReceives>;
