import { useColorScheme as _useColorScheme } from 'react-native';

/**
 * Custom hook that wraps React Native’s useColorScheme.
 * Returns "light" or "dark".
 */
export function useColorScheme() {
  return _useColorScheme() ?? 'light';
}
