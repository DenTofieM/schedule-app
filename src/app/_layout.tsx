import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { PaperProvider } from 'react-native-paper';

import { authService } from '@/api/auth';
import { storageService } from '@/services/storage';
import { useAppStore } from '@/store';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const currentUser = useAppStore((state) => state.currentUser);
  const loadInitialData = useAppStore((state) => state.loadInitialData);

  useEffect(() => {
    initializeApp();
  }, []);

  const initializeApp = async () => {
    try {
      // Load local data
      const localData = await storageService.getAllData();
      loadInitialData(localData);

      // Try to restore auth session
      const token = await authService.getStoredToken();
      if (token) {
        try {
          const profile = await authService.getProfile();
          useAppStore.setState({ currentUser: profile });
        } catch (error) {
          console.error('Failed to restore auth session:', error);
          await authService.clearStoredToken();
        }
      }
    } catch (error) {
      console.error('Failed to initialize app:', error);
    } finally {
      await SplashScreen.hideAsync();
    }
  };

  return (
    <PaperProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        >
          {currentUser ? (
            <Stack.Screen name="(app)" options={{ headerShown: false }} />
          ) : (
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          )}
        </Stack>
      </ThemeProvider>
    </PaperProvider>
  );
}
