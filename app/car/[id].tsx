import { StyleSheet, Text, View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import { VolvoColors } from '@/constants/theme';
import { cars } from '@/constants/cars';

export default function CarDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const car = cars.find((c) => c.id === id);

  if (!car) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Car not found</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>{car.modelName}</Text>
      <Text style={styles.subtitle}>{car.modelType}</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: VolvoColors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: VolvoColors.textPrimary,
  },
  subtitle: {
    fontSize: 16,
    color: VolvoColors.textSecondary,
    marginTop: 4,
  },
});
