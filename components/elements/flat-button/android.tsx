import React from 'react';
import { ActivityIndicator, TouchableNativeFeedback } from 'react-native';

import StyledButton from './styled/android';
import Text from '../text';
import theme from '../../../theme';
import { ButtonProps } from './props';

export const FlatButtonAndroid = ({
  type = 'primary',
  size = 'regular',
  title,
  onPress,
  disabled = false,
  loading = false,
  testID
}: ButtonProps) => {
  return (
    <TouchableNativeFeedback
      onPress={onPress}
      disabled={disabled || loading}
      background={TouchableNativeFeedback.SelectableBackground()}
      testID={testID}
    >
      <StyledButton
        type={type}
        size={size}
        modifiers={disabled || loading ? 'disabled' : ''}
      >
        {loading ? (
          <ActivityIndicator size="small" color="white" />
        ) : (
          <Text
            color="white"
            fontFamily="sansSerif"
            modifiers={['semibold']}
            fontSize={theme.buttons.fontSize[size]}
          >
            {title.toUpperCase()}
          </Text>
        )}
      </StyledButton>
    </TouchableNativeFeedback>
  );
};
