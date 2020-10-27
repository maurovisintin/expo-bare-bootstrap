import NetInfo from '@react-native-community/netinfo';
import { sendLocalNotification } from '../notification';

export const addNetworkListener = () =>
  NetInfo.addEventListener(state => {
    if (!state.isConnected) {
      sendLocalNotification({
        type: 'warn',
        body: 'Network connection error'
      });
    }
  });
