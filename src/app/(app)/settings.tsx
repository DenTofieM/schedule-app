import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, Card, Switch, Text } from 'react-native-paper';

import { AppPalette } from '@/constants/theme';

export default function SettingsScreen() {
  const [preferences, setPreferences] = useState({
    autoSave: true,
    conflictAlerts: true,
    pushNotifications: true,
    compactMode: false,
    darkMode: false,
  });

  const togglePreference = (key: keyof typeof preferences) => {
    setPreferences((current) => ({
      ...current,
      [key]: !current[key],
    }));
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Text variant="headlineSmall" style={styles.title}>
        Settings
      </Text>
      <Text variant="bodyMedium" style={styles.subtitle}>
        School configuration, preferences, and account controls
      </Text>

      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleMedium" style={styles.cardTitle}>
            Account
          </Text>

          <View style={styles.accountRow}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>AD</Text>
            </View>

            <View style={styles.accountInfo}>
              <Text variant="titleSmall">Admin User</Text>
              <Text style={styles.metaText}>admin@scheduleapp.com</Text>
              <Text style={styles.metaText}>School Administrator</Text>
            </View>
          </View>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleMedium" style={styles.cardTitle}>
            School Profile
          </Text>

          <View style={styles.infoRow}>
            <Text style={styles.label}>School name</Text>
            <Text style={styles.value}>Northview Academy</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.label}>Academic year</Text>
            <Text style={styles.value}>2026 - 2027</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.label}>Time format</Text>
            <Text style={styles.value}>12-hour</Text>
          </View>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleMedium" style={styles.cardTitle}>
            Preferences
          </Text>

          <View style={styles.preferenceRow}>
            <View style={styles.preferenceTextWrap}>
              <Text variant="titleSmall">Auto-save drafts</Text>
              <Text style={styles.helpText}>Keep routine changes saved automatically</Text>
            </View>
            <Switch
              value={preferences.autoSave}
              onValueChange={() => togglePreference('autoSave')}
              color={AppPalette.brand[500]}
            />
          </View>

          <View style={styles.preferenceRow}>
            <View style={styles.preferenceTextWrap}>
              <Text variant="titleSmall">Conflict alerts</Text>
              <Text style={styles.helpText}>Show warnings when schedules overlap</Text>
            </View>
            <Switch
              value={preferences.conflictAlerts}
              onValueChange={() => togglePreference('conflictAlerts')}
              color={AppPalette.brand[500]}
            />
          </View>

          <View style={styles.preferenceRow}>
            <View style={styles.preferenceTextWrap}>
              <Text variant="titleSmall">Push notifications</Text>
              <Text style={styles.helpText}>Daily reminders and status updates</Text>
            </View>
            <Switch
              value={preferences.pushNotifications}
              onValueChange={() => togglePreference('pushNotifications')}
              color={AppPalette.brand[500]}
            />
          </View>

          <View style={styles.preferenceRow}>
            <View style={styles.preferenceTextWrap}>
              <Text variant="titleSmall">Compact mode</Text>
              <Text style={styles.helpText}>Reduce spacing across timetable cards</Text>
            </View>
            <Switch
              value={preferences.compactMode}
              onValueChange={() => togglePreference('compactMode')}
              color={AppPalette.brand[500]}
            />
          </View>

          <View style={styles.preferenceRow}>
            <View style={styles.preferenceTextWrap}>
              <Text variant="titleSmall">Dark mode</Text>
              <Text style={styles.helpText}>Use a darker background for night work</Text>
            </View>
            <Switch
              value={preferences.darkMode}
              onValueChange={() => togglePreference('darkMode')}
              color={AppPalette.brand[500]}
            />
          </View>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleMedium" style={styles.cardTitle}>
            Security & Data
          </Text>

          <View style={styles.infoRow}>
            <Text style={styles.label}>Password</Text>
            <Text style={styles.value}>Last updated 2 months ago</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.label}>Backup status</Text>
            <Text style={styles.value}>Synced successfully</Text>
          </View>
        </Card.Content>
      </Card>

      <View style={styles.actionRow}>
        <Button mode="outlined" onPress={() => {}} style={styles.actionButton}>
          Save Changes
        </Button>
        <Button mode="contained" onPress={() => {}} style={styles.actionButton}>
          Export Data
        </Button>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppPalette.surface.bg,
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 32,
  },
  title: {
    marginBottom: 4,
    color: AppPalette.content.primary,
    fontWeight: '700',
  },
  subtitle: {
    marginBottom: 20,
    color: AppPalette.content.secondary,
  },
  card: {
    marginBottom: 16,
    backgroundColor: AppPalette.surface.card,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: AppPalette.surface.border,
    elevation: 0,
  },
  cardTitle: {
    marginBottom: 12,
    color: AppPalette.content.primary,
  },
  accountRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: AppPalette.brand[100],
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: AppPalette.brand[700],
    fontWeight: '700',
    fontSize: 18,
  },
  accountInfo: {
    flex: 1,
  },
  metaText: {
    marginTop: 2,
    color: AppPalette.content.secondary,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: AppPalette.surface.border,
  },
  label: {
    color: AppPalette.content.secondary,
  },
  value: {
    color: AppPalette.content.primary,
    fontWeight: '600',
    textAlign: 'right',
    flexShrink: 1,
  },
  preferenceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: AppPalette.surface.border,
  },
  preferenceTextWrap: {
    flex: 1,
    paddingRight: 16,
  },
  helpText: {
    marginTop: 2,
    color: AppPalette.content.secondary,
    fontSize: 12,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    marginTop: 8,
  },
  actionButton: {
    flex: 1,
  },
});
