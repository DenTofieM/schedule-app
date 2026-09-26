import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ScrollView, StyleSheet, View } from 'react-native';
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
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text variant="headlineLarge" style={styles.title}>
          Schedule App
        </Text>
        <Text variant="bodyMedium" style={styles.subtitle}>
          Admin Login
        </Text>
      </View>

      <View style={styles.form}>
        {error && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
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
              style={styles.input}
              error={!!errors.email}
            />
          )}
        />
        {errors.email && <Text style={styles.inputError}>{errors.email.message}</Text>}

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
              style={styles.input}
              error={!!errors.password}
            />
          )}
        />
        {errors.password && <Text style={styles.inputError}>{errors.password.message}</Text>}

        <Button
          mode="contained"
          onPress={handleSubmit(onSubmit)}
          style={styles.submitButton}
          disabled={isLoading}
        >
          {isLoading ? <ActivityIndicator /> : 'Login'}
        </Button>

        <View style={styles.footer}>
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
          style={styles.forgotButton}
        >
          Forgot Password?
        </Button>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: AppPalette.surface.bg,
  },
  header: {
    marginBottom: 40,
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    color: AppPalette.content.secondary,
  },
  form: {
    backgroundColor: AppPalette.surface.card,
    padding: 20,
    borderRadius: 12,
    elevation: 2,
    borderWidth: 1,
    borderColor: AppPalette.surface.border,
  },
  input: {
    marginBottom: 8,
  },
  inputError: {
    color: AppPalette.status.conflictBadge,
    fontSize: 12,
    marginBottom: 12,
  },
  errorContainer: {
    backgroundColor: AppPalette.status.conflictBg,
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: AppPalette.status.conflictBorder,
  },
  errorText: {
    color: AppPalette.status.conflictText,
  },
  submitButton: {
    marginTop: 20,
    paddingVertical: 8,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  forgotButton: {
    marginTop: 12,
  },
});
