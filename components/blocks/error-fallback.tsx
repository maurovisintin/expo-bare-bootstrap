import React from 'react';

import Container from '../elements/container';
import Text from '../elements/text';
import { FlatButton } from '../elements/flat-button';

type Props = {
  error: Error;
  resetError: () => void;
};

const FallbackComponent = ({ resetError, error }: Props) => (
  <Container>
    <Text>There is an error</Text>
    <Text>{error.toString()}</Text>
    <FlatButton
      type="secondary"
      size="regular"
      title="Try again"
      onPress={resetError}
    />
  </Container>
);

export default FallbackComponent;
