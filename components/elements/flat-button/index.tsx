import { Platform } from 'react-native';

import { FlatButtonAndroid } from './android';
import { FlatButtonIOS } from './ios';

const isIOS = Platform.OS === 'ios';

const FlatButton = isIOS ? FlatButtonIOS : FlatButtonAndroid;

export { FlatButton };
