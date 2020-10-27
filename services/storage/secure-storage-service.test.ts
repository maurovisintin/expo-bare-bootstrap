import storage from './secure-storage-service';

jest.mock('expo-secure-store', () => {
  const store: any = {};
  return {
    setItemAsync: jest.fn(
      (item, value) =>
        new Promise(resolve => {
          store[item] = value;
          resolve(value);
        })
    ),
    getItemAsync: jest.fn(
      item =>
        new Promise(resolve => {
          if (store[item]) resolve(store[item]);
          resolve(undefined);
        })
    ),
    deleteItemAsync: jest.fn(
      item =>
        new Promise(resolve => {
          resolve(delete store[item]);
        })
    )
  };
});

describe('AsyncStorage works as intended', () => {
  describe('setToStorage & getFromStorage', () => {
    it('saves as key: String value: String pair and returns', async () => {
      await storage.setToStorage('myKey', 'myValue');
      const value = await storage.getFromStorage('myKey');
      expect(value).toBe('myValue');
    });

    it('saves a key: String value: Object pair and returns', async () => {
      const obj = { myValue: 'string' };
      await storage.setToStorage('myKey', { myValue: 'string' });
      const value = await storage.getFromStorage('myKey');
      expect(value).toBe(JSON.stringify(obj));
    });

    it('saves a key: Number value: String pair and returns', async () => {
      const number = 100;
      const item = 'myValue';
      await storage.setToStorage(number, item);
      const value = await storage.getFromStorage(number);
      expect(value).toBe(item);
    });
  });

  describe('clearStorage', () => {
    it('clears a key: Array value pair from encrypted storage', async () => {
      const obj = { myValue: 'string' };
      const key = 'myKey';
      await storage.setToStorage(key, obj);
      await storage.removeFromStorage([key]);
      const removedValue = await storage.getFromStorage(key);
      expect(removedValue).toBeUndefined();
    });

    it('clears a key: String value pair from encrypted storage', async () => {
      const obj = { myValue: 'string' };
      const key = 'myKey';
      await storage.setToStorage(key, obj);
      await storage.removeFromStorage(key);
      const removedValue = await storage.getFromStorage(key);
      expect(removedValue).toBeUndefined();
    });
  });

  describe('Sets multiple items to storage', () => {
    it('It sets an array of multiple items', async () => {
      const values = [
        ['myKey1', 'myValue1'],
        ['myKey2', 'myValue2']
      ];
      await storage.setMultiItemsToStorage(values);
      const resultOne = await storage.getFromStorage('myKey1');
      const resultTwo = await storage.getFromStorage('myKey2');
      expect(resultOne).toBe('myValue1');
      expect(resultTwo).toBe('myValue2');
    });
  });
});
