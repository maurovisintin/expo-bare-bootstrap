import styled from 'styled-components/native';
import React from 'react';
import { ImageSourcePropType, Dimensions } from 'react-native';

import { FlatButton } from '../elements/flat-button';
import Text from '../elements/text';
import theme from '../../theme';

const { height } = Dimensions.get('window');

const Container = styled.View`
  padding-bottom: ${p => p.theme.paddings.small};
  flex: 1;
`;

const SpacedContainer = styled.View`
  flex: 1;
  margin-bottom: ${p => p.theme.paddings.regular};
`;

const ImageContainer = styled.View`
  flex: 1;
  align-items: center;
`;

const StyledImage = styled.Image`
  height: ${Math.round(height * 0.45)}px;
  resize-mode: contain;
  margin-top: 20px;
`;

const StyledText = styled(Text)`
  margin-horizontal: ${p => p.theme.paddings.regular};
  margin-vertical: ${p => p.theme.paddings.small};
`;

const ButtonContainer = styled.View`
  margin-horizontal: ${p => p.theme.paddings.regular};
`;

type Props = {
  action: () => void;
  image: ImageSourcePropType;
  message: string;
  actionMessage: string;
  loading?: boolean;
};

const MessagePlaceholder = ({
  action,
  image,
  message,
  actionMessage,
  loading = false
}: Props) => {
  return (
    <Container>
      <SpacedContainer>
        <StyledText
          color={theme.colors.grayDark.main}
          fontFamily="sansSerif"
          fontSize={theme.fontSize.h6}
          letterSpacing={-0.32}
          modifiers={['light', 'smallHeight']}
        >
          {message}
        </StyledText>
        <ImageContainer>
          <StyledImage source={image} />
        </ImageContainer>
      </SpacedContainer>
      <ButtonContainer>
        <FlatButton
          title={actionMessage}
          onPress={action}
          size="large"
          loading={loading}
        />
      </ButtonContainer>
    </Container>
  );
};

export default MessagePlaceholder;
