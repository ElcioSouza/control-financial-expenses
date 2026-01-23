import styled from 'styled-components/native';
export const Background = styled.View`
     flex: 1;
     background-color: #F0F4FF;
`;
export const Container = styled.View`
margin-top: 14px;
alignItems: center;
`
export const Input = styled.TextInput`
  height: 50px;
  width: 90%;
  background-color: #FFF;
  font-size: 17px;
  padding: 0 8px;
  margin-bottom: 14px;
  border-radius: 4px;
`;

export const SubmitButton = styled.TouchableOpacity<{label: string}>`
  width: 90%;
  height: 50px;
  align-items: center;
  justify-content: center;
  background-color:  #00b94a;
  background-color:  ${props => props.label === "Registrar" ? '#00b94a': '#3b3dbf'};
  border-radius: 4px;
  margin-top: 15px;
`;

export const SubmitText = styled.Text`
 color: #fff;
 font-size: 21px;
 font-weight: bold
`;

