// references made:
// https://reactnative.dev/docs/animated
// https://reactnative.dev/docs/easing
// https://codepen.io/Bunker13/pen/xxGxXNa

import { useEffect, useRef } from "react";
import {
  Animated,
  Easing,
  StyleSheet,
  useWindowDimensions,
  View,
} from "react-native";

import { COLOURS } from "../constants/colours";

// the different speeds, opacity and the offsets will 
// be used to reate depth without using any images
const WAVE_LAYERS = [
  // here, the foreground layer is made the strongest 
  // and the fastest and then the later layers will 
  // made to be slower, lighter and lower so that it 
  // can produce the effect of a wave behind the form
  {
    color: COLOURS.waveOneCol,
    opacity: 0.7,
    duration: 5000,
    borderRadiusRatio: 0.4,
    surfaceOffset: 0,
  },
  {
    color: COLOURS.waveTwoCol,
    opacity: 0.5,
    duration: 7000,
    borderRadiusRatio: 0.35,
    surfaceOffset: 0.05,
  },
  {
    color: COLOURS.waveThreeCol,
    opacity: 0.3,
    duration: 11000,
    borderRadiusRatio: 0.33,
    surfaceOffset: 0.1,
  },
];

function WaterWave({
  borderRadiusRatio,
  color,
  duration,
  layerSize,
  left,
  opacity,
  surfaceOffset,
  waterHeight,
}) {
  // here useRef will preserve one Animated.Value across every render of this layer
  const rotation = useRef(new Animated.Value(0)).current;

  // by storing the value in the red, it will prevent the normal 
  // render from resetting the animation that is alr in progress
  useEffect(() => {
    // here, it will rotate continously in a linear curve so that 
    // no seam will appear in the loop
    const animation = Animated.loop(
      // here, the timing will move from 0 to 1 once and then 
      // it will loop immediately to repeat that movement
      Animated.timing(rotation, {
        toValue: 1,
        duration,
        easing: Easing.linear,
        useNativeDriver: true,
        // the rotation used here is a transform that 
        // it can run efficiently on the native driver
      })
    );

    animation.start();

    // during the cleanup, the composite look and 
    // its underlying value will be stopped
    return () => {
      animation.stop();
      rotation.stopAnimation();
    };
  }, [duration, rotation]);

  // the normalised 0 to 1 value will be converted 
  // into degrees that will be accpeted by transform
  const spin = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <Animated.View
      // each of these layers will share its 
      // struture but it receives different 
      // visual settings accordingly
      style={[
        styles.wave,
        {
          backgroundColor: color,
          borderRadius: layerSize * borderRadiusRatio,
          height: layerSize,
          left,
          opacity,
          top: waterHeight * surfaceOffset,
          transform: [{ rotate: spin }],
          width: layerSize,
        },
      ]}
    />
  );
}

// the useWindowDimensions will respond to the rotation 
// and the reszing so that the water will continue to 
// cover the intended portion of the current screen
export default function WaterCurrentBackground() {
  const { height, width } = useWindowDimensions();

  // this will cover the bottom half approximately with 
  // layers that are wider than the viewport
  const waterHeight = height * 0.52;
  const layerSize = Math.max(width * 2, waterHeight * 1.9);
  const left = (width - layerSize) / 2;

  return (
    <View
      // this deco is excluded from the interaction and screen 
      // readers intentionally
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
      pointerEvents="none"
      style={[styles.container, { height: waterHeight }]}
    >
      {WAVE_LAYERS.map((wave) => (
        // the config objects become the 3 independent 
        // animated wave instances
        <WaterWave
          key={wave.color}
          {...wave}
          layerSize={layerSize}
          left={left}
          waterHeight={waterHeight}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    right: 0,
    bottom: 0,
    left: 0,
    overflow: "hidden",
  },

  wave: {
    position: "absolute",
  },
});
