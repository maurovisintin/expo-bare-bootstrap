import React from 'react';
import styled from 'styled-components/native';

import Action from '../typography/action';
import theme from '../../../theme';

const Container = styled.TouchableOpacity`
  margin-right: 15px;
`;

export type NavigationBarProps = {
  onPress: () => void;
  title: string;
};

const HeaderAction = ({ title, onPress }: NavigationBarProps) => (
  <Container onPress={onPress} activeOpacity={theme.buttons.opacity}>
    <Action>{title}</Action>
  </Container>
);

export default HeaderAction;
