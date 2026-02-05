import { Dimensions, StyleSheet, View } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  interpolate,
  Extrapolation,
  FadeInDown,
  type SharedValue,
} from 'react-native-reanimated';
import { useCallback } from 'react';

import { type Car } from '@/constants/cars';
import { VolvoColors } from '@/constants/theme';
import { CarCard } from '@/components/car-card';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_WIDTH = SCREEN_WIDTH * 0.82;
const CARD_MARGIN = 10;
const SNAP_INTERVAL = CARD_WIDTH + CARD_MARGIN * 2;
const SIDE_PADDING = (SCREEN_WIDTH - CARD_WIDTH) / 2 - CARD_MARGIN;

interface CarCarouselProps {
  cars: Car[];
  onPressCard: (car: Car) => void;
}

function AnimatedCarCard({
  car,
  index,
  scrollX,
  onPress,
}: {
  car: Car;
  index: number;
  scrollX: SharedValue<number>;
  onPress: () => void;
}) {
  const inputRange = [
    (index - 1) * SNAP_INTERVAL,
    index * SNAP_INTERVAL,
    (index + 1) * SNAP_INTERVAL,
  ];

  const cardStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      scrollX.value,
      inputRange,
      [0.88, 1, 0.88],
      Extrapolation.CLAMP,
    );
    const opacity = interpolate(
      scrollX.value,
      inputRange,
      [0.5, 1, 0.5],
      Extrapolation.CLAMP,
    );
    const translateY = interpolate(
      scrollX.value,
      inputRange,
      [10, 0, 10],
      Extrapolation.CLAMP,
    );
    return { transform: [{ scale }, { translateY }], opacity };
  });

  return (
    <Animated.View
      style={styles.cardWrapper}
      entering={FadeInDown.delay(index * 120).duration(500)}
    >
      <CarCard car={car} animatedStyle={cardStyle} onPress={onPress} />
    </Animated.View>
  );
}

function PaginationDot({
  index,
  scrollX,
  total,
}: {
  index: number;
  scrollX: SharedValue<number>;
  total: number;
}) {
  const inputRange = [
    (index - 1) * SNAP_INTERVAL,
    index * SNAP_INTERVAL,
    (index + 1) * SNAP_INTERVAL,
  ];

  const dotStyle = useAnimatedStyle(() => {
    const width = interpolate(
      scrollX.value,
      inputRange,
      [8, 28, 8],
      Extrapolation.CLAMP,
    );
    const opacity = interpolate(
      scrollX.value,
      inputRange,
      [0.3, 1, 0.3],
      Extrapolation.CLAMP,
    );
    const backgroundColor =
      opacity > 0.5 ? VolvoColors.primaryBlue : VolvoColors.lightGray;

    return { width, opacity, backgroundColor };
  });

  return <Animated.View style={[styles.dot, dotStyle]} />;
}

export function CarCarousel({ cars, onPressCard }: CarCarouselProps) {
  const scrollX = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollX.value = event.contentOffset.x;
    },
  });

  const renderItem = useCallback(
    ({ item, index }: { item: Car; index: number }) => (
      <AnimatedCarCard
        car={item}
        index={index}
        scrollX={scrollX}
        onPress={() => onPressCard(item)}
      />
    ),
    [scrollX, onPressCard],
  );

  const keyExtractor = useCallback((item: Car) => item.id, []);

  return (
    <View style={styles.container}>
      <Animated.FlatList
        data={cars}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={SNAP_INTERVAL}
        decelerationRate="fast"
        contentContainerStyle={styles.listContent}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
      />
      <View style={styles.pagination}>
        {cars.map((car, index) => (
          <PaginationDot
            key={car.id}
            index={index}
            scrollX={scrollX}
            total={cars.length}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: SIDE_PADDING,
  },
  cardWrapper: {
    width: CARD_WIDTH,
    marginHorizontal: CARD_MARGIN,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 20,
  },
  dot: {
    height: 8,
    borderRadius: 4,
  },
});
