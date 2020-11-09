import styled from 'styled-components/native';
import { TextInput } from 'react-native';

export const Container = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 60px;
`;

export const SearchContainer = styled.View`
  flex-direction: row;
  align-items: center;
  height: 60px;
  flex: 1;
`;

export const InputValue = styled.TextInput<{
  inputRef: React.MutableRefObject<TextInput | undefined>;
}>`
  color: ${p => p.theme.colors.grayDark.main};
  font-size: ${p => p.theme.fontSize.paragraph};
  font-family: ${p => p.theme.fonts.sansSerif};
  flex: 1;
`;
