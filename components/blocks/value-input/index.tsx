import React, { ReactElement } from 'react';

import InputContainer from './styled/input-container';
import InputValue from './styled/input-value';
import theme from '../../../theme';

export type Props = {
  onChange?: (val: string) => void;
  value: string | undefined;
  placeholder: string;
  testID?: string;
  keyboardType?:
    | 'default'
    | 'email-address'
    | 'numeric'
    | 'phone-pad'
    | 'visible-password'
    | 'ascii-capable'
    | 'numbers-and-punctuation'
    | 'url'
    | 'number-pad'
    | 'name-phone-pad'
    | 'decimal-pad'
    | 'twitter'
    | 'web-search'
    | undefined;
  maxLength?: number;
  rightComponent?: ReactElement;
};

const ValueInput = ({
  onChange,
  value,
  placeholder,
  testID,
  keyboardType = 'default',
  maxLength,
  rightComponent
}: Props) => (
  <InputContainer>
    <InputValue
      onChangeText={onChange}
      value={value}
      placeholder={placeholder}
      returnKeyType="done"
      keyboardType={keyboardType}
      maxLength={maxLength}
      testID={testID}
      placeholderTextColor={theme.colors.grayLight.main}
    />
    {rightComponent}
  </InputContainer>
);

export default ValueInput;
