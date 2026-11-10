import React, { useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet, type TextInputProps } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { appColors } from "./colors";

type Props = TextInputProps & { label: string; error?: string; leadingIcon?: keyof typeof MaterialCommunityIcons.glyphMap; };

export default function AppTextInput({ label, error, leadingIcon, secureTextEntry, style, ...inputProps }: Props) {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const isPassword = Boolean(secureTextEntry);
    return (
        <View style={styles.group}>
            <Text style={styles.label}>{label}</Text>
            <View style={[styles.field, error && styles.fieldError]}>
                {leadingIcon ? <MaterialCommunityIcons name={leadingIcon} size={19} color={appColors.secondary} /> : null}
                <TextInput {...inputProps} secureTextEntry={isPassword && !passwordVisible} placeholderTextColor={appColors.muted} style={[styles.input, style]} />
                {isPassword ? <Pressable onPress={() => setPasswordVisible((value) => !value)} hitSlop={8}><MaterialCommunityIcons name={passwordVisible ? "eye-off-outline" : "eye-outline"} size={20} color={appColors.secondary} /></Pressable> : null}
            </View>
            {error ? <Text style={styles.error}>{error}</Text> : null}
        </View>
    );
}

const styles = StyleSheet.create({
    group: { gap: 8, },
    label: { color: appColors.text, fontSize: 13, fontWeight: "600", },
    field: { minHeight: 50, flexDirection: "row", alignItems: "center", gap: 10, paddingHorizontal: 14, backgroundColor: appColors.input, borderRadius: 12, borderWidth: 1, borderColor: "transparent", },
    fieldError: { borderColor: "#c94c4c", },
    input: { flex: 1, minHeight: 48, paddingVertical: 0, color: appColors.text, fontSize: 14, },
    error: { color: "#b33b3b", fontSize: 11, },
});
