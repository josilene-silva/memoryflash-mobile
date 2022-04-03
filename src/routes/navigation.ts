import {
  NavigationProp,
  createNavigationContainerRef,
  ParamListBase,
} from '@react-navigation/native';

export interface IRouterProps {
  navigation: NavigationProp<ParamListBase>;
}

export const navigationRef = createNavigationContainerRef();

export function navigate(name: string, params?: Record<string, unknown>): void {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name as never, params as never);
  }
}

export function goBack(): void {
  if (navigationRef.isReady()) {
    navigationRef.goBack();
  }
}
