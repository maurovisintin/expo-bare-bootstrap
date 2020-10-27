import React from 'react';
import { StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

import { selectors, global } from '../redux';
import { Text, View } from '../components/Themed';
import { AppState } from '../AppState';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%'
  },
  factTitle: {
    marginVertical: 30,
    fontSize: 24,
    textAlign: 'center',
    fontWeight: '800'
  },
  factText: {
    margin: 30,
    fontSize: 18,
    textAlign: 'center'
  }
});

export default function ProfileScreen() {
  const profileData = useSelector<AppState, global.profile.Selectors>(
    ({ profile }) => selectors.profile(profile, {})
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profilo</Text>
      <Text style={styles.factTitle}>Cat fact</Text>
      <Text style={styles.factText}>{profileData.data.getText}</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
    </View>
  );
}
