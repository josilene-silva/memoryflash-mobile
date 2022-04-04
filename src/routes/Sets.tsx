import React, { useLayoutEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTheme } from 'styled-components';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { Platform } from 'react-native';

import { Sets } from '../screens/authenticated/Sets';
import { CreateSet } from '../screens/authenticated/Sets/screens';

import { IRouterProps } from './navigation';

const Stack = createNativeStackNavigator();

const tabHiddenRoutes = ['CreateSets'];

export function SetsRoutes({ navigation, route }: IRouterProps) {
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
      <Stack.Screen name="Sets" component={Sets} />
      <Stack.Screen
        name="CreateSets"
        component={CreateSet}
        options={{
          headerShown: true,
          title: 'Criar conjunto',
          headerTitleStyle: {
            color: theme.colors.primary,
            fontFamily: theme.fonts.montserrat_bold,
            fontSize: 22,
          },
        }}
      />
    </Stack.Navigator>
  );
}
