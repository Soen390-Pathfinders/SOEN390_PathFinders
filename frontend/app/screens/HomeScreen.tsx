import {StyleSheet, Text, View, TextInput } from "react-native";
import OutdoorMap from '../components/maps/OutdoorMap';
import { StatusBar } from 'expo-status-bar';

export default function HomeScreen(){
  return (

  <View
      style={styles.container}>
      {/* Adding the status bar on top of the screen */}
      <View ><StatusBar style="dark" /></View>
    <View style={styles.iconRow}>
        <View><Text>Hamburger</Text></View>
         <View><Text>Campus Pilot Logo</Text></View>
          <View><Text>DarkButton</Text></View>
    </View>
      <View
        style = {styles.searchBar}>
        <TextInput
                    placeholder={'Search'}
                    placeholderTextColor={'#666'}/>
      </View>
      <View style = {styles.mapContainer}>
      <OutdoorMap />


      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
        flex: 1,
        flexDirection:'column',
        width: '100%',
        backgroundColor :'#fff',
        justifyContent: "center",
        alignItems: "center",
  },
  searchBar: {
       /* position: 'absolute', top: 10, width: '100%' */
              borderRadius: 10,
              margin: 10,
              width: '60%',
              color: '#000',
              borderColor: '#666',
              backgroundColor: '#FFF',
              borderWidth: 1,
              flex:1,
              paddingHorizontal: 10,
              fontSize: 18,
              borderWidth: 2, borderColor: 'red', borderRadius: 10,
        },
    iconRow: {
        width: '100%',
              flex: 1,
               borderWidth: 2, borderColor: 'red', borderRadius: 10,
               flexDirection : 'row',
        },
    mapContainer: {
        flex:6,
        width: '100%',
        borderWidth: 2, borderColor: 'red', borderRadius: 10,
        }
});