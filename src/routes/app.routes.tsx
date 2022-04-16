/* eslint-disable react/no-unstable-nested-components */
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Platform } from 'react-native';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Feather } from '@expo/vector-icons';

import theme from '../global/styles/theme';
import { Explore } from '../screens/authenticated/Explore';
import { Profile } from '../screens/authenticated/Profile';

import { SetsRoutes } from './sets.routes';
import { StatisticsRoutes } from './statistics.routes';

const Tab = createBottomTabNavigator();

export function App() {
  return (
    <Tab.Navigator
      screenOptions={() => ({
        headerShown: false,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.gray_medium,
        tabBarLabelPosition: 'below-icon',
        tabBarStyle: {
          height: 70,
          paddingVertical: Platform.OS === 'ios' ? 20 : 0,
          paddingBottom: 8,
          paddingTop: 16,
        },
        tabBarLabelStyle: {
          fontFamily: theme.fonts.poppins_medium,
        },
      })}
    >
      <Tab.Screen
        name="Explore"
        component={Explore}
        options={{
          title: 'Explorar',
          tabBarIcon: ({ size, color }) => (
            <Feather name="search" size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="SetsRoutes"
        component={SetsRoutes}
        options={{
          title: 'Conjuntos',
          tabBarIcon: ({ size, color }) => (
            <Feather name="copy" size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="StatisticsRoutes"
        component={StatisticsRoutes}
        options={{
          title: 'Estatísticas',
          tabBarIcon: ({ size, color }) => (
            <Feather name="bar-chart-2" size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          title: 'Perfil',
          tabBarIcon: ({ size, color }) => (
            <Feather name="user" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
