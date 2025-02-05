import { StyleSheet, Text, View, TextInput, Image } from "react-native";
import OutdoorMap from "../components/maps/OutdoorMap";
import { StatusBar } from "expo-status-bar";
import AppLogo from "../components/AppLogo";

export default function OutdoorNav() {
  return (
    <View style={styles.container}>
      {/* Adding the status bar on top of the screen */}
      <View>
        <StatusBar style="dark" />
      </View>
      <View style={styles.iconRow}>
        <View style={styles.iconRowView}>
          <AppLogo />
        </View>
        <View>
          <Text style={(styles.iconRowView, styles.logo)}>Campus Pilot</Text>
        </View>
        <View style={styles.iconRowView}>
          <Image
            style={styles.brightLogo}
            source={require("../../assets/images/brightness.png")}
          />
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
  appTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  container: {
    flex: 1,
    flexDirection: "column",
    width: "100%",
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  brightLogo: {
    width: 40,
    height: 40,
  },
  searchBar: {
    /* position: 'absolute', top: 10, width: '100%' */
    borderRadius: 30,
    margin: 10,
    width: "95%",
    color: "#000",
    borderColor: "#666",
    backgroundColor: "#EFF2F4",
    borderWidth: 0,
    flex: 1,
    paddingHorizontal: 10,
    fontSize: 18,
  },
  iconRow: {
    width: "100%",
    flex: 1,
    /*borderRadius: 10,*/
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    alignContent: "space-around",
    padding: 20,
  },
  iconRowView: {
    flex: 1,
  },
  mapContainer: {
    flex: 10,
    width: "100%",
    borderRadius: 10,
  },
  logo: {
    fontSize: 30,
    fontWeight: "bold",
    justifyContent: "space-around",
    padding: 10,
    alignItems: "center",
  },
});
