import { StyleSheet, Text, View, Pressable } from 'react-native';
import { Image } from 'expo-image';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  interpolate,
  Extrapolation,
  FadeIn,
  withSpring,
} from 'react-native-reanimated';

import { VolvoColors } from '@/constants/theme';
import { cars } from '@/constants/cars';

const HEADER_MAX_HEIGHT = 300;
const HEADER_MIN_HEIGHT = 120;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

export default function CarDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const car = cars.find((c) => c.id === id);

  const scrollY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  const headerStyle = useAnimatedStyle(() => {
    const height = interpolate(
      scrollY.value,
      [0, HEADER_SCROLL_DISTANCE],
      [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
      Extrapolation.CLAMP,
    );
    return { height };
  });

  const imageStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      scrollY.value,
      [-100, 0, HEADER_SCROLL_DISTANCE],
      [1.3, 1, 0.9],
      Extrapolation.CLAMP,
    );
    const translateY = interpolate(
      scrollY.value,
      [0, HEADER_SCROLL_DISTANCE],
      [0, 30],
      Extrapolation.CLAMP,
    );
    const opacity = interpolate(
      scrollY.value,
      [0, HEADER_SCROLL_DISTANCE],
      [1, 0.7],
      Extrapolation.CLAMP,
    );
    return { transform: [{ scale }, { translateY }], opacity };
  });

  const titleStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollY.value,
      [0, HEADER_SCROLL_DISTANCE * 0.5],
      [0, 1],
      Extrapolation.CLAMP,
    );
    return { opacity };
  });

  const learnScale = useSharedValue(1);
  const shopScale = useSharedValue(1);

  const learnButtonStyle = useAnimatedStyle(() => ({
    transform: [{ scale: learnScale.value }],
  }));

  const shopButtonStyle = useAnimatedStyle(() => ({
    transform: [{ scale: shopScale.value }],
  }));

  if (!car) {
    return (
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <Text>Car not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.header, headerStyle]}>
        <Animated.View style={[styles.imageWrapper, imageStyle]}>
          <Image
            source={{ uri: car.imageUrl }}
            style={styles.headerImage}
            contentFit="cover"
          />
        </Animated.View>
        <View style={styles.headerOverlay} />

        <Animated.View style={[styles.collapsedTitleContainer, { top: insets.top + 10 }, titleStyle]}>
          <Text style={styles.collapsedTitle}>{car.modelName}</Text>
        </Animated.View>
      </Animated.View>

      <Animated.View
        entering={FadeIn.delay(200).duration(400)}
        style={[styles.backButton, { top: insets.top + 10 }]}
      >
        <Pressable onPress={() => router.back()} style={styles.backButtonInner}>
          <Text style={styles.backButtonText}>{'<'}</Text>
        </Pressable>
      </Animated.View>

      <Animated.ScrollView
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingTop: HEADER_MAX_HEIGHT },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View
          entering={FadeIn.delay(100).duration(400)}
          style={styles.badge}
        >
          <Text style={styles.badgeText}>{car.bodyType.toUpperCase()}</Text>
        </Animated.View>

        <Animated.View entering={FadeIn.delay(200).duration(400)}>
          <Text style={styles.modelName}>{car.modelName}</Text>
          <Text style={styles.modelType}>{car.modelType}</Text>
        </Animated.View>

        <View style={styles.divider} />

        <Animated.View entering={FadeIn.delay(300).duration(400)}>
          <Text style={styles.sectionTitle}>Key Features</Text>
          <View style={styles.featureList}>
            <FeatureItem text="Electric powertrain" />
            <FeatureItem text="Advanced safety systems" />
            <FeatureItem text="Connected car technology" />
            <FeatureItem text="Sustainable materials" />
          </View>
        </Animated.View>

        <View style={styles.divider} />

        <Animated.View
          entering={FadeIn.delay(400).duration(400)}
          style={styles.actionButtons}
        >
          <Animated.View style={[styles.buttonWrapper, learnButtonStyle]}>
            <Pressable
              style={styles.primaryButton}
              onPressIn={() => { learnScale.value = withSpring(0.95); }}
              onPressOut={() => { learnScale.value = withSpring(1); }}
            >
              <Text style={styles.primaryButtonText}>LEARN MORE</Text>
            </Pressable>
          </Animated.View>

          <Animated.View style={[styles.buttonWrapper, shopButtonStyle]}>
            <Pressable
              style={styles.secondaryButton}
              onPressIn={() => { shopScale.value = withSpring(0.95); }}
              onPressOut={() => { shopScale.value = withSpring(1); }}
            >
              <Text style={styles.secondaryButtonText}>SHOP NOW</Text>
            </Pressable>
          </Animated.View>
        </Animated.View>

        <View style={{ height: insets.bottom + 40 }} />
      </Animated.ScrollView>
    </View>
  );
}

function FeatureItem({ text }: { text: string }) {
  return (
    <View style={styles.featureItem}>
      <View style={styles.featureBullet} />
      <Text style={styles.featureText}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: VolvoColors.white,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    overflow: 'hidden',
    backgroundColor: VolvoColors.offWhite,
  },
  imageWrapper: {
    ...StyleSheet.absoluteFillObject,
  },
  headerImage: {
    width: '100%',
    height: '100%',
  },
  headerOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  collapsedTitleContainer: {
    position: 'absolute',
    left: 60,
    right: 60,
    alignItems: 'center',
  },
  collapsedTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: VolvoColors.white,
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  backButton: {
    position: 'absolute',
    left: 16,
    zIndex: 20,
  },
  backButtonInner: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  backButtonText: {
    fontSize: 20,
    fontWeight: '600',
    color: VolvoColors.darkGray,
  },
  scrollContent: {
    paddingHorizontal: 24,
  },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: VolvoColors.lightGray,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
    marginTop: 24,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: VolvoColors.mediumGray,
    letterSpacing: 1.5,
  },
  modelName: {
    fontSize: 32,
    fontWeight: '700',
    color: VolvoColors.textPrimary,
    marginTop: 12,
  },
  modelType: {
    fontSize: 18,
    color: VolvoColors.textSecondary,
    marginTop: 4,
  },
  divider: {
    height: 1,
    backgroundColor: VolvoColors.lightGray,
    marginVertical: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: VolvoColors.textPrimary,
    marginBottom: 16,
  },
  featureList: {
    gap: 12,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  featureBullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: VolvoColors.primaryBlue,
  },
  featureText: {
    fontSize: 16,
    color: VolvoColors.textPrimary,
  },
  actionButtons: {
    gap: 12,
  },
  buttonWrapper: {
    borderRadius: 8,
    overflow: 'hidden',
  },
  primaryButton: {
    backgroundColor: VolvoColors.primaryBlue,
    paddingVertical: 16,
    alignItems: 'center',
    borderRadius: 8,
  },
  primaryButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: VolvoColors.white,
    letterSpacing: 1,
  },
  secondaryButton: {
    backgroundColor: VolvoColors.white,
    paddingVertical: 16,
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: VolvoColors.primaryBlue,
  },
  secondaryButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: VolvoColors.primaryBlue,
    letterSpacing: 1,
  },
});
