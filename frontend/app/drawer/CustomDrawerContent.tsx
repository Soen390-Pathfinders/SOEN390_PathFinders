import { View, Text, Pressable } from "react-native";
import React from "react";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { DrawerActions } from "@react-navigation/native";
import { useNavigation } from '@react-navigation/native';
import Fontisto from "@expo/vector-icons/Fontisto";
import AppLogo from "../components/ui/AppLogo";

export default function CustomDrawerContent(props: any) {
  // ✅ Always call React Hooks unconditionally at the top level
  const defaultNavigation = useNavigation();
  const navigation = props.testNavigation ?? defaultNavigation;

  const closeDrawer = () => {
    navigation.dispatch(DrawerActions.closeDrawer());
  };

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View style={{ padding: 20, alignContent: "center" }}>
          <Pressable onPress={closeDrawer} accessibilityRole="button">
            <Fontisto name="close" size={24} color="black" />
          </Pressable>
          <View style={{ paddingTop: 20, paddingBottom: 10 }}>
            <AppLogo />
            <Text>Campus Pilot</Text>
          </View>
        </View>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
    </View>
  );
}
