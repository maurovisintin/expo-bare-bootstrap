import React from 'react';
import { ActivityIndicator } from 'react-native';

import StyledButton from './styled';
import Text from '../text';
import theme, { ButtonSize, Colors, Color } from '../../../theme';

type Props = {
  title: string;
  size?: keyof ButtonSize;
  type?: keyof Colors;
  modifiers?: any;
  onPress: () => void;
  loading?: boolean;
  testID?: string;
  disabled?: boolean;
};

const InvertedButton = ({
  type = 'primary',
  size = 'regular',
  title,
  modifiers,
  onPress,
  loading = false,
  testID,
  disabled
}: Props) => {
  const color = theme.colors[type] as Color;
  return (
    <StyledButton
      type={type}
      size={size}
      onPress={onPress}
      modifiers={modifiers}
      testID={testID}
      activeOpacity={theme.buttons.opacity}
    >
      {loading ? (
        <ActivityIndicator size="small" color={theme.colors.grayLight.main} />
      ) : (
        <Text
          color={disabled ? color.disabled : color.main}
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

export default InvertedButton;
