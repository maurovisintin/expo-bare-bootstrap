import React from 'react';
import { Text, theme } from 'ui-lib-react-native';
import styled from 'styled-components/native';
import CircleButtonGroup from './circle-button-group';
import { images } from '../assets/images';

type CircleButtonGroupProps = React.ComponentProps<typeof CircleButtonGroup>;

type TabHeadingProps = {
  heading: string;
  buttons?: CircleButtonGroupProps['buttons'];
  message?: string;
  withLogo?: boolean;
  removePadding?: boolean;
};

type HeaderContainerProps = {
  removePadding: boolean;
};

const HeaderContainer = styled.View<HeaderContainerProps>`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-horizontal: ${p => (p.removePadding ? 0 : p.theme.paddings.regular)};
  margin-top: ${p => (p.removePadding ? 0 : p.theme.paddings.regular)};
`;

const SideContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

const Logo = styled.Image`
  height: ${p => p.theme.iconSizes.regular};
  width: ${p => p.theme.iconSizes.regular};
  resize-mode: contain;
`;

const LogoContainer = styled.View`
  height: ${p => p.theme.iconSizes.small};
  width: ${p => p.theme.iconSizes.small};
  border-radius: ${p => p.theme.paddings.small};
  background-color: ${p => p.theme.colors.primary.main};
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0px;
  right: -20px;
`;

const TabHeading = ({
  buttons,
  heading,
  message,
  withLogo,
  removePadding = false
}: TabHeadingProps) => (
  <HeaderContainer removePadding={removePadding}>
    <SideContainer
      style={{
        maxWidth: buttons && buttons.length > 0 ? '50%' : undefined
      }}
    >
      <Text
        fontFamily="serif"
        modifiers={['black']}
        fontSize={theme.fontSize.h1}
      >
        {heading}
      </Text>
      {withLogo && (
        <LogoContainer>
          <Logo source={images.other.logo} />
        </LogoContainer>
      )}
    </SideContainer>
    <SideContainer>
      {buttons && <CircleButtonGroup buttons={buttons} />}
      {message && (
        <Text
          fontSize={theme.fontSize.extrasmall}
          fontFamily="sansSerif"
          modifiers={['semibold']}
          color={theme.colors.primary.main}
          letterSpacing={1}
        >
          {message.toUpperCase()}
        </Text>
      )}
    </SideContainer>
  </HeaderContainer>
);

export default TabHeading;
