import { TouchableOpacity, Text, ActivityIndicator } from "react-native";
import { colors } from "@src/theme/colors";

export function AppButton({
  title,
  onPress,
  loading = false,
}: {
  title: string;
  onPress: () => void;
  loading?: boolean;
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={loading}
      style={{
        backgroundColor: colors.colors.surface,
        paddingVertical: 14,
        borderRadius: colors.radius.pill,
        alignItems: "center",
        opacity: loading ? 0.6 : 1,
      }}
    >
      {loading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <Text style={{ color: colors.colors.text, fontWeight: "700" }}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
}
