import styled from 'styled-components/native';
import { TextInput } from 'react-native';

type Props = {
  isValid?: boolean;
  testID?: string;
};

const InputValue = styled(TextInput)<Props>`
  font-size: ${p => p.theme.fontSize.h3};
  color: ${p =>
    p.isValid ? p.theme.colors.grayDarker.main : p.theme.colors.primary.main};
  font-family: ${p => p.theme.fonts['sansSerif-semibold']};
  flex: 1;
  text-align: right;
  margin-right: ${p => p.theme.paddings.regular};
  height: 50px;
`;

export default InputValue;
