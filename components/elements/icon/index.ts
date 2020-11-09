import * as React from 'react';
import { createIconSetFromIcoMoon } from '@expo/vector-icons';
import icoMoonConfig from '../../../assets/fonts/Icons/selection.json';

export default createIconSetFromIcoMoon(
  icoMoonConfig,
  'custom-icons',
  'icomoon.ttf'
);
