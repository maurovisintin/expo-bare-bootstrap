import React from 'react';
import styled from 'styled-components/native';

import Container from './styled/container';
import Text from '../../elements/text';
import theme from '../../../theme';
import Icon from '../../elements/icon';

export type ChoiceItemProps = {
  code: string;
  label: string;
  icon?: string;
};

type Props = {
  item: ChoiceItemProps;
  onSelect: (item: string) => void;
  value?: string;
};

const Content = styled.View`
  flex-direction: row;
  align-items: center;
`;

const StyledIcon = styled(Icon)`
  margin-right: ${p => p.theme.paddings.small};
`;

const ChoiceItem = ({ item, onSelect, value }: Props) => (
  <Container
    onPress={() => onSelect(item.code)}
    modifiers={value === item.code ? 'selected' : ''}
  >
    <Content>
      {item.icon && (
        <StyledIcon
          name={item.icon}
          color={theme.colors.grayDark.main}
          size={parseFloat(theme.iconSizes.regular)}
        />
      )}
      <Text
        color={value === item.code ? 'white' : theme.colors.grayDarker.main}
        fontFamily="sansSerif"
        modifiers={value === item.code ? 'semibold' : 'light'}
        fontSize={theme.fontSize.paragraph}
      >
        {item.label}
      </Text>
    </Content>
  </Container>
);

export default ChoiceItem;
