import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { VolvoColors } from '@/constants/theme';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>VOLVO</Text>
        <Text style={styles.subtitle}>Recharge Lineup</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: VolvoColors.white,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 12,
  },
  logo: {
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 6,
    color: VolvoColors.textPrimary,
  },
  subtitle: {
    fontSize: 14,
    color: VolvoColors.textSecondary,
    marginTop: 2,
  },
});
