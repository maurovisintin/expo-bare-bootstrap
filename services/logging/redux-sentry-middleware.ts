// https://github.com/vidit-sh/redux-sentry-middleware

// using any cause of action dynamic type
const getPayload = (action: any) => {
  if (action.payload) {
    if (action.type.includes('SUCCESS') || action.type.includes('FAILURE')) {
      if (action.payload.response) {
        return { payload: JSON.stringify(action.payload.response.data) };
      }
    }
    return { payload: JSON.stringify(action.payload) };
  }
  return {};
};

const getType = (action: any) => action.type; // actions containing AUTH string get filtered

const createSentryMiddleware = (Sentry: any) => {
  return () => {
    return (next: any) => (action: any) => {
      Sentry.addBreadcrumb({
        category: 'redux-action',
        message: getType(action),
        level: 'info',
        data: getPayload(action)
      });
      return next(action);
    };
  };
};

export default createSentryMiddleware;
