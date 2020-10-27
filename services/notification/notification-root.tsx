import React, { useRef } from 'react';
import { NotifierRoot } from 'react-native-notifier';

const NotificationRoot = () => {
  const notifierRef = useRef();

  return <NotifierRoot ref={notifierRef} />;
};

export { NotificationRoot };
