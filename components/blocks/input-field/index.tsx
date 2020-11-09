import React from 'react';
import styled from 'styled-components/native';

import InputContainer from './styled/input-container';
import InputValue from './styled/input-value';
import InputLabel from '../../elements/input-field/styled/input-label';
import Icon from '../../elements/icon';
import theme from '../../../theme';

const VerticalContainer = styled.View`
  flex: 1;
`;

export type Props = {
  onPress: () => void;
  value: string;
  labelText: string;
  disabled?: boolean;
  testID?: string;
};

const InputField = ({
  value,
  labelText,
  onPress,
  disabled = false,
  testID
}: Props) => (
  <InputContainer
    onPress={onPress}
    modifiers={[disabled && 'disabled']}
    testID={testID}
  >
    <VerticalContainer>
      <InputLabel modifiers={[value ? 'active' : '', disabled && 'disabled']}>
        {labelText}
      </InputLabel>
      <InputValue modifiers={disabled && 'disabled'}>{value}</InputValue>
    </VerticalContainer>
    <Icon
      name={'Arrow_right' as never}
      size={parseFloat(theme.iconSizes.small)}
      color={theme.colors.gray.main}
    />
  </InputContainer>
);

InputField.InputContainer = InputContainer;
InputField.InputLabel = InputLabel;
InputField.InputValue = InputValue;

export default InputField;
