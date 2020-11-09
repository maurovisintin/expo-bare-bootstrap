import styled from 'styled-components/native';

type Props = {
  modifiers?: any;
  testID?: string;
};

const InputContainer = styled.TouchableOpacity<Props>`
  margin-vertical: 10px;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  border-bottom-width: 1px;
  border-color: ${p => p.theme.colors.gray.main};
  padding-bottom: 5px;
  min-height: ${p => p.theme.buttons.height.large};
  padding-right: 5px;
`;

export default InputContainer;
