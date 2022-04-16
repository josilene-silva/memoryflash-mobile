import React, { useLayoutEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTheme } from 'styled-components';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { Platform } from 'react-native';

import { GeneralStatistics } from '../screens/authenticated/Statistics/screens';
import { Statistics } from '../screens/authenticated/Statistics';

import { IRouterProps } from './navigation';

const Stack = createNativeStackNavigator();

const tabHiddenRoutes = ['GeneralStatistics'];

export function StatisticsRoutes({ navigation, route }: IRouterProps) {
  const theme = useTheme();

  useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route) as string;
    if (tabHiddenRoutes.includes(routeName)) {
      navigation.setOptions({ tabBarStyle: { display: 'none' } });
    } else {
      navigation.setOptions({
        tabBarStyle: {
          display: 'flex',
          height: 70,
          paddingVertical: Platform.OS === 'ios' ? 20 : 0,
          paddingBottom: 8,
          paddingTop: 16,
        },
      });
    }
  }, [navigation, route]);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Statistics" component={Statistics} />

      <Stack.Screen
        name="GeneralStatistics"
        component={GeneralStatistics}
        options={({ route: routeLis }: IRouterProps) => ({
          headerShown: true,
          title: routeLis.params.name,
          headerTitleStyle: {
            color: theme.colors.primary,
            fontFamily: theme.fonts.montserrat_bold,
            fontSize: 22,
          },
        })}
      />
    </Stack.Navigator>
  );
}
