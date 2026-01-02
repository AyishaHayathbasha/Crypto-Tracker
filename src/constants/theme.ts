import { Platform } from 'react-native';

/**
 * App color palette for light and dark themes
 */
export const Colors = {
  light: {
    bg: '#ffffff',
    card: '#f8fafc',
    cardHover: '#f1f5f9',
    text: '#0f172a',
    textSecondary: '#64748b',
    accent: '#3b82f6',
    success: '#10b981',
    danger: '#ef4444',
    warning: '#f59e0b',
    border: '#e2e8f0',
    tint: '#3b82f6',
    icon: '#334155',
    tabIconDefault: '#94a3b8',
    tabIconSelected: '#3b82f6',
  },
  dark: {
    bg: '#0f172a',
    card: '#1e293b',
    cardHover: '#334155',
    text: '#f1f5f9',
    textSecondary: '#94a3b8',
    accent: '#3b82f6',
    success: '#10b981',
    danger: '#ef4444',
    warning: '#f59e0b',
    border: '#334155',
    tint: '#0a7ea4',
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: '#fff',
  },
};

/**
 * Font families per platform
 */
export const Fonts = Platform.select({
  ios: {
    sans: 'system-ui',
    serif: 'ui-serif',
    rounded: 'ui-rounded',
    mono: 'ui-monospace',
  },
  android: {
    sans: 'sans-serif',
    serif: 'serif',
    rounded: 'sans-serif-medium',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
});

/**
 * Common layout constants
 */
export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

export const borderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
};
