import { Notifier, Easing } from 'react-native-notifier';
import {
  NotificationComponent,
  NotificationType
} from '../../components/notifications';
/*
  This service allows a user to send a local notification using the expo
  Notifications package. Once dispatched this notification will be picked up by
  the notification-root as displayed in the app.

  To send a notification:
    sendLocalNotification({
      title: 'The title', // Optional, only use for custom notifications.
      body: 'The message of the notification',
      type: 'error',
      duration: 3000,
      onPress: () => {}
    })
*/

type PresentLocalNotification = {
  title?: string;
  body: string;
  type: NotificationType;
  onPress?: () => void;
  duration?: number;
};

const mapTitle = (type: NotificationType) => {
  switch (type) {
    case 'error':
      return 'Errore';
    case 'warn':
      return 'Attenzione';
    case 'success':
      return 'Successo';
    default:
      return 'Info';
  }
};

const sendLocalNotification = async ({
  title,
  body,
  type = 'info',
  onPress = () => {},
  duration = 3000
}: PresentLocalNotification) => {
  try {
    const calcTitle = title || mapTitle(type);

    Notifier.showNotification({
      title: calcTitle,
      description: body,
      duration,
      showAnimationDuration: 500,
      showEasing: Easing.ease,
      onPress,
      hideOnPress: true,
      Component: NotificationComponent,
      componentProps: {
        type
      }
    });
  } catch (e) {
    // TODO error showing notification
  }
};

export { sendLocalNotification };
