/* eslint-disable no-console */
import * as SecureStore from 'expo-secure-store';

import { stringify } from './async-storage-service';

const setMultiItemsToStorage = (itemsToSave: string[][]) => {
  itemsToSave.forEach(async item => {
    try {
      await SecureStore.setItemAsync(item[0], item[1], {
        keychainAccessible: SecureStore.WHEN_UNLOCKED_THIS_DEVICE_ONLY
      });
    } catch (e) {
      console.info(item);
      console.info('error in setting one or more items in keychain');
      console.info(e);
    }
  });
};

const setToStorage = async (key: string | number, value: any) => {
  try {
    await SecureStore.setItemAsync(stringify(key), stringify(value), {
      keychainAccessible: SecureStore.WHEN_UNLOCKED_THIS_DEVICE_ONLY
    });
  } catch (e) {
    console.info('error in setting one item in keychain');
    console.info(e);
  }
};

const getFromStorage = async (key: string | number) => {
  try {
    return await SecureStore.getItemAsync(key.toString());
  } catch (e) {
    console.info(key);
    console.info('error in getting one item in keychain');
    console.info(e);
    return undefined;
  }
};

const removeFromStorage = async (keysToRemove: string[] | string) => {
  const keysArray =
    typeof keysToRemove === 'string' ? [keysToRemove] : keysToRemove;
  keysArray.forEach(async key => {
    try {
      await SecureStore.deleteItemAsync(key);
    } catch (e) {
      console.info('error clearing all values from keychain');
      console.info(e);
    }
  });
};

export default {
  setMultiItemsToStorage,
  setToStorage,
  getFromStorage,
  removeFromStorage
};
