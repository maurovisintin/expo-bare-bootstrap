import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect } from 'react';

import { useDispatch } from 'react-redux';
import { actions } from '../redux';

import NotFoundScreen from '../screens/NotFoundScreen';
import { RootStackParamList } from './navigation-types';
import BottomTabNavigator from './BottomTabNavigator';
import ModalsNavigator from './ModalsNavigator';
import LinkingConfiguration from './LinkingConfiguration';
import { navigationRef, isMountedRef } from './navigation-service';
import { routeConstants } from './route-constants';
import theme from '../theme';

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Stack = createStackNavigator<RootStackParamList>();

const NavScreenOptions = {
  headerBackTitle: '',
  headerTruncatedBackTitle: '',
  headerTintColor: theme.colors.grayDarker.main
};

function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} mode="modal">
      <Stack.Screen name={routeConstants.ROOT} component={BottomTabNavigator} />
      <Stack.Screen
        name={routeConstants.MODALS}
        component={ModalsNavigator}
        options={() => ({
          ...NavScreenOptions,
          headerShown: false
        })}
      />
      <Stack.Screen
        name={routeConstants.NOT_FOUND}
        component={NotFoundScreen}
        options={{ title: 'Oops!' }}
      />
    </Stack.Navigator>
  );
}

// If you are not familiar with React Navigation, we recommend going through the
// "Fundamentals" guide: https://reactnavigation.org/docs/getting-started
export default function Navigation() {
  const dispatch = useDispatch();

  useEffect(() => {
    isMountedRef.current = true;
    // eslint-disable-next-line no-return-assign
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const globalSetup = (options: any) =>
    dispatch(
      actions.setUp.request({
        options
      })
    );

  useEffect(() => {
    globalSetup({});

    //  dispatch(
    // actions.profile.request({}));
  }, []);

  return (
    <NavigationContainer linking={LinkingConfiguration} ref={navigationRef}>
      <RootNavigator />
    </NavigationContainer>
  );
}
