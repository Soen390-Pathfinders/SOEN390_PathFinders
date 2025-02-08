import { StyleSheet } from "react-native";

export const getStyles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: "column",
      width: "100%",
      backgroundColor: theme === "dark" ? "#fff" : "#000",
      justifyContent: "center",
      alignItems: "center",
    },
    text: {
      color: theme === "dark" ? "#fff" : "#000",
      fontSize: 18,
    },
    button: {
      marginTop: 20,
      padding: 10,
      backgroundColor: theme === "dark" ? "#555" : "#ddd",
      borderRadius: 5,
    },
    buttonText: {
      color: theme === "dark" ? "#fff" : "#000",
      fontSize: 16,
    },
    appTitle: {
      fontSize: 24,
      fontWeight: "bold",
      color: theme === "dark" ? "#000" : "#fff",
    },

    brightLogo: {
      width: 40,
      height: 40,
    },

    placeholderText: {
      color: '#666',
      fontSize: 16,
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
    navLogo: {
      width: 40,
      height: 40,
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
      color: theme === "dark" ? "#000" : "#fff",
    },
    // Drawer styles
    drawerContainer: {
      flex: 1,
      padding: 20,
    },
    drawerItem: {
      padding: 15,
      marginVertical: 10,
      borderRadius: 5,
    },
    drawerItemText: {
      fontSize: 18,
    },
    // For the background color of the drawer
    drawerBackground: {
      backgroundColor: theme === "dark" ? "#000" : "#ff",
    },
    drawerItemBackground: {
      backgroundColor: theme === "dark" ? "#000" : "#fff",
    },
    drawerItemTextColor: {
      color: theme === "dark" ? "#fff" : "#000",
    },
  });
