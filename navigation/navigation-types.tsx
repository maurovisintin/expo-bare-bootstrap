import { routeConstants } from './route-constants';

export type RootStackParamList = {
  [routeConstants.ROOT]: undefined;
  [routeConstants.NOT_FOUND]: undefined;
  [routeConstants.MODALS]: undefined;
};

export type BottomTabParamList = {
  [routeConstants.TAB_FEED]: undefined;
  [routeConstants.TAB_CART]: undefined;
  [routeConstants.TAB_PROFILE]: undefined;
};

export type TabFeedParamList = {
  [routeConstants.FEED]: undefined;
};

export type TabCartParamList = {
  [routeConstants.CART]: undefined;
};

export type TabProfileParamList = {
  [routeConstants.PROFILE]: undefined;
};

export type ModalsParamList = {
  [routeConstants.AUTH_SCREEN]: undefined;
};
