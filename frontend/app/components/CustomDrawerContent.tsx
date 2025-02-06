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

export default function CustomDrawerContent(props: any) {
  const navigation = useNavigation();
  const closeDrawer = () => {
    navigation.dispatch(DrawerActions.closeDrawer());
  };

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View style={{ padding: 20, alignContent: "center" }}>
          <Pressable onPress={closeDrawer}>
            <Fontisto name="close" size={24} color="black" />
          </Pressable>
        </View>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
    </View>
  );
}
