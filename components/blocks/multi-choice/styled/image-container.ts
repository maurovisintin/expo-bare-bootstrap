import styled from 'styled-components/native';
import { applyStyleModifiers } from 'styled-components-modifiers';

type Props = {
  modifiers?: string | string[];
};

const ImageContainer = styled.View<Props>`
  background-color: ${p => p.theme.colors.primary.main};
  height: ${p => p.theme.paddings.large};
  width: ${p => p.theme.paddings.large};
  border-radius: ${p => p.theme.paddings.small};
  justify-content: center;
  align-items: center;
  margin: ${p => p.theme.paddings.extraSmall};

  ${applyStyleModifiers({
    selected: () => `
      background-color: white;
    `
  })};
`;

export default ImageContainer;
