import React from 'react';
import { ThemeProvider } from 'styled-components';

import theme from '../../theme';

// eslint-disable-next-line react/display-name
const withTheme = (Component: any) => (props: any) => (
  <ThemeProvider theme={theme}>
    <Component {...props} />
  </ThemeProvider>
);

export default withTheme;
