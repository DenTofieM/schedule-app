import { Platform, Text, type TextProps } from 'react-native';

import { Fonts, ThemeColor } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type ThemedTextProps = TextProps & {
  type?: 'default' | 'title' | 'small' | 'smallBold' | 'subtitle' | 'link' | 'linkPrimary' | 'code';
  themeColor?: ThemeColor;
};

export function ThemedText({ style, type = 'default', themeColor, ...rest }: ThemedTextProps) {
  const theme = useTheme();

  return (
    <Text
      style={[
        { color: theme[themeColor ?? 'text'] },
        type === 'default' && typography.default,
        type === 'title' && typography.title,
        type === 'small' && typography.small,
        type === 'smallBold' && typography.smallBold,
        type === 'subtitle' && typography.subtitle,
        type === 'link' && typography.link,
        type === 'linkPrimary' && typography.linkPrimary,
        type === 'code' && typography.code,
        style,
      ]}
      {...rest}
    />
  );
}
const typography = {
  small: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '500' as const,
  },
  smallBold: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '700' as const,
  },
  default: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '500' as const,
  },
  title: {
    fontSize: 48,
    fontWeight: '600' as const,
    lineHeight: 52,
  },
  subtitle: {
    fontSize: 32,
    lineHeight: 44,
    fontWeight: '600' as const,
  },
  link: {
    lineHeight: 30,
    fontSize: 14,
  },
  linkPrimary: {
    lineHeight: 30,
    fontSize: 14,
    color: '#6366F1',
  },
  code: {
    fontFamily: Fonts.mono,
    fontWeight: Platform.select({ android: '700' as const }) ?? ('500' as const),
    fontSize: 12,
  },
};
