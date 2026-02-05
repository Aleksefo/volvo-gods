import { Pressable, StyleSheet, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  withTiming,
  withSpring,
  useSharedValue,
  interpolateColor,
} from 'react-native-reanimated';
import { useEffect } from 'react';

import { BODY_TYPES, type BodyType } from '@/constants/cars';
import { VolvoColors } from '@/constants/theme';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const FILTERS: Array<{ label: string; value: BodyType | null }> = [
  { label: 'All', value: null },
  ...BODY_TYPES.map((bt) => ({ label: bt.charAt(0).toUpperCase() + bt.slice(1), value: bt })),
];

interface FilterBarProps {
  activeFilter: BodyType | null;
  onFilterChange: (bodyType: BodyType | null) => void;
}

function FilterChip({
  label,
  isActive,
  onPress,
}: {
  label: string;
  isActive: boolean;
  onPress: () => void;
}) {
  const progress = useSharedValue(isActive ? 1 : 0);

  useEffect(() => {
    progress.value = withTiming(isActive ? 1 : 0, { duration: 250 });
  }, [isActive, progress]);

  const chipStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      progress.value,
      [0, 1],
      [VolvoColors.lightGray, VolvoColors.primaryBlue],
    );
    const scale = withSpring(isActive ? 1.05 : 1, { damping: 15, stiffness: 180 });
    return { backgroundColor, transform: [{ scale }] };
  });

  const textStyle = useAnimatedStyle(() => {
    const color = interpolateColor(
      progress.value,
      [0, 1],
      [VolvoColors.darkGray, VolvoColors.white],
    );
    return { color };
  });

  return (
    <AnimatedPressable style={[styles.chip, chipStyle]} onPress={onPress}>
      <Animated.Text style={[styles.chipText, textStyle]}>{label}</Animated.Text>
    </AnimatedPressable>
  );
}

export function FilterBar({ activeFilter, onFilterChange }: FilterBarProps) {
  return (
    <View style={styles.container}>
      {FILTERS.map((filter) => (
        <FilterChip
          key={filter.label}
          label={filter.label}
          isActive={activeFilter === filter.value}
          onPress={() => onFilterChange(filter.value)}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    paddingVertical: 12,
    gap: 10,
  },
  chip: {
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 20,
  },
  chipText: {
    fontSize: 14,
    fontWeight: '600',
  },
});
