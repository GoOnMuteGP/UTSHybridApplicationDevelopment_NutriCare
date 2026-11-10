import React from "react";
import { View, Text, Pressable, StyleSheet, type ViewStyle } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { appColors } from "./colors";

type Props = { title: string; subtitle?: string; onBack?: () => void; rightIcon?: keyof typeof MaterialCommunityIcons.glyphMap; onRightPress?: () => void; style?: ViewStyle; };

export default function AppNavbar({ title, subtitle, onBack, rightIcon, onRightPress, style }: Props) {
    return (
        <View style={[styles.container, style]}>
            {onBack ? <Pressable onPress={onBack} style={styles.iconButton} accessibilityRole="button" accessibilityLabel="Kembali"><MaterialCommunityIcons name="arrow-left" size={23} color={appColors.text} /></Pressable> : <View style={styles.logo}><MaterialCommunityIcons name="leaf" size={22} color={appColors.primary} /></View>}
            <View style={styles.heading}><Text style={styles.title}>{title}</Text>{subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}</View>
            {rightIcon ? <Pressable onPress={onRightPress} style={styles.iconButton}><MaterialCommunityIcons name={rightIcon} size={22} color={appColors.secondary} /></Pressable> : null}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { minHeight: 58, flexDirection: "row", alignItems: "center", gap: 12, paddingHorizontal: 18, },
    logo: { width: 36, height: 36, borderRadius: 11, backgroundColor: "#e8f1e8", alignItems: "center", justifyContent: "center", },
    iconButton: { width: 38, height: 38, alignItems: "center", justifyContent: "center", },
    heading: { flex: 1, },
    title: { color: appColors.text, fontSize: 17, fontWeight: "700", },
    subtitle: { color: appColors.secondary, fontSize: 11, marginTop: 2, },
});
