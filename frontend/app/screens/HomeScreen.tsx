import {StyleSheet, Text, View } from "react-native";
import StatusBar from "./components/StatusBar";


export default function HomeScreen(){
  return (

  <View
      style={styles.container}>

      <Text> Edit app/index.tsx to edit this screen.</Text>
      <View>
      </View>


    </View>
  );
}

const styles = StyleSheet.create({
  container: {
        flex: 1,
        flexDirection:'column',
        backgroundColor :'#fff',
        justifyContent: "center",
        alignItems: "center",
  },
});