import React from 'react';
import styled from 'styled-components/native';
import InputContainer from './styled/input-container';
import InputValue from './styled/input-value';
import InputLabel from '../../elements/input-field/styled/input-label';
import ErrorMessage from './styled/error-message';

import theme from '../../../theme';

export type Props = {
  fieldActive: boolean;
  fieldFocus?: boolean;
  error?: boolean;
  errorMessage?: string;
  onChange?: (val: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  value: string;
  type?: string;
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
  returnKeyType?:
    | 'none'
    | 'default'
    | 'done'
    | 'go'
    | 'next'
    | 'search'
    | 'send'
    | 'previous'
    | 'google'
    | 'join'
    | 'route'
    | 'yahoo'
    | 'emergency-call'
    | undefined;
  labelText: string;
  disabled?: boolean;
  autoFocus?: boolean;
  editable?: boolean;
  maxLength?: number;
  placeholder?: string;
  inputRef?: any;
  testID?: string;
  autoCompleteType?:
    | 'off'
    | 'username'
    | 'password'
    | 'email'
    | 'name'
    | 'tel'
    | 'street-address'
    | 'postal-code'
    | 'cc-number'
    | 'cc-csc'
    | 'cc-exp'
    | 'cc-exp-month'
    | 'cc-exp-year';
};

const VerticalContainer = styled.View`
  flex: 1;
`;

const TextInput = ({
  onChange,
  onFocus,
  onBlur,
  value,
  keyboardType = 'default',
  labelText,
  fieldActive,
  fieldFocus = false,
  errorMessage,
  error,
  disabled = false,
  editable = true,
  autoFocus,
  returnKeyType,
  maxLength,
  placeholder,
  inputRef,
  testID,
  autoCompleteType
}: Props) => (
  <InputContainer
    modifiers={[
      fieldFocus && 'focus',
      error && 'error',
      disabled && 'disabled'
    ]}
  >
    <VerticalContainer>
      <InputLabel
        modifiers={[
          fieldActive && 'active',
          fieldFocus && 'focus',
          error && 'error',
          disabled && 'disabled'
        ]}
      >
        {labelText}
      </InputLabel>
      <InputValue
        autoCompleteType={autoCompleteType}
        editable={editable}
        keyboardType={keyboardType}
        onChangeText={onChange}
        value={value}
        onFocus={onFocus}
        onBlur={onBlur}
        modifiers={[error && 'error', disabled && 'disabled']}
        autoFocus={autoFocus}
        returnKeyType={returnKeyType}
        maxLength={maxLength}
        placeholder={fieldActive ? placeholder || labelText : ''}
        autoCorrect={false}
        ref={inputRef}
        testID={testID}
        placeholderTextColor={theme.colors.grayLight.main}
      />
      {error && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </VerticalContainer>
  </InputContainer>
);

TextInput.InputContainer = InputContainer;
TextInput.InputLabel = InputLabel;
TextInput.InputField = InputValue;
TextInput.ErrorMessage = ErrorMessage;

export default TextInput;
