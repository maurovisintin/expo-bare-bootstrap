import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';

import theme from './theme';
import useCachedResources from './hooks/useCachedResources';
import Navigation from './navigation';
import { NotificationRoot } from './services/notification';

import { store } from './redux';

const App = () => {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  }
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <SafeAreaProvider>
          <Navigation />
          <NotificationRoot />
          <StatusBar />
        </SafeAreaProvider>
      </Provider>
    </ThemeProvider>
  );
};

export default App;
