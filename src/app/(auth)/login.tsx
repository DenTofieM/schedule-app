import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ScrollView, View } from 'react-native';
import { ActivityIndicator, Button, Text, TextInput } from 'react-native-paper';

import { authService } from '@/api/auth';
import { AppPalette } from '@/constants/theme';
import { useAppStore } from '@/store';

export default function LoginScreen() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const setCurrentUser = useAppStore((state) => state.setCurrentUser);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: { email: string; password: string }) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await authService.login(data.email, data.password);
      setCurrentUser(response.user);
      router.replace('/(app)/home');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Login failed';
      setError(errorMessage);
      console.error('Login error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', padding: 20, backgroundColor: AppPalette.surface.bg }}>
      <View style={{ marginBottom: 40, alignItems: 'center' }}>
        <Text variant="headlineLarge" style={{ fontWeight: 'bold', marginBottom: 8 }}>
          Schedule App
        </Text>
        <Text variant="bodyMedium" style={{ color: AppPalette.content.secondary }}>
          Admin Login
        </Text>
      </View>

      <View style={{ backgroundColor: AppPalette.surface.card, padding: 20, borderRadius: 12, elevation: 2, borderWidth: 1, borderColor: AppPalette.surface.border }}>
        {error && (
          <View style={{ backgroundColor: AppPalette.status.conflictBg, padding: 12, borderRadius: 8, marginBottom: 20, borderLeftWidth: 4, borderLeftColor: AppPalette.status.conflictBorder }}>
            <Text style={{ color: AppPalette.status.conflictText }}>{error}</Text>
          </View>
        )}

        <Controller
          control={control}
          name="email"
          rules={{
            required: 'Email is required',
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: 'Invalid email format',
            },
          }}
          render={({ field: { value, onChange } }) => (
            <TextInput
              label="Email"
              value={value}
              onChangeText={onChange}
              mode="outlined"
              keyboardType="email-address"
              autoCapitalize="none"
              style={{ marginBottom: 8 }}
              error={!!errors.email}
            />
          )}
        />
        {errors.email && <Text style={{ color: AppPalette.status.conflictBadge, fontSize: 12, marginBottom: 12 }}>{errors.email.message}</Text>}

        <Controller
          control={control}
          name="password"
          rules={{
            required: 'Password is required',
            minLength: {
              value: 6,
              message: 'Password must be at least 6 characters',
            },
          }}
          render={({ field: { value, onChange } }) => (
            <TextInput
              label="Password"
              value={value}
              onChangeText={onChange}
              mode="outlined"
              secureTextEntry
              style={{ marginBottom: 8 }}
              error={!!errors.password}
            />
          )}
        />
        {errors.password && <Text style={{ color: AppPalette.status.conflictBadge, fontSize: 12, marginBottom: 12 }}>{errors.password.message}</Text>}

        <Button
          mode="contained"
          onPress={handleSubmit(onSubmit)}
          style={{ marginTop: 20, paddingVertical: 8 }}
          disabled={isLoading}
        >
          {isLoading ? <ActivityIndicator /> : 'Login'}
        </Button>

        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
          <Text variant="bodySmall">Don&apos;t have an account? </Text>
          <Button
            mode="text"
            onPress={() => router.push('/(auth)/register')}
            compact
          >
            Register
          </Button>
        </View>

        <Button
          mode="text"
          onPress={() => router.push('/(auth)/forgot-password')}
          style={{ marginTop: 12 }}
        >
          Forgot Password?
        </Button>
      </View>
    </ScrollView>
  );
}

