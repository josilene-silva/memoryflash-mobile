import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Register } from '../screens/Register';
import { Login } from '../screens/Login';

const Stack = createNativeStackNavigator();

export function Auth() {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Register"
        component={Register}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
