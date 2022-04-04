import {
  NavigationProp,
  createNavigationContainerRef,
  ParamListBase,
  Route,
} from '@react-navigation/native';

export interface IRouterProps {
  navigation: NavigationProp<ParamListBase>;
  route: Partial<Route<string, object | undefined>>;
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
