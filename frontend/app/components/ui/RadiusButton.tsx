import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import Slider from "@react-native-community/slider";

interface RadiusSliderProps {
  onRadiusChange: (radius: number) => void; // Called while sliding
  onRadiusChangeComplete: (radius: number) => void; // Called when sliding is complete
}

const RadiusSlider: React.FC<RadiusSliderProps> = ({
  onRadiusChange,
  onRadiusChangeComplete,
}) => {
  const [radius, setRadius] = useState(1000); // Default to 1km

  const handleValueChange = (value: number) => {
    setRadius(value);
    onRadiusChange(value); // Update radius in real-time
  };

  const handleSlidingComplete = (value: number) => {
    onRadiusChangeComplete(value); // Final update when sliding is done
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
        onSlidingComplete={handleSlidingComplete} // Final update
        minimumTrackTintColor="#1fb28a"
        maximumTrackTintColor="#d3d3d3"
        thumbTintColor="#1fb28a"
      />
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      padding: 20,
      marginVertical: 10,
      backgroundColor: '#f5f5f5',
      borderRadius: 8,
    },
    slider: {
        width: "100%",
        height: 40,
      },
  text: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: "center",
  },
});

export default RadiusSlider;