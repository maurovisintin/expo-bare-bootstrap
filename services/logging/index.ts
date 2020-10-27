//import * as Sentry from '@sentry/react-native';
import Constants from 'expo-constants';
import { AuthError } from '../auth-error';

/*
  sentry-expo only captures JS exceptions, to log native exceptions we've moved to
  @sentry/react-native some aspects of sentry-expo are still relevant and can be found here:
  https://github.com/expo/sentry-expo/blob/master/src/index.ts

  If we notice that events are not showing up in Sentry we should investigate the flush/close methods.
  This is hard to debug as the Sentry UI lags before showing errors.
*/

const DSN =
  '';

// eslint-disable-next-line no-undef
const DISABLED =
  // eslint-disable-next-line no-undef
  __DEV__ || Constants.appOwnership === 'expo' || !Constants.isDevice;

const init = () => {
  if (DISABLED) {
    console.log('[@sentry/react-native] Disabled Sentry in development');
    return;
  }

  // Sentry.init({
  //   dsn: DSN,
  //   environment: Constants.manifest.slug // not tenant specific
  //   // enableInExpoDevelopment: true
  // });
  // // if (Constants.manifest.version) {
  // //   Sentry.setRelease(Constants.manifest.version);
  // // }

  // // Set Expo related items (as seen in sentry-expo)
  // Sentry.setExtras({
  //   manifest: Constants.manifest,
  //   deviceYearClass: Constants.deviceYearClass,
  //   linkingUri: Constants.linkingUri
  // });

  // Sentry.setTags({
  //   deviceId: Constants.installationId,
  //   appOwnership: Constants.appOwnership
  // });

  // if (Constants.appOwnership === 'expo' && Constants.expoVersion) {
  //   Sentry.setTag('expoAppVersion', Constants.expoVersion);
  // }

  // if (Constants.manifest) {
  //   Sentry.setTag('expoReleaseChannel', Constants.manifest.releaseChannel);
  //   Sentry.setTag('appVersion', Constants.manifest.version ?? '');
  //   Sentry.setTag('appPublishedTime', Constants.manifest.publishedTime);
  // }
};

const clearScope = () => {}
  // !DISABLED && Sentry.configureScope(scope => scope.clear());

const setUser = (id: string) => {
  if (!DISABLED) {
    // Sentry.setUser({
    //   id
    // });
  }
};

const setTag = (key: string, value: string) => {
  if (!DISABLED) {
   // Sentry.setTag(key, value);
  }
};

const setError = (err: Error | AuthError) => {}
  //!DISABLED && Sentry.captureException(err);

const setMessage = (msg: string) => {}
//!DISABLED && Sentry.captureMessage(msg);

const setBreadcrumb = (category: string, message: string) => {
  if (!DISABLED) {
    // Sentry.addBreadcrumb({
    //   category,
    //   message,
    //   level: Sentry.Severity.Info
    // });
  }
};

const getLastEventId = () => {}
//!DISABLED && Sentry.getCurrentHub().lastEventId();

export default {
  init,
  setUser,
  setTag,
  setError,
  setMessage,
  setBreadcrumb,
  getLastEventId,
  clearScope
};
