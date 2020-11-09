import React from 'react';

import Container from './styled/container';
import HorizontalContainer from './styled/horizontal-container';
import Text from '../../elements/text';
import theme from '../../../theme';
import Icon from '../../elements/icon';

export type ChoiceItemProps = {
  code: string;
  label: string;
  icon: string;
  additionalInfo?: string;
};

type Props = {
  item: ChoiceItemProps;
  onSelect: (item: string) => void;
  value?: string;
  testID?: string;
};

const ChoiceItem = ({ item, onSelect, value, testID }: Props) => (
  <Container
    onPress={() => onSelect(item.code)}
    modifiers={value === item.code ? 'selected' : ''}
    testID={testID}
  >
    <HorizontalContainer>
      <Icon
        name={item.icon as never}
        color={value === item.code ? 'white' : theme.colors.primary.main}
        size={parseFloat(theme.iconSizes.small)}
      />
      <Text
        color={value === item.code && 'white'}
        fontFamily="sansSerif"
        modifiers={['semibold']}
        fontSize={theme.fontSize.h6}
      >
        {` ${item.label} `}
      </Text>
      <Text
        color={value === item.code ? 'white' : theme.colors.gray.main}
        fontFamily="sansSerif"
        modifiers="light"
        fontSize={theme.fontSize.small}
      >
        {item.additionalInfo}
      </Text>
    </HorizontalContainer>
  </Container>
);

export default ChoiceItem;
