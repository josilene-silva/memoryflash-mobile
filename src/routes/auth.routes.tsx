import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Register } from '../screens/public/Register';
import { Login } from '../screens/public/Login';

const Stack = createNativeStackNavigator();

export function Auth() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
    </Stack.Navigator>
  );
}
