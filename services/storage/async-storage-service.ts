/* eslint-disable no-console */
import AsyncStorage from '@react-native-community/async-storage';

export const stringify = (item: any) =>
  typeof item === 'string' ? item : JSON.stringify(item);

const setMultiItemsToStorage = async (itemsToSave: string[][]) => {
  try {
    await AsyncStorage.multiSet(itemsToSave);
  } catch (e) {
    console.info('error in setting one or more items to AsyncStorage');
    console.info(e);
  }
};

const setToStorage = async (key: string | number, value: any) => {
  try {
    await AsyncStorage.setItem(stringify(key), stringify(value));
  } catch (e) {
    console.info('error in setting one item to AsyncStorage');
    console.info(e);
  }
};

const getFromStorage = async (key: string | number) => {
  try {
    return await AsyncStorage.getItem(stringify(key));
  } catch (e) {
    console.info(key);
    console.info('error in getting one item from AsyncStorage');
    console.info(e);
    return undefined;
  }
};

const removeFromStorage = async (key: string) => {
  try {
    await AsyncStorage.removeItem(stringify(key));
  } catch (e) {
    console.info('error clearing value from AsyncStorage');
    console.info(e);
  }
};

export default {
  setMultiItemsToStorage,
  setToStorage,
  getFromStorage,
  removeFromStorage
};
