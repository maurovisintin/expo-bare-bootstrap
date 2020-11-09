import styled from 'styled-components/native';
import { TextInput } from 'react-native';

type Props = {
  testID?: string;
};

const InputValue = styled(TextInput)<Props>`
  font-size: ${p => p.theme.fontSize.paragraph};
  color: ${p => p.theme.colors.grayDarker.main};
  font-family: ${p => p.theme.fonts['sansSerif-semibold']};
  flex: 1;
  margin-right: ${p => p.theme.paddings.regular};
  height: 50px;
`;

export default InputValue;
