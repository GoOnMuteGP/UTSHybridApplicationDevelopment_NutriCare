import React, { useState } from "react";
import {
    View,
    Text,
    Image,
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

import { useCustomAlert } from "../components/CustomAlert";

type RootStackParamList = {
    Login: undefined;
    SignUp: undefined;
    Home: undefined;
    Menu: undefined;
    MenuDetail: { menuId: string };
    Consultation: undefined;
};

type MenuDetailNavigationProp = NativeStackNavigationProp<RootStackParamList, "MenuDetail">;

export default function MenuDetail() {
    const navigation = useNavigation<MenuDetailNavigationProp>()

    const { showAlert } = useCustomAlert();

    return (
        <ScrollView>

        </ScrollView>
    );
}
