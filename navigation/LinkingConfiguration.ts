import * as Linking from 'expo-linking';

export default {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Root: {
        screens: {
          Feed: {
            screens: {
              FeedScreen: 'one'
            }
          },
          Carrello: {
            screens: {
              CartScreen: 'two'
            }
          },
          Profilo: {
            screens: {
              ProfileScreen: 'two'
            }
          }
        }
      },
      NotFound: '*'
    }
  }
};
