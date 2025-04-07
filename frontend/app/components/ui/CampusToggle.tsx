import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

const CampusButton = ({ label, isActive, onPress }) => (
  <TouchableOpacity
    style={[
      styles.campusButton,
      isActive ? styles.activeButton : styles.inactiveButton,
    ]}
    onPress={onPress}
  >
    <Text style={styles.buttonText}>{label}</Text>
  </TouchableOpacity>
);

export const CampusToggle = ({ campus, toggleCampus }) => {
  const campuses = [
    { key: "SGW", label: "SGW" },
    { key: "LOY", label: "Loyola" },
  ];

  return (
    <View style={styles.buttonContainer}>
      {campuses.map(
        (
          { key, label } //use of .map() to generate buttons
        ) => (
          <CampusButton
            key={key}
            label={label}
            isActive={campus === key}
            onPress={() => toggleCampus(key)}
          />
        )
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    position: "absolute",
    top: 130,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  campusButton: {
    padding: 10,
    borderRadius: 10,
    marginHorizontal: 10,
    width: 100,
    alignItems: "center",
    backgroundColor: "#912338",
  },
  activeButton: {
    backgroundColor: "#912338",
  },
  inactiveButton: {
    backgroundColor: "#AAAAAA",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
