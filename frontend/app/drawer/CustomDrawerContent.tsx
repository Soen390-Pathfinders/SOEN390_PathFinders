//Navigation component
//This component allows use to add custom components to the navigation drawer(hamburger menu)
import { View, Text, Pressable, Image } from "react-native";
import React from "react";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { DrawerActions } from "@react-navigation/native";
import { useNavigation } from "expo-router";
import Fontisto from "@expo/vector-icons/Fontisto";
import AppLogo from "../components/ui/AppLogo";

export default function CustomDrawerContent(props: any) {
  const navigation = useNavigation();
  const closeDrawer = () => {
    navigation.dispatch(DrawerActions.closeDrawer());
  };

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View style={{ padding: 20, alignContent: "center" }}>
          {/* Adding the close icon and function to close the menu drawer*/}
          <Pressable onPress={closeDrawer}>
            <Fontisto name="close" size={24} color="black" />
          </Pressable>
          <View style={{ paddingTop: 20, paddingBottom: 10 }}>
            <AppLogo />
            <Text>Campus Pilot</Text>
          </View>
        </View>
        {/* The navigation drawer list */}
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
    </View>
  );
}
