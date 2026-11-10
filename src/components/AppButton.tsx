import React from "react";
import { ActivityIndicator, Pressable, Text, StyleSheet, type ViewStyle } from "react-native";
import { appColors } from "./colors";

type AppButtonProps = {
    title: string;
    onPress: () => void;
    variant?: "primary" | "secondary" | "outline";
    disabled?: boolean;
    loading?: boolean;
    style?: ViewStyle;
};

export default function AppButton({ title, onPress, variant = "primary", disabled = false, loading = false, style }: AppButtonProps) {
    const inactive = disabled || loading;
    return (
        <Pressable onPress={onPress} disabled={inactive} accessibilityRole="button" style={({ pressed }) => [styles.button, styles[variant], inactive && styles.disabled, pressed && !inactive && styles.pressed, style]}>
            {loading ? <ActivityIndicator color={variant === "secondary" ? appColors.primaryDark : appColors.white} /> : <Text style={[styles.text, styles[`${variant}Text`]]}>{title}</Text>}
        </Pressable>
    );
}

const styles = StyleSheet.create({
    button: { minHeight: 48, borderRadius: 12, alignItems: "center", justifyContent: "center", paddingHorizontal: 16, },
    primary: { backgroundColor: appColors.primary, },
    secondary: { backgroundColor: appColors.primaryFixed, },
    outline: { backgroundColor: appColors.white, borderWidth: 1, borderColor: appColors.primary, },
    text: { fontSize: 14, fontWeight: "700", },
    primaryText: { color: appColors.white, },
    secondaryText: { color: appColors.primaryDark, },
    outlineText: { color: appColors.primary, },
    disabled: { opacity: 0.5, },
    pressed: { opacity: 0.82, },
});
