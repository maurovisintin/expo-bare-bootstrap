export const flatten = (target: {}) => {
  const output = {};

  const step = (object: {}, prev?: {}, currentDepth?: number) => {
    // eslint-disable-next-line no-param-reassign
    currentDepth = currentDepth || 1;

    // eslint-disable-next-line consistent-return
    Object.keys(object).forEach(key => {
      const value = (object as any)[key];
      const isArray = Array.isArray(value);
      const type = Object.prototype.toString.call(value);
      const isObject = type === '[object Object]' || type === '[object Array]';
      const newKey = prev ? `${prev}.${key}` : key;

      if (!isArray && isObject && Object.keys(value).length) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        return step(value, newKey, currentDepth! + 1);
      }

      (output as any)[newKey] = value;
    });
  };

  step(target);

  return output;
};
