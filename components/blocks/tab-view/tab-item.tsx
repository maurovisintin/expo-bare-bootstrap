import React, { Dispatch, SetStateAction } from 'react';

import Text from '../../elements/text';
import theme from '../../../theme';
import { TouchableElement, Line, TextWrapper } from './styled';

export type TabItemProps = {
  index: number;
  title: string;
  onPress: Dispatch<SetStateAction<number>>;
  currentSelection: number;
};

const TabItem = ({ index, title, onPress, currentSelection }: TabItemProps) => {
  const isSelected = currentSelection === index;
  return (
    <TouchableElement
      onPress={() => onPress(index)}
      activeOpacity={theme.buttons.opacity}
    >
      <TextWrapper>
        <Text
          modifiers={isSelected ? ['semibold'] : ['light']}
          fontSize={theme.fontSize.extrasmall}
          color={
            isSelected
              ? theme.colors.grayDarker.main
              : theme.colors.grayDark.main
          }
          fontFamily="sansSerif"
          letterSpacing={isSelected ? 1.3 : 0}
        >
          {title.toUpperCase()}
        </Text>
      </TextWrapper>
      <Line modifiers={currentSelection === index && ['visible']} />
    </TouchableElement>
  );
};

export default TabItem;
