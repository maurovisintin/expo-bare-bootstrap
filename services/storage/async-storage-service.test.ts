import storage, { stringify } from './async-storage-service';

jest.mock('react-native', () => {
  const store: any = {};
  return {
    AsyncStorage: {
      setItem: jest.fn(
        (item, value) =>
          new Promise(resolve => {
            store[item] = value;
            resolve(value);
          })
      ),
      multiSet: jest.fn(
        items =>
          new Promise(resolve => {
            // eslint-disable-next-line
            items.forEach((item: Array<string>) => (store[item[0]] = item[1]));
            resolve();
          })
      ),
      getItem: jest.fn(
        item =>
          new Promise(resolve => {
            if (store[item]) resolve(store[item]);
            resolve(undefined);
          })
      ),
      removeItem: jest.fn(
        item =>
          new Promise(resolve => {
            resolve(delete store[item]);
          })
      )
    }
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

  describe('Stringify', () => {
    it('returns a string when given a string', async () => {
      const item = 'myValue';
      const value = stringify(item);
      expect(value).toBe(item);
    });

    it('returns a string when given an object', async () => {
      const item = { myValue: 'String' };
      const value = stringify(item);
      expect(value).toBe('{"myValue":"String"}');
    });

    it('returns a string when given a number', async () => {
      const item = 10;
      const value = stringify(item);
      expect(value).toBe('10');
    });
  });

  describe('removeFromStorage', () => {
    it('removes a previously set item', async () => {
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
