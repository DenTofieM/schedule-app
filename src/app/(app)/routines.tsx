import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

export default function RoutinesScreen() {
  return (
    <View style={styles.container}>
      <Text variant="headlineSmall">Routine Management</Text>
      <Text variant="bodyMedium" style={styles.placeholder}>
        View, Edit, and Manage Routines
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  placeholder: {
    marginTop: 16,
    color: '#666',
  },
});
