import { StyleSheet } from "react-native";

export const getStyles = (theme) =>
  StyleSheet.create({
    appTitle: {
      color: theme === "dark" ? "#000" : "#fff",
      fontSize: 24,
      fontWeight: "bold",
    },
    brightLogo: {
      height: 40,
      width: 40,
    },
    button: {
      backgroundColor: theme === "dark" ? "#555" : "#ddd",
      borderRadius: 5,
      marginTop: 20,
      padding: 10,
    },
    buttonText: {
      color: theme === "dark" ? "#fff" : "#000",
      fontSize: 16,
    },
    container: {
      alignItems: "center",
      backgroundColor: theme === "dark" ? "#fff" : "#000",
      flex: 1,
      flexDirection: "column",
      justifyContent: "center",
      width: "100%",
    },
    drawerBackground: {
      backgroundColor: theme === "dark" ? "#000" : "#ff",
    },
    drawerContainer: {
      flex: 1,
      padding: 20,
    },
    drawerItem: {
      borderRadius: 5,
      marginVertical: 10,
      padding: 15,
    },
    drawerItemBackground: {
      backgroundColor: theme === "dark" ? "#000" : "#fff",
    },
    drawerItemText: {
      fontSize: 18,
    },
    drawerItemTextColor: {
      color: theme === "dark" ? "#fff" : "#000",
    },
    iconRow: {
      alignContent: "space-around",
      alignItems: "center",
      flex: 1,
      flexDirection: "row",
      justifyContent: "space-evenly",
      padding: 20,
      width: "100%",
    },
    iconRowView: {
      flex: 1,
    },
    logo: {
      alignItems: "center",
      color: theme === "dark" ? "#000" : "#fff",
      fontSize: 30,
      fontWeight: "bold",
      justifyContent: "space-around",
      padding: 10,
    },
    mapContainer: {
      borderRadius: 10,
      flex: 2,
      width: "100%",
    },
    navLogo: {
      height: 40,
      width: 40,
    },
    placeholderText: {
      color: "#666",
      fontSize: 12,
    },

    text: {
      color: theme === "dark" ? "#fff" : "#000",
      fontSize: 12,
    },
  });
