module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
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
      },
      boxShadow: {
        glass: '0 8px 32px 0 rgba(31, 38, 135, 0.07)',
        float: '0 20px 25px -5px rgba(15, 23, 42, 0.1), 0 8px 10px -6px rgba(15, 23, 42, 0.1)',
      },
    },
  },
};
