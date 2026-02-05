import { Platform } from 'react-native';

export const VolvoColors = {
  primaryBlue: '#003057',
  accentBlue: '#1c6bba',
  white: '#FFFFFF',
  offWhite: '#FAFAFA',
  lightGray: '#E8E8E8',
  mediumGray: '#707070',
  darkGray: '#333333',
  textPrimary: '#1A1A1A',
  textSecondary: '#707070',
};

export const Colors = {
  light: {
    text: VolvoColors.textPrimary,
    background: VolvoColors.white,
    tint: VolvoColors.accentBlue,
    icon: VolvoColors.mediumGray,
    tabIconDefault: VolvoColors.mediumGray,
    tabIconSelected: VolvoColors.accentBlue,
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: '#fff',
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: '#fff',
  },
};

export const Fonts = Platform.select({
  ios: {
    sans: 'system-ui',
    serif: 'ui-serif',
    rounded: 'ui-rounded',
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
