import styled from 'styled-components/native';

type Props = {
  modifiers?: any;
};

export const Container = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 60px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-horizontal: 20px;
  padding-top: 10px;
`;
