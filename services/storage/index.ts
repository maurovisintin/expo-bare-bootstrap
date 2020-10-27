import secureStorageService from './secure-storage-service';
import asyncStorageService from './async-storage-service';
/**
 *  @desc Module responsible for saving data into device local storage.
 *  The module uses AsyncStorage and SecureStorage to save key/value pairs in Android keystore and IOS native keychain
 */

export default {
  encrypted: {
    ...secureStorageService
  },
  ...asyncStorageService
};
