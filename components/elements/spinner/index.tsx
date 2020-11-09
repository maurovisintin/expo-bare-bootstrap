import React from 'react';
import { ActivityIndicator, Platform } from 'react-native';
import SpinnerContainer from './styled';
import theme from '../../../theme';

type Props = {
  size?: 'small' | 'large';
  modifiers?: any;
};

const isIOS = Platform.OS === 'ios';

const Spinner = ({ size = isIOS ? 'small' : 'large', modifiers }: Props) => (
  <SpinnerContainer modifiers={modifiers}>
    <ActivityIndicator
      size={size}
      color={isIOS ? theme.colors.gray.main : theme.colors.primary.main}
    />
  </SpinnerContainer>
);

export default Spinner;
