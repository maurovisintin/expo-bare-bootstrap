import React, { ReactChild } from 'react';
import { View } from 'react-native';

import Text from '../../elements/text';
import theme from '../../../theme';
import { StyledContainer, InfoContainer } from './styled';

type Props = {
  heading: string;
  info?: ReactChild;
  modifiers?: string[];
  size?: 'regular' | 'small';
};

const HeroOne = ({
  heading,
  info,
  size = 'regular',
  modifiers = []
}: Props) => (
  <StyledContainer modifiers={modifiers}>
    <View>
      <Text
        fontFamily="serif"
        modifiers={['black', ...modifiers]}
        fontSize={size === 'regular' ? theme.fontSize.h1 : theme.fontSize.h2}
      >
        {heading}
      </Text>
    </View>
    {!!info && (
      <InfoContainer>
        <Text
          fontFamily="sansSerif"
          modifiers={['light', 'smallHeight', ...modifiers]}
          color={theme.colors.grayDark.main}
          fontSize={
            size === 'regular' ? theme.fontSize.paragraph : theme.fontSize.small
          }
        >
          {info}
        </Text>
      </InfoContainer>
    )}
  </StyledContainer>
);

export default HeroOne;
