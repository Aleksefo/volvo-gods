import { StyleSheet, Text, View } from 'react-native';
import { Image } from 'expo-image';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { type StyleProp, type ViewStyle } from 'react-native';

import { type Car } from '@/constants/cars';
import { VolvoColors } from '@/constants/theme';

interface CarCardProps {
  car: Car;
  animatedStyle?: StyleProp<ViewStyle>;
  onPress?: () => void;
}

export function CarCard({ car, animatedStyle, onPress }: CarCardProps) {
  const scale = useSharedValue(1);

  const tapGesture = Gesture.Tap()
    .onBegin(() => {
      scale.value = withSpring(0.93, { damping: 14, stiffness: 180 });
    })
    .onFinalize(() => {
      scale.value = withSpring(1, { damping: 14, stiffness: 160 });
    })
    .onEnd(() => {
      if (onPress) {
        onPress();
      }
    });

  const pressStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.View style={[styles.card, animatedStyle]}>
      <GestureDetector gesture={tapGesture}>
        <Animated.View style={[styles.pressable, pressStyle]}>
          <Text style={styles.bodyType}>{car.bodyType.toUpperCase()}</Text>
          <View style={styles.nameRow}>
            <Text style={styles.modelName}>{car.modelName}</Text>
            <Text style={styles.modelType}>{car.modelType}</Text>
          </View>

          <View style={styles.imageContainer}>
            <Image
              source={{ uri: car.imageUrl }}
              style={styles.carImage}
              contentFit="contain"
              transition={300}
            />
          </View>

          <View style={styles.actions}>
            <View style={styles.actionButton}>
              <Text style={styles.actionText}>LEARN</Text>
              <Text style={styles.chevronPlaceholder}>{'>'}</Text>
            </View>
            <View style={styles.actionButton}>
              <Text style={styles.actionText}>SHOP</Text>
              <Text style={styles.chevronPlaceholder}>{'>'}</Text>
            </View>
          </View>
        </Animated.View>
      </GestureDetector>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: VolvoColors.white,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },
  pressable: {
    padding: 20,
  },
  bodyType: {
    fontSize: 12,
    fontWeight: '600',
    color: VolvoColors.mediumGray,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 8,
    marginTop: 4,
  },
  modelName: {
    fontSize: 20,
    fontWeight: '700',
    color: VolvoColors.textPrimary,
  },
  modelType: {
    fontSize: 14,
    color: VolvoColors.textSecondary,
  },
  imageContainer: {
    height: 200,
    marginTop: 16,
    marginHorizontal: -10,
  },
  carImage: {
    width: '100%',
    height: '100%',
  },
  actions: {
    flexDirection: 'row',
    gap: 24,
    marginTop: 16,
    justifyContent: 'center',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  actionText: {
    fontSize: 14,
    fontWeight: '600',
    color: VolvoColors.accentBlue,
    letterSpacing: 0.5,
  },
  chevronPlaceholder: {
    fontSize: 12,
    color: VolvoColors.accentBlue,
    fontWeight: '700',
  },
});
