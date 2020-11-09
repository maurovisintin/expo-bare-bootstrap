import styled from 'styled-components/native';

const InputContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: ${p => p.theme.colors.bgGray};
  border-radius: 10px;
  height: 60px;
  margin-vertical: ${p => p.theme.paddings.extraSmall};
`;

export default InputContainer;
