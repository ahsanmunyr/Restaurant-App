import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Animated,
  Easing,
} from "react-native";

const { width } = Dimensions.get("window");
// import { LinearGradient } from "expo-linear-gradient";
import LinearGradient from 'react-native-linear-gradient';
const AnimatedLG = Animated.createAnimatedComponent(LinearGradient);

const Skeleton = ({ children, styles }) => {
  const animatedValue = new Animated.Value(0);

  useEffect(() => {
    Animated.loop(
      Animated.timing(animatedValue, {
        
        toValue: 1,
        duration: 150,
        easing: Easing.linear.inOut,
        useNativeDriver: true,
        
      }),
    ).start();
  });

  const translateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 70],
  });

  return (
    <View
      style={{
        backgroundColor: "#c2c2c2",
        borderColor: "#b0b0b0",
        height: 150,
        width: 150,
        borderRadius:12,
        // left: 100,
      }}
    >
        <View style={{width: '100%', height: '100%', borderRadius:12,}}>
        <AnimatedLG
            colors={["#c9c9c9", "#c9c9c9", "#c9c9c9", "#c9c9c9"]}
            start={{ x: 1, y: -1 }}
            end={{ x: -1, y: 1 }}
            style={{
                width: '50%', height: '100%', borderRadius:12,
              ...StyleSheet.absoluteFill,
            transform: [{ translateX: translateX }],
            }}
        />
          {children}
        </View>
     
    </View>
  );
};
export default Skeleton;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});