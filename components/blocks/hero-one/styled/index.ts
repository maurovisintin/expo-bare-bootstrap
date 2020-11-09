import styled from 'styled-components/native';
import { applyStyleModifiers } from 'styled-components-modifiers';

type Props = {
  modifiers?: string[];
};

const StyledContainer = styled.View<Props>`
  ${applyStyleModifiers({
    centered: () => `
      justify-content: center
      align-items: center
    `
  })};
`;

const InfoContainer = styled.View`
  margin-vertical: 16px;
`;

export { StyledContainer, InfoContainer };
