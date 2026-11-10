import React from "react";
import { Image, StyleSheet, type ImageStyle, type StyleProp } from "react-native";

const images = {
    profile: require("../../assets/home/Profile.png"),
    avatar: require("../../assets/home/Avatar.png"),
    acai: require("../../assets/home/Acai.png"),
    quinoa: require("../../assets/home/Quinoa.png"),
    salmon: require("../../assets/home/Salmon.png"),
    specialist: require("../../assets/home/Specialist.png"),
};
export type AppImageName = keyof typeof images;
type Props = { name: AppImageName; style?: StyleProp<ImageStyle>; resizeMode?: "cover" | "contain" | "stretch" | "center"; };
export default function AppImage({ name, style, resizeMode = "cover" }: Props) {
    return <Image source={images[name]} style={[styles.image, style]} resizeMode={resizeMode} />;
}
const styles = StyleSheet.create({ image: { width: 100, height: 100, }, });
