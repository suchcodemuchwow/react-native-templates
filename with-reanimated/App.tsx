import React from "react";
import { View, Button, Platform, StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  Easing,
} from "react-native-reanimated";

if (Platform.OS === "web") {
  // more info: https://github.com/software-mansion/react-native-reanimated/issues/3355
  // @ts-ignore
  window._frameTimestamp = null;
}

export default function App() {
  const randomWidth = useSharedValue(10);

  const config = {
    duration: 500,
    easing: Easing.bezier(0.5, 0.01, 0, 1),
  };

  const style = useAnimatedStyle(() => {
    return {
      width: withTiming(randomWidth.value, config),
    };
  });

  const onPressButton = () => {
    randomWidth.value = Math.random() * 350;
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.animatedViewContainer, style]} />
      <Button title="Hello" onPress={onPressButton} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  animatedViewContainer: {
    width: 100,
    height: 80,
    backgroundColor: "black",
    margin: 30,
  },
});
