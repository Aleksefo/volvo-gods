# Volvo Recharge Lineup

A React Native demo app showcasing Volvo's lineup. Built with Expo and React Native Reanimated to demonstrate smooth animations.

[Demo video featuring the animations
](https://drive.google.com/file/d/1uFgft1lf2BREbXhq4SSWP0pm8ulygRhT/view?usp=sharing)

## Running the app

- Install dependencies: `npm install`
- Start the dev server: `npx expo start`

## What's implemented

### Screens
- Home screen with horizontal car carousel and car type filter
- Car detail screen with collapsing header

### Animations (React Native Reanimated)
- Scroll-driven carousel with animation: cards scale and fade based on scroll position
- Animated pagination dots that respond to scroll
- Spring-based press feedback on cards
- Staggered entrance animations
- Filter options with animated background color transitions
- Layout animations when filtering
- Collapsing header on detail screen
- Pull-to-expand effect on car detail hero image

### Tech stack
- Expo SDK 54 with Expo Router
- React Native Reanimated 4 for all animations
- React Native Gesture Handler
- TypeScript
