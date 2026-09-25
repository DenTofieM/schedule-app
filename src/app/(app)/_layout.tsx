import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Tabs, useRouter } from 'expo-router';
import { useEffect } from 'react';

import { useAppStore } from '@/store';

export default function AppLayout() {
  const router = useRouter();
  const currentUser = useAppStore((state) => state.currentUser);

  useEffect(() => {
    if (!currentUser) {
      router.replace('/(auth)/login');
    }
  }, [currentUser]);

  if (!currentUser) {
    return null;
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#2196F3',
        tabBarInactiveTintColor: '#999',
        headerShown: true,
        headerTintColor: '#2196F3',
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="dashboard" size={24} color={color} />
          ),
          headerTitle: 'Dashboard',
        }}
      />

      <Tabs.Screen
        name="master-data"
        options={{
          title: 'Master Data',
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="data-usage" size={24} color={color} />
          ),
          headerTitle: 'Master Data Management',
        }}
      />

      <Tabs.Screen
        name="routines"
        options={{
          title: 'Routines',
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="schedule" size={24} color={color} />
          ),
          headerTitle: 'Routine Management',
        }}
      />

      <Tabs.Screen
        name="builder"
        options={{
          title: 'Builder',
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="edit" size={24} color={color} />
          ),
          headerTitle: 'Routine Builder',
        }}
      />

      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="settings" size={24} color={color} />
          ),
          headerTitle: 'Settings',
        }}
      />
    </Tabs>
  );
}
