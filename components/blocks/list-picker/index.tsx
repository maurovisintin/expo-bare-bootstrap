import React, { useState, useEffect } from 'react';
import {
  Modal,
  KeyboardAvoidingView,
  SafeAreaView,
  Platform
} from 'react-native';

import Spinner from '../../elements/spinner';
import List from './list';
import ListItem from './list-item';
import Header from './header';

type ListItemProps = React.ComponentProps<typeof ListItem>['item'];

type ListProps = React.ComponentProps<typeof List>;
type ListPropsData = ListProps['data'];
type ListPropsItem = ListProps['value'];
type ListPropsOnSelect = ListProps['onSelect'];

export type ListPickerProps = {
  inputData: ListPropsData;
  isVisible: boolean;
  isLoading: boolean;
  value: ListPropsItem;
  filterPlaceholder: string;
  onSelect: ListPropsOnSelect;
  onClose: () => void;
};

const isIOS = Platform.OS === 'ios';
const behaviorConfig = isIOS ? 'height' : undefined;

const sortInputFirst = (input: string, data: ListItemProps[]) => {
  const first: ListItemProps[] = [];
  const others: ListItemProps[] = [];
  data.forEach(item => {
    if (item.displayValue.toLowerCase().indexOf(input.toLowerCase()) === 0) {
      first.push(item);
    } else if (
      item.displayValue.toLowerCase().indexOf(input.toLowerCase()) > 0
    ) {
      others.push(item);
    }
  });

  return first.concat(others);
};

const ListPicker = ({
  inputData = [],
  isVisible,
  value,
  onSelect,
  onClose,
  isLoading = false,
  filterPlaceholder
}: ListPickerProps) => {
  const [filter, setFilter] = useState('');
  const [data, setData] = useState(inputData);

  useEffect(() => {
    setFilter('');
    setData(inputData);
  }, [isVisible]);

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <KeyboardAvoidingView
          style={{ flex: 1, paddingHorizontal: 20, marginBottom: 20 }}
          behavior={behaviorConfig}
        >
          <Header
            value={filter}
            isVisible={isVisible}
            onClose={onClose}
            onFilterChange={(text: string) => {
              setFilter(text);
              setData(sortInputFirst(text, inputData));
            }}
            placeholder={filterPlaceholder}
          />
          {isLoading ? (
            <Spinner />
          ) : (
            <List
              data={data}
              onSelect={(item: ListItemProps) => {
                onSelect(item);
                onClose();
              }}
              value={value}
            />
          )}
        </KeyboardAvoidingView>
      </SafeAreaView>
    </Modal>
  );
};

export default ListPicker;
