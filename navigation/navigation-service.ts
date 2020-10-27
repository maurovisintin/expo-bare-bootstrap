import * as React from 'react';
import {
  StackActions,
  NavigationContainerRef,
  CommonActions
} from '@react-navigation/native';
import { RouteConstantValues } from './route-constants';

const isMountedRef = React.createRef<boolean>();
const navigationRef = React.createRef<NavigationContainerRef>();

function navigate<T extends { [key: string]: any }>(
  name: RouteConstantValues,
  params?: T
) {
  if (isMountedRef.current && navigationRef.current) {
    // Perform navigation if the app has mounted
    navigationRef.current.navigate(name, params);
  }
  // Need to decide what to do if the app hasn't mounded.
  // You can ignore this, or add these actions to a queue you can call later
}

function replace<T extends { [key: string]: any }>(
  name: RouteConstantValues,
  params?: T
) {
  if (isMountedRef.current && navigationRef.current) {
    const { routes } = navigationRef.current.getRootState();
    routes[0].name !== name &&
      navigationRef.current.dispatch(StackActions.replace(name, params));
  }
}

function goBack() {
  if (isMountedRef.current && navigationRef.current) {
    navigationRef.current.goBack();
  }
}

function canGoBack() {
  if (isMountedRef.current && navigationRef.current) {
    return navigationRef.current.canGoBack();
  }
  return false;
}

function reset({
  index,
  routes
}: {
  index: number;
  routes: { name: string }[];
}) {
  if (isMountedRef.current && navigationRef.current) {
    const rootState = navigationRef.current.getRootState();
    routes[0].name !== rootState.routes[0].name &&
      // Perform navigation if the app has mounted and we're not already on the requested screen
      navigationRef.current.dispatch(
        CommonActions.reset({
          index,
          routes
        })
      );
  } else {
    // You can decide what to do if the app hasn't mounted
    // You can ignore this, or add these actions to a queue you can call later
  }
}

function resetRoot({
  index,
  routes
}: {
  index: number;
  routes: { name: string; params?: { [key: string]: any } }[];
}) {
  if (isMountedRef.current && navigationRef.current) {
    // TODO Needs to check nested routeNames
    // const rootState = navigationRef.current.getRootState();
    // routes[0].name !== rootState.routes[0].name &&
    navigationRef.current.resetRoot({
      index,
      routes
    });
  }
}

export {
  navigate,
  goBack,
  reset,
  replace,
  resetRoot,
  canGoBack,
  isMountedRef,
  navigationRef
};
