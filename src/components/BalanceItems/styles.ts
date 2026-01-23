import styled from "styled-components/native";

interface ContainerProps {
   bg: string;
}

export const Container = styled.View<ContainerProps>`
   background-color:  #${ props => props.bg };
   margin-left: 14px;
   margin-right: 14px;
   border-radius: 4px;
   justify-content: center;
   align-items: flex-start;
   width: 300px;
   padding-Left: 14px
`

export const Label = styled.Text`
  color: #fff;
  font-size: 19px;
  font-weight: bold;
`

export const Balance = styled.Text`
   margin-top: 5px;
   font-size: 30px;
   color: #fff
`
