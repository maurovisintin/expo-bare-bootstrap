import React, { ReactChild } from 'react';
import styled from 'styled-components/native';
import { MaterialIcons } from '@expo/vector-icons';

import CheckboxWrapper from './styled/checkbox-wrapper';
import BoxContainer from './styled/box-container';
import Box from './styled/box';
import Text from '../../elements/text';

import theme from '../../../theme';

export type CheckboxProps = {
  type?: string;
  checked: boolean;
  onChange: () => void;
  children: ReactChild;
  testID?: string;
};

const InputContainer = styled.View`
  flex-shrink: 1;
`;

const FONT_SIZE = parseInt(theme.fontSize.paragraph, 10);
const LINE_HEIGHT = FONT_SIZE * parseFloat(theme.lineHeights.regular);

const MARGIN_TOP = (LINE_HEIGHT - FONT_SIZE) / 2;

const Checkbox = ({
  type = 'gray',
  checked,
  children,
  onChange,
  testID
}: CheckboxProps) => (
  <CheckboxWrapper onPress={onChange} testID={testID}>
    <BoxContainer size={LINE_HEIGHT} paddingTop={MARGIN_TOP}>
      <Box modifiers={[checked && 'checked']} type={type}>
        {checked && (
          <MaterialIcons
            name="check"
            size={parseInt(theme.fontSize.paragraph, 10)}
            color="white"
          />
        )}
      </Box>
    </BoxContainer>
    <InputContainer>
      <Text fontFamily="sansSerif" modifiers="light">
        {children}
      </Text>
    </InputContainer>
  </CheckboxWrapper>
);

Checkbox.CheckboxWrapper = CheckboxWrapper;

export default Checkbox;
