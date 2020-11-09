import styled from 'styled-components/native';

const HorizontalContainer = styled.View`
  flex-direction: row;
  align-items: center;
  padding-horizontal: ${p => p.theme.paddings.tiny};
`;

export default HorizontalContainer;
