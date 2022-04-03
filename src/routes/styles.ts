import styled from 'styled-components/native';
import { Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

export const Container = styled(NavigationContainer)`
  padding-top: ${Platform.OS === 'android' ? 150 : 30}px;
`;
