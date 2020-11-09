import React, { ReactElement, useState, useEffect } from 'react';

import InputContainer from './styled/input-container';
import InputValue from './styled/input-value';

import theme from '../../../theme';

export type Props = {
  onChange?: (val: string | undefined) => void;
  value: string | undefined;
  placeholder: string;
  testID?: string;
  maxDecimal?: number;
  // maxLength?: number;
  leftComponent?: ReactElement;
  isValid?: boolean;
};

const AmountInput = ({
  onChange,
  value,
  placeholder,
  testID,
  maxDecimal = 2,
  leftComponent,
  isValid = true
}: Props) => {
  const [allowDecimalInput, setAllowDecimalInput] = useState(true);

  const parseStringValue = (string: string | undefined) => {
    if (string) {
      // TODO We should be localising and forceCorrectDecimalSeparator
      return string;
    }
    return undefined;
  };

  useEffect(() => {
    if (value) {
      // TODO What happens when this is localised, should probs check for ","
      setAllowDecimalInput(!value.includes('.'));
    }
  }, [value]);

  const onUpdate = (val: string) => {
    // Force number input only
    const valNumsOnly = val.replace(/[^0-9.,]/g, '');
    if (onChange) {
      onChange(valNumsOnly);
    }
  };

  return (
    <InputContainer>
      {leftComponent}
      <InputValue
        contextMenuHidden
        onChangeText={onUpdate}
        value={parseStringValue(value)}
        placeholder={placeholder}
        returnKeyType="done"
        keyboardType={allowDecimalInput ? 'decimal-pad' : 'number-pad'}
        maxLength={10}
        isValid={isValid}
        testID={testID}
        placeholderTextColor={theme.colors.grayLight.main}
        autoCapitalize="none"
      />
    </InputContainer>
  );
};

export default AmountInput;
