import React from 'react';
import { FlatList } from 'react-native';
import styled from 'styled-components/native';

import theme from '../../../theme';
import Text from '../../elements/text';
import ListItem from './list-item';

const EmptyContainer = styled.View`
  padding-vertical: 20px;
`;

type ListItemProps = React.ComponentProps<typeof ListItem>;
type ListItemType = ListItemProps['item'];

type Props = {
  data: ListItemType[] | undefined;
  onSelect: (item: ListItemType) => void;
  value: ListItemType | undefined;
};

const ITEM_HEIGHT = parseInt(theme.buttons.height.regular, 10);

const List = ({ data, onSelect, value }: Props) => {
  return (
    <FlatList
      keyboardShouldPersistTaps="always"
      data={data || null}
      renderItem={({ item, index }) => (
        <ListItem
          item={item}
          onSelect={onSelect}
          value={value}
          testID={index.toString()}
        />
      )}
      ListEmptyComponent={() => (
        <EmptyContainer>
          <Text>No elements</Text>
        </EmptyContainer>
      )}
      getItemLayout={(itemData, index) => ({
        length: ITEM_HEIGHT,
        offset: ITEM_HEIGHT * index,
        index
      })}
      extraData={data}
      keyExtractor={(item: ListItemType) => item.key}
    />
  );
};

export default List;
