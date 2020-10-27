import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import theme from '../theme';

import SafeContainer from './safe-container';

const s = StyleSheet.create({
  container: {
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 10,
    backgroundColor: '#ffffff',
    borderRadius: 5,
    marginTop: 10,
    marginHorizontal: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center'
  },
  content: {
    flex: 1,
    marginHorizontal: 5
  }
});

export type NotificationType = 'error' | 'warn' | 'success' | 'info';

type NotificationComponentAllProps = {
  title?: string;
  description?: string;
  type: NotificationType;
};

const bgColors = {
  error: theme.colors.overlayRed,
  warn: '#FFAC00',
  info: '#007BFF',
  success: theme.colors.overlayGreen
};

export const NotificationComponent = ({
  title,
  description,
  type
}: NotificationComponentAllProps) => {
  return (
    <SafeContainer>
      <View style={[s.container, { backgroundColor: bgColors[type] }]}>
        <View style={s.content}>
          {!!title && (
            <Text
              fontSize={theme.fontSize.paragraph}
              fontFamily="sansSerif"
              modifiers={['bold']}
            >
              {title}
            </Text>
          )}
          {!!description && (
            <Text fontSize={theme.fontSize.paragraph}>{description}</Text>
          )}
        </View>
      </View>
    </SafeContainer>
  );
};
