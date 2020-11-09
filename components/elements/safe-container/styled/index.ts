import styled from 'styled-components/native';

type Props = {
  background?: string;
};

const StyledContainer = styled.SafeAreaView<Props>`
  flex: 1;
  background-color: ${p => p.background};
`;

export default StyledContainer;
