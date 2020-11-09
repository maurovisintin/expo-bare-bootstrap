import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import { HeaderAction } from '../components';
import AuthScreen from '../screens/AuthScreen';
import { ModalsParamList } from './navigation-types';
import theme from '../theme';
import { routeConstants } from './route-constants';
import { goBack } from './navigation-service';

const CloseButtonComponent = () => (
  <HeaderAction title="Close" onPress={goBack} />
);

const headerOptions = {
  title: '',
  headerStyle: {
    shadowOpacity: 0,
    elevation: 0
  }
};

const NavScreenOptions = {
  headerBackTitle: '',
  headerTruncatedBackTitle: '',
  headerTintColor: theme.colors.grayDarker.main
};

const ModalStack = createStackNavigator<ModalsParamList>();

export default function ModalsNavigator() {
  return (
    <ModalStack.Navigator
      screenOptions={() => ({
        headerBackTitle: '',
        headerTruncatedBackTitle: '',
        headerTintColor: theme.colors.grayDarker.main,
        headerRight: () => <CloseButtonComponent />
      })}
    >
      <ModalStack.Screen
        name={routeConstants.AUTH_SCREEN}
        options={() => ({
          ...headerOptions,
          headerLeft: null
        })}
        component={AuthScreen}
      />
    </ModalStack.Navigator>
  );
}
