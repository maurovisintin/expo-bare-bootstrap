import React from 'react';
import { ActivityIndicator } from 'react-native';

import StyledButton from './styled/ios';
import Text from '../text';
import theme from '../../../theme';
import { ButtonProps } from './props';

const FlatButtonIOS = ({
  type = 'primary',
  size = 'regular',
  title,
  onPress,
  disabled = false,
  loading = false,
  testID
}: ButtonProps) => {
  return (
    <StyledButton
      type={type}
      size={size}
      onPress={onPress}
      disabled={disabled || loading}
      modifiers={disabled || loading ? 'disabled' : ''}
      testID={testID}
      activeOpacity={theme.buttons.opacity}
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
  );
};

export { FlatButtonIOS };
