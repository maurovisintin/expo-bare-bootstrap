import * as React from 'react';

import { Container, FlatButton, HeroOne } from '../components';
import { navigate } from '../navigation/navigation-service';
import { routeConstants } from '../navigation/route-constants';

export default function CartScreen() {
  return (
    <Container modifiers="padded">
      <HeroOne size="small" heading="Carrello" info="Fai cose!" />
      <FlatButton
        title="sign up"
        onPress={() =>
          navigate(routeConstants.MODALS, {
            screen: routeConstants.AUTH_SCREEN
          })
        }
      />
    </Container>
  );
}
