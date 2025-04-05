import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import Slider from "@react-native-community/slider";

interface RadiusSliderProps {
  onRadiusChange: (radius: number) => void;
}

const RadiusSlider: React.FC<RadiusSliderProps> = ({ onRadiusChange }) => {
  const [radius, setRadius] = useState(1000);

  const handleValueChange = (value: number) => {
    setRadius(value);
    onRadiusChange(value);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{`Search radius: ${Math.round(radius)}m`}</Text>
      <Slider
        style={styles.slider}
        minimumValue={200}
        maximumValue={1000}
        step={100}
        value={radius}
        onSlidingComplete={handleValueChange} // Change made here
        minimumTrackTintColor="#0072A8"
        maximumTrackTintColor="#0072A8"
        thumbTintColor="#0072A8"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginVertical: 10,
    backgroundColor: '#F8F8F8',
    borderRadius: 8,
  },
  slider: {
    width: "100%",
    height: 10,
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: "center",
  },
});

export default RadiusSlider;
