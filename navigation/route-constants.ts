export const routeConstants = {
  MAIN: 'MAIN'
} as const;

export type RouteConstantsKeys = keyof typeof routeConstants;
export type RouteConstantValues = typeof routeConstants[RouteConstantsKeys];
