import styled from 'styled-components/native';

const Container = styled.TouchableOpacity`
  height: ${p => p.theme.buttons.height.small};
  width: ${p => p.theme.buttons.height.small};
  background-color: ${p => p.theme.colors.bgGray};
  border-radius: ${p => p.theme.buttons.height.small};
`;

export { Container };
