import React, { useMemo, useState } from "react";
import {
    View,
    Text,
    Image,
    type ImageSourcePropType,
    TextInput,
    Pressable,
    StatusBar,
    ScrollView,
    StyleSheet,
    AlertButton,
    KeyboardTypeOptions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { useCustomAlert } from "../hooks/CustomAlert";
import AppImage from "../components/AppImage";
import AppButton from "../components/AppButton";

type RootStackParamList = {
    Login: undefined;
    SignUp: undefined;
    Home: undefined;
    Menu: undefined;
    MenuDetail: { menuId: string };
    Consultation: undefined;
};

type ConsultationNavigationProp = NativeStackNavigationProp<RootStackParamList, "Consultation">;

export default function Consultation() {
    const navigation = useNavigation<ConsultationNavigationProp>()

    const { showAlert } = useCustomAlert();

    return (
        <ScrollView>

        </ScrollView>
    );
}
