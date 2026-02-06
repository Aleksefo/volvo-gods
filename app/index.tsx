import { StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useCallback, useMemo, useState } from 'react';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';

import { VolvoColors } from '@/constants/theme';
import { cars, type BodyType, type Car } from '@/constants/cars';
import { CarCarousel } from '@/components/car-carousel';
import { FilterBar } from '@/components/filter-bar';

export default function HomeScreen() {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState<BodyType | null>(null);

  const filteredCars = useMemo(
    () => (activeFilter ? cars.filter((c) => c.bodyType === activeFilter) : cars),
    [activeFilter],
  );

  const handlePressCard = useCallback(
    (car: Car) => {
      router.push(`/car/${car.id}`);
    },
    [router],
  );

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View
        entering={FadeIn.duration(600)}
        style={styles.header}
      >
        <Text style={styles.logo}>VOLVO</Text>
        <Text style={styles.subtitle}>Recharge Lineup</Text>
      </Animated.View>
      <Animated.View entering={FadeInDown.delay(200).duration(500)}>
        <FilterBar activeFilter={activeFilter} onFilterChange={setActiveFilter} />
      </Animated.View>
      <CarCarousel cars={filteredCars} onPressCard={handlePressCard} />
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
    paddingBottom: 4,
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
