import styled from 'styled-components/native';

const InputContainer = styled.View`
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  background-color: ${p => p.theme.colors.bgGray};
  border-radius: 10px;
  padding-horizontal: ${p => p.theme.paddings.small};
  height: 60px;
  margin-vertical: ${p => p.theme.paddings.extraSmall};
`;

export default InputContainer;
