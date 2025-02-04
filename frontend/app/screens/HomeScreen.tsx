import { StyleSheet, Text, View, TextInput } from "react-native";
import OutdoorMap from "../components/maps/OutdoorMap";
import { StatusBar } from "expo-status-bar";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      {/* Adding the status bar on top of the screen */}
      <View>
        <StatusBar style="dark" />
      </View>
      <View style={styles.iconRow}>
        <View>
          {/*Place holder for Hamburger menu*/}
          <Text>Hamburger</Text>
        </View>
        <View>
          {/*Place holder for app Title menu*/}
          <Text>Campus Pilot Logo</Text>
        </View>
        <View>
          {/*Place holder for Dark Button menu*/}
          <Text>DarkButton</Text>
        </View>
      </View>

      {/*SearchBar*/}
      <View style={styles.searchBar}>
        <TextInput placeholder={"Search"} placeholderTextColor={"#666"} />
      </View>
      {/*Campus Map*/}
      <View style={styles.mapContainer}>
        <OutdoorMap />
      </View>
    </View>
  );
}
{
  /*Styles for the views*/
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    width: "100%",
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  searchBar: {
    /* position: 'absolute', top: 10, width: '100%' */
    borderRadius: 10,
    margin: 10,
    width: "60%",
    color: "#000",
    borderColor: "#666",
    backgroundColor: "#FFF",
    borderWidth: 1,
    flex: 1,
    paddingHorizontal: 10,
    fontSize: 18,
  },
  iconRow: {
    width: "100%",
    flex: 1,
    borderWidth: 2,
    borderColor: "red",
    borderRadius: 10,
    flexDirection: "row",
  },
  mapContainer: {
    flex: 6,
    width: "100%",
    borderWidth: 2,
    borderColor: "red",
    borderRadius: 10,
  },
});
