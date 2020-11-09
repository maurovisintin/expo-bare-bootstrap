import React, { useRef, useCallback } from 'react';
import { TouchableOpacity, InteractionManager, TextInput } from 'react-native';
import styled from 'styled-components/native';

import { useFocusEffect } from '@react-navigation/native';
import Action from '../../elements/typography/action';
import Icon from '../../elements/icon';
import { InputValue, SearchContainer, Container } from './styled/header';
import theme from '../../../theme';

const StyledIcon = styled(Icon)`
  margin-right: 10px;
`;

type Props = {
  onFilterChange: (text: string) => void;
  onClose: () => void;
  value: string;
  placeholder: string;
  isVisible: boolean;
};

const Header = ({
  value,
  onFilterChange,
  onClose,
  placeholder,
  isVisible
}: Props) => {
  const inputRef = useRef<TextInput>();

  useFocusEffect(
    useCallback(() => {
      const task = InteractionManager.runAfterInteractions(() => {
        if (isVisible && !!inputRef && !!inputRef.current) {
          setTimeout(() => {
            inputRef?.current?.focus();
          }, 200);
        }
      });

      return () => task.cancel();
    }, [])
  );

  return (
    <Container>
      <SearchContainer>
        <StyledIcon name="Search" />
        <InputValue
          inputRef={inputRef}
          autoFocus
          onChangeText={(text: string) => onFilterChange(text)}
          placeholder={placeholder}
          value={value}
          clearButtonMode="while-editing"
          testID="search-filter"
          placeholderTextColor={theme.colors.grayLight.main}
        />
      </SearchContainer>
      <TouchableOpacity onPress={onClose} activeOpacity={theme.buttons.opacity}>
        <Action>Annulla</Action>
      </TouchableOpacity>
    </Container>
  );
};

export default Header;
