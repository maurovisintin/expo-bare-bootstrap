import * as React from 'react';
import styled from 'styled-components/native';
import { useSelector } from 'react-redux';

import { selectors, global } from '../redux';
import { images } from '../assets/images';
import { Text, Container, FlatButton, HeroOne } from '../components';
import { AppState } from '../AppState';

const StyledImage = styled.Image`
  height: 300px;
  width: 300px;
  resize-mode: contain;
  margin: ${p => p.theme.paddings.regular};
`;

export default function FeedScreen() {
  const profileData = useSelector<AppState, global.profile.Selectors>(
    ({ profile }) => selectors.profile(profile, {})
  );

  return (
    <Container modifiers="padded">
      <HeroOne size="small" heading="Feed" info="Gattino" />
      <StyledImage source={images.kitten} />
      <Text>{profileData.data.getText}</Text>
      <FlatButton title="test" onPress={() => {}} />
    </Container>
  );
}
