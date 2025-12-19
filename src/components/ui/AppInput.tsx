import { TextInput } from "react-native";
import { colors } from "@src/theme/colors";

export function AppInput(props: any) {
  return (
    <TextInput
      {...props}
      placeholderTextColor={colors.colors.textMuted}
      style={{
        backgroundColor: colors.colors.inputBg,
        borderRadius: colors.radius.pill,
        paddingVertical: 12,
        paddingHorizontal: 16,
        fontSize: 14,
      }}
    />
  );
}
