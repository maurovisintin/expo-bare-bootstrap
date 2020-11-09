/* eslint-disable global-require */
import { Ionicons } from '@expo/vector-icons';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import * as React from 'react';
import { Asset } from 'expo-asset';
import { Image } from 'react-native';

import { flatten } from '../services/utils-service';
import { images } from '../assets/images';

export default function useCachedResources() {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);

  // Load any resources or data that we need prior to rendering the app
  React.useEffect(() => {
    function cacheImages(imagesToCache: any) {
      return imagesToCache.map((image: any) => {
        if (typeof image === 'string') {
          return Image.prefetch(image);
        }
        return Asset.fromModule(image).downloadAsync();
      });
    }

    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHideAsync();

        const imageAssets = cacheImages(Object.values(flatten(images)));

        await Promise.all([...imageAssets]);

        // Load fonts
        await Font.loadAsync({
          ...Ionicons.font,
          'space-mono': require('../assets/fonts/SpaceMono-Regular.ttf'),
          proximaNova: require('../assets/fonts/ProximaNova/ProximaNova-Regular.otf'),
          'proximaNova-light': require('../assets/fonts/ProximaNova/ProximaNova-Light.otf'),
          'proximaNova-semibold': require('../assets/fonts/ProximaNova/ProximaNova-Semibold.otf'),
          'proximaNova-bold': require('../assets/fonts/ProximaNova/ProximaNova-Bold.otf'),
          playfairDisplay: require('../assets/fonts/PlayfairDisplay/PlayfairDisplay-Regular.ttf'),
          'playfairDisplay-bold': require('../assets/fonts/PlayfairDisplay/PlayfairDisplay-Bold.ttf'),
          'playfairDisplay-black': require('../assets/fonts/PlayfairDisplay/PlayfairDisplay-Black.ttf'),
          'custom-icons': require('../assets/fonts/Icons/icomoon.ttf')
        });
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hideAsync();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  return isLoadingComplete;
}
