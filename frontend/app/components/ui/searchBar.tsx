//searchBar component -- Not yet completed and added to a any page.
import { View, TextInput } from "react-native";
import useTheme from "@/app/hooks/useTheme";
import { getStyles } from "@/app/styles";

export default function SearchBar() {
  const { theme } = useTheme(); // Use the custom hook
  const styles = getStyles(theme); // Get styles based on theme
  return (
    <View>
      <TextInput placeholder={"Search"} placeholderTextColor={"#666"} />
    </View>
  );
}
