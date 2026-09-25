import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, Card, Text } from 'react-native-paper';

const tabs = [
  { key: 'sections', label: 'Classes', items: ['Class A', 'Class B', 'Class C'] },
  { key: 'subjects', label: 'Subjects', items: ['Mathematics', 'Science', 'English'] },
  { key: 'teachers', label: 'Teachers', items: ['A. Sharma', 'M. Patel', 'R. Gomez'] },
  { key: 'days', label: 'Days', items: ['Monday', 'Tuesday', 'Wednesday'] },
  { key: 'periods', label: 'Periods', items: ['08:00-08:45', '08:45-09:30', '09:45-10:30'] },
] as const;

export default function MasterDataScreen() {
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]['key']>('sections');
  const currentTab = tabs.find((tab) => tab.key === activeTab) ?? tabs[0];

  return (
    <View style={styles.container}>
      <Text variant="headlineSmall" style={styles.heading}>
        Master Data
      </Text>

      <View style={styles.tabRow}>
        {tabs.map((tab) => (
          <Button
            key={tab.key}
            mode={tab.key === activeTab ? 'contained' : 'outlined'}
            onPress={() => setActiveTab(tab.key)}
            compact
          >
            {tab.label}
          </Button>
        ))}
      </View>

      <ScrollView contentContainerStyle={styles.listContainer}>
        {currentTab.items.map((item) => (
          <Card key={item} style={styles.card}>
            <Card.Content>
              <Text variant="titleMedium">{item}</Text>
              <Text variant="bodyMedium" style={styles.metaText}>
                Ready for schedule configuration
              </Text>
            </Card.Content>
          </Card>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  heading: {
    marginBottom: 12,
    fontWeight: '700',
  },
  tabRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  listContainer: {
    gap: 12,
    paddingBottom: 24,
  },
  card: {
    borderRadius: 12,
  },
  metaText: {
    color: '#666',
    marginTop: 6,
  },
});
