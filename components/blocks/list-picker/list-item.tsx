import React from 'react';
import styled from 'styled-components/native';

import Checkmark from './styled/checkmark';
import Text from '../../elements/text';
import theme from '../../../theme';

const Container = styled.TouchableOpacity`
  padding-vertical: 15px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

type ListItemType = {
  key: string;
  displayValue: string;
};

type Props = {
  item: ListItemType;
  onSelect: (item: ListItemType) => void;
  value: ListItemType | undefined;
  testID?: string;
};

const ListItem = ({ item, onSelect, value, testID }: Props) => (
  <Container
    key={item.key}
    onPress={() => onSelect(item)}
    testID={testID}
    activeOpacity={theme.buttons.opacity}
  >
    <Text>{item.displayValue}</Text>
    {value && item.key === value.key && <Checkmark />}
  </Container>
);

export default ListItem;
