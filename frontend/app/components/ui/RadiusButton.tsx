import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import Slider from "@react-native-community/slider";

interface RadiusSliderProps {
  onRadiusChange: (radius: number) => void; // Called while sliding
}

const RadiusSlider: React.FC<RadiusSliderProps> = ({ onRadiusChange }) => {
  const [radius, setRadius] = useState(500); //Default changed to 500 to adhere to acceptance criteria

  const handleValueChange = (value: number) => {
    setRadius(value);
    onRadiusChange(value); // Update radius in real-time
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
        onValueChange={handleValueChange} // Real-time updates
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
    backgroundColor: "#F8F8F8",
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
