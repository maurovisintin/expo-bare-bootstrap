/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable global-require */
import { ImageSourcePropType } from 'react-native';

const images = {
  splash: require('./splash.png') as ImageSourcePropType,
  kitten: require('./kitten.jpg') as ImageSourcePropType
};

export { images };
