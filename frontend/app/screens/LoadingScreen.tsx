import { useEffect } from "react";
import { StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
} from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";

const LoadingScreen = ({ onFinish }) => {
  const logoScale = useSharedValue(1);
  const titleOpacity = useSharedValue(0);
  const subtitleOpacity = useSharedValue(0);
  const footerOpacity = useSharedValue(0);

  useEffect(() => {
    logoScale.value = withTiming(0.5, { duration: 2000 });
    titleOpacity.value = withDelay(1500, withTiming(1, { duration: 1000 }));
    subtitleOpacity.value = withDelay(2000, withTiming(1, { duration: 1000 }));
    footerOpacity.value = withDelay(2500, withTiming(1, { duration: 1000 }));

    setTimeout(() => {
      onFinish();
    }, 4000);
  }, []);

  const logoStyle = useAnimatedStyle(() => ({
    transform: [{ scale: logoScale.value }],
  }));

  const titleStyle = useAnimatedStyle(() => ({
    opacity: titleOpacity.value,
  }));

  const subtitleStyle = useAnimatedStyle(() => ({
    opacity: subtitleOpacity.value,
  }));

  const footerStyle = useAnimatedStyle(() => ({
    opacity: footerOpacity.value,
  }));

  return (
    <LinearGradient colors={["#082D7B", "#28A7B0"]} style={styles.container}>
      <Animated.Image
        source={require("../../assets/images/logo.png")}
        style={[styles.logo, logoStyle]}
        resizeMode="contain"
      />
      <Animated.Text style={[styles.title, titleStyle]}>
        Campus Pilot
      </Animated.Text>
      <Animated.Text style={[styles.subtitle, subtitleStyle]}>
        Concordia's Campus Guide
      </Animated.Text>
      <Animated.Text style={[styles.footer, footerStyle]}>
        © 2025 Concordia University{"\n"}All Rights Reserved
      </Animated.Text>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#121212",
  },
  logo: {
    width: 300,
    height: 300,
    marginTop: -200,
  },
  title: {
    marginTop: -60,
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  subtitle: {
    fontSize: 16,
    color: "#ccc",
  },
  footer: {
    position: "absolute",
    bottom: 20,
    fontSize: 12,
    color: "#FFFFFF",
    textAlign: "center",
  },
});

export default LoadingScreen;
