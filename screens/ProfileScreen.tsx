import * as React from 'react';

import { HeroOne, Container } from '../components';

export default function AuthScreen() {
  return (
    <Container modifiers="padded">
      <HeroOne size="small" heading="Profile" info="profile down here!" />
    </Container>
  );
}
