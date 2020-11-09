export const routeConstants = {
  ROOT: 'ROOT',
  NOT_FOUND: 'NOT_FOUND',
  MODALS: 'MODALS',

  TAB_FEED: 'Feed',
  TAB_CART: 'Cart',
  TAB_PROFILE: 'Profile',

  FEED: 'FEED',
  CART: 'CART',
  PROFILE: 'PROFILE',
  AUTH_SCREEN: 'AUTH_SCREEN'
} as const;

export type RouteConstantsKeys = keyof typeof routeConstants;
export type RouteConstantValues = typeof routeConstants[RouteConstantsKeys];
