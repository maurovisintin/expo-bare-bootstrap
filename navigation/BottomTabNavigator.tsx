import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import FeedScreen from '../screens/FeedScreen';
import CartScreen from '../screens/CartScreen';
import ProfileScreen from '../screens/ProfileScreen';
import {
  BottomTabParamList,
  TabFeedParamList,
  TabCartParamList,
  TabProfileParamList
} from './navigation-types';
import theme from '../theme';
import { routeConstants } from './route-constants';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: string; color: string }) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const TabOneStack = createStackNavigator<TabFeedParamList>();

const headerOptions = {
  title: '',
  headerStyle: {
    shadowOpacity: 0,
    elevation: 0
  }
};

function TabOneNavigator() {
  return (
    <TabOneStack.Navigator>
      <TabOneStack.Screen
        name={routeConstants.FEED}
        component={FeedScreen}
        options={{ ...headerOptions }}
      />
    </TabOneStack.Navigator>
  );
}

const TabTwoStack = createStackNavigator<TabCartParamList>();

function TabTwoNavigator() {
  return (
    <TabTwoStack.Navigator>
      <TabTwoStack.Screen
        name={routeConstants.CART}
        component={CartScreen}
        options={{ ...headerOptions }}
      />
    </TabTwoStack.Navigator>
  );
}

const TabThreeStack = createStackNavigator<TabProfileParamList>();

function TabThreeNavigator() {
  return (
    <TabTwoStack.Navigator>
      <TabThreeStack.Screen
        name={routeConstants.PROFILE}
        component={ProfileScreen}
        options={{ ...headerOptions }}
      />
    </TabTwoStack.Navigator>
  );
}

export default function BottomTabNavigator() {
  return (
    <BottomTab.Navigator
      initialRouteName={routeConstants.TAB_FEED}
      tabBarOptions={{ activeTintColor: theme.colors.primary.main }}
    >
      <BottomTab.Screen
        name={routeConstants.TAB_FEED}
        component={TabOneNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="logo-rss" color={color} />
          )
        }}
      />
      <BottomTab.Screen
        name={routeConstants.TAB_CART}
        component={TabTwoNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="ios-cart" color={color} />
          )
        }}
      />
      <BottomTab.Screen
        name={routeConstants.TAB_PROFILE}
        component={TabThreeNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="ios-contact" color={color} />
          )
        }}
      />
    </BottomTab.Navigator>
  );
}
