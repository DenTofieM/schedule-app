/**
 * App design tokens used across the school routine builder experience.
 * Keep colors centralized so the app maintains a consistent executive slate + indigo theme.
 */

import '@/global.css';

import { Platform } from 'react-native';

export const AppPalette = {
  brand: {
    50: '#EEF2FF',
    100: '#E0E7FF',
    500: '#6366F1',
    600: '#4F46E5',
    700: '#4338CA',
    900: '#312E81',
  },
  surface: {
    bg: '#F8FAFC',
    card: '#FFFFFF',
    cardMuted: '#F1F5F9',
    border: '#E2E8F0',
    borderFocus: '#94A3B8',
  },
  content: {
    primary: '#0F172A',
    secondary: '#475569',
    tertiary: '#94A3B8',
  },
  status: {
    conflictBg: '#FEF2F2',
    conflictBorder: '#EF4444',
    conflictText: '#991B1B',
    conflictBadge: '#DC2626',
    successBg: '#ECFDF5',
    successBorder: '#10B981',
    successText: '#065F46',
    successBadge: '#059669',
    emptySlotBg: '#F8FAFC',
    emptySlotBorder: '#CBD5E1',
  },
} as const;

export const Colors = {
  light: {
    text: AppPalette.content.primary,
    background: AppPalette.surface.bg,
    backgroundElement: AppPalette.surface.cardMuted,
    backgroundSelected: AppPalette.surface.border,
    textSecondary: AppPalette.content.secondary,
    card: AppPalette.surface.card,
    border: AppPalette.surface.border,
    primary: AppPalette.brand[500],
    primaryPressed: AppPalette.brand[600],
    success: AppPalette.status.successBadge,
    danger: AppPalette.status.conflictBadge,
  },
  dark: {
    text: '#E2E8F0',
    background: '#0F172A',
    backgroundElement: '#111827',
    backgroundSelected: '#1E293B',
    textSecondary: '#CBD5E1',
    card: '#111827',
    border: '#334155',
    primary: '#818CF8',
    primaryPressed: '#6366F1',
    success: '#34D399',
    danger: '#F87171',
  },
} as const;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: 'var(--font-display)',
    serif: 'var(--font-serif)',
    rounded: 'var(--font-rounded)',
    mono: 'var(--font-mono)',
  },
});

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = 800;
