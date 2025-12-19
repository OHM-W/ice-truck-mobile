import { View, ActivityIndicator } from "react-native";
import { colors } from "@src/theme/colors";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.colors.background,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <ActivityIndicator />
    </View>
  );
}
