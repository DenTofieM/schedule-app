import { useState } from 'react';
import { ScrollView, View } from 'react-native';
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
    <ScrollView className="flex-1" style={{ backgroundColor: AppPalette.surface.bg }} contentContainerStyle={{ padding: 20, paddingBottom: 32 }}>
      <Text variant="headlineSmall" style={{ marginBottom: 4, color: AppPalette.content.primary, fontWeight: '700' }}>
        Settings
      </Text>
      <Text variant="bodyMedium" style={{ marginBottom: 20, color: AppPalette.content.secondary }}>
        School configuration, preferences, and account controls
      </Text>

      <Card style={{ marginBottom: 16, backgroundColor: AppPalette.surface.card, borderRadius: 16, borderWidth: 1, borderColor: AppPalette.surface.border, elevation: 0 }}>
        <Card.Content>
          <Text variant="titleMedium" style={{ marginBottom: 12, color: AppPalette.content.primary }}>
            Account
          </Text>

          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
            <View style={{ width: 52, height: 52, borderRadius: 26, backgroundColor: AppPalette.brand[100], alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ color: AppPalette.brand[700], fontWeight: '700', fontSize: 18 }}>AD</Text>
            </View>

            <View style={{ flex: 1 }}>
              <Text variant="titleSmall">Admin User</Text>
              <Text style={{ marginTop: 2, color: AppPalette.content.secondary }}>admin@scheduleapp.com</Text>
              <Text style={{ marginTop: 2, color: AppPalette.content.secondary }}>School Administrator</Text>
            </View>
          </View>
        </Card.Content>
      </Card>

      <Card style={{ marginBottom: 16, backgroundColor: AppPalette.surface.card, borderRadius: 16, borderWidth: 1, borderColor: AppPalette.surface.border, elevation: 0 }}>
        <Card.Content>
          <Text variant="titleMedium" style={{ marginBottom: 12, color: AppPalette.content.primary }}>
            School Profile
          </Text>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: AppPalette.surface.border }}>
            <Text style={{ color: AppPalette.content.secondary }}>School name</Text>
            <Text style={{ color: AppPalette.content.primary, fontWeight: '600', textAlign: 'right', flexShrink: 1 }}>Northview Academy</Text>
          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: AppPalette.surface.border }}>
            <Text style={{ color: AppPalette.content.secondary }}>Academic year</Text>
            <Text style={{ color: AppPalette.content.primary, fontWeight: '600', textAlign: 'right', flexShrink: 1 }}>2026 - 2027</Text>
          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: AppPalette.surface.border }}>
            <Text style={{ color: AppPalette.content.secondary }}>Time format</Text>
            <Text style={{ color: AppPalette.content.primary, fontWeight: '600', textAlign: 'right', flexShrink: 1 }}>12-hour</Text>
          </View>
        </Card.Content>
      </Card>

      <Card style={{ marginBottom: 16, backgroundColor: AppPalette.surface.card, borderRadius: 16, borderWidth: 1, borderColor: AppPalette.surface.border, elevation: 0 }}>
        <Card.Content>
          <Text variant="titleMedium" style={{ marginBottom: 12, color: AppPalette.content.primary }}>
            Preferences
          </Text>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: AppPalette.surface.border }}>
            <View style={{ flex: 1, paddingRight: 16 }}>
              <Text variant="titleSmall">Auto-save drafts</Text>
              <Text style={{ marginTop: 2, color: AppPalette.content.secondary, fontSize: 12 }}>Keep routine changes saved automatically</Text>
            </View>
            <Switch
              value={preferences.autoSave}
              onValueChange={() => togglePreference('autoSave')}
              color={AppPalette.brand[500]}
            />
          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: AppPalette.surface.border }}>
            <View style={{ flex: 1, paddingRight: 16 }}>
              <Text variant="titleSmall">Conflict alerts</Text>
              <Text style={{ marginTop: 2, color: AppPalette.content.secondary, fontSize: 12 }}>Show warnings when schedules overlap</Text>
            </View>
            <Switch
              value={preferences.conflictAlerts}
              onValueChange={() => togglePreference('conflictAlerts')}
              color={AppPalette.brand[500]}
            />
          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: AppPalette.surface.border }}>
            <View style={{ flex: 1, paddingRight: 16 }}>
              <Text variant="titleSmall">Push notifications</Text>
              <Text style={{ marginTop: 2, color: AppPalette.content.secondary, fontSize: 12 }}>Daily reminders and status updates</Text>
            </View>
            <Switch
              value={preferences.pushNotifications}
              onValueChange={() => togglePreference('pushNotifications')}
              color={AppPalette.brand[500]}
            />
          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: AppPalette.surface.border }}>
            <View style={{ flex: 1, paddingRight: 16 }}>
              <Text variant="titleSmall">Compact mode</Text>
              <Text style={{ marginTop: 2, color: AppPalette.content.secondary, fontSize: 12 }}>Reduce spacing across timetable cards</Text>
            </View>
            <Switch
              value={preferences.compactMode}
              onValueChange={() => togglePreference('compactMode')}
              color={AppPalette.brand[500]}
            />
          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: AppPalette.surface.border }}>
            <View style={{ flex: 1, paddingRight: 16 }}>
              <Text variant="titleSmall">Dark mode</Text>
              <Text style={{ marginTop: 2, color: AppPalette.content.secondary, fontSize: 12 }}>Use a darker background for night work</Text>
            </View>
            <Switch
              value={preferences.darkMode}
              onValueChange={() => togglePreference('darkMode')}
              color={AppPalette.brand[500]}
            />
          </View>
        </Card.Content>
      </Card>

      <Card style={{ marginBottom: 16, backgroundColor: AppPalette.surface.card, borderRadius: 16, borderWidth: 1, borderColor: AppPalette.surface.border, elevation: 0 }}>
        <Card.Content>
          <Text variant="titleMedium" style={{ marginBottom: 12, color: AppPalette.content.primary }}>
            Security & Data
          </Text>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: AppPalette.surface.border }}>
            <Text style={{ color: AppPalette.content.secondary }}>Password</Text>
            <Text style={{ color: AppPalette.content.primary, fontWeight: '600', textAlign: 'right', flexShrink: 1 }}>Last updated 2 months ago</Text>
          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: AppPalette.surface.border }}>
            <Text style={{ color: AppPalette.content.secondary }}>Backup status</Text>
            <Text style={{ color: AppPalette.content.primary, fontWeight: '600', textAlign: 'right', flexShrink: 1 }}>Synced successfully</Text>
          </View>
        </Card.Content>
      </Card>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 12, marginTop: 8 }}>
        <Button mode="outlined" onPress={() => {}} style={{ flex: 1 }}>
          Save Changes
        </Button>
        <Button mode="contained" onPress={() => {}} style={{ flex: 1 }}>
          Export Data
        </Button>
      </View>
    </ScrollView>
  );
}


