import styled from 'styled-components/native';
import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const Wrapper = styled.View`
  overflow: hidden;
  height: ${p => width - 2 * parseFloat(p.theme.paddings.small) - 20}px;
  margin-bottom: ${p => parseFloat(p.theme.paddings.regular)}px;
`;

export default Wrapper;
