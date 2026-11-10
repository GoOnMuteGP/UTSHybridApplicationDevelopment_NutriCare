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
import { MaterialCommunityIcons } from "@expo/vector-icons";

import AppNavbar from "../components/AppNavbar";
import AppButton from "../components/AppButton";
import AppTextInput from "../components/AppTextInput";
import { appColors } from "../components/colors";
import { useCustomAlert } from "../hooks/CustomAlert";

type RootStackParamList = {
    Login: undefined;
    SignUp: undefined;
    Home: undefined;
};

type NavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    "SignUp"
>;

export default function SignUp() {
    const navigation = useNavigation<NavigationProp>();
    const { showAlert } = useCustomAlert();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSignUp = () => {
        if (
            !name.trim() ||
            !email.trim() ||
            !password ||
            !confirmPassword
        ) {
            showAlert(
                "Registration Failed",
                "Semua field wajib diisi."
            );
            return;
        }

        const validEmail =
            /^[^\s@]+@(gmail\.com|binus\.ac\.id|yahoo\.com)$/i.test(
                email.trim()
            );

        if (!validEmail) {
            showAlert(
                "Invalid Email",
                "Gunakan Gmail, BINUS, atau Yahoo."
            );
            return;
        }

        if (password.length <= 8) {
            showAlert(
                "Invalid Password",
                "Password harus lebih dari 8 karakter."
            );
            return;
        }

        if (!/[0-9]/.test(password)) {
            showAlert(
                "Invalid Password",
                "Password harus memiliki minimal satu angka."
            );
            return;
        }

        if (!/[^A-Za-z0-9]/.test(password)) {
            showAlert(
                "Invalid Password",
                "Password harus memiliki minimal satu simbol."
            );
            return;
        }

        if (password !== confirmPassword) {
            showAlert(
                "Password Mismatch",
                "Konfirmasi password tidak cocok."
            );
            return;
        }

        showAlert(
            "Registration Successful",
            "Akun berhasil dibuat. Silakan login."
        );

        navigation.replace("Login");
    };

    return (
        <SafeAreaView style={styles.container}>
            <AppNavbar
                title="Create Account"
                subtitle="Join NutriCare"
                onBack={() => navigation.goBack()}
            />

            <ScrollView
                contentContainerStyle={styles.content}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.header}>
                    <View style={styles.logo}>
                        <MaterialCommunityIcons
                            name="account-plus-outline"
                            size={36}
                            color={appColors.primary}
                        />
                    </View>

                    <Text style={styles.title}>
                        Create Your Account
                    </Text>

                    <Text style={styles.subtitle}>
                        Start your healthy lifestyle with NutriCare.
                    </Text>
                </View>

                <View style={styles.form}>
                    <AppTextInput
                        label="Full Name"
                        placeholder="Enter your full name"
                        value={name}
                        onChangeText={setName}
                        autoCapitalize="words"
                        leadingIcon="account-outline"
                    />

                    <AppTextInput
                        label="Email Address"
                        placeholder="nama@gmail.com"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        leadingIcon="email-outline"
                    />

                    <AppTextInput
                        label="Password"
                        placeholder="Create a password"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                        leadingIcon="lock-outline"
                    />

                    <AppTextInput
                        label="Confirm Password"
                        placeholder="Confirm your password"
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        secureTextEntry
                        leadingIcon="lock-check-outline"
                    />

                    <Text style={styles.passwordInfo}>
                        Password must contain more than 8 characters,
                        at least one number and one symbol.
                    </Text>

                    <AppButton
                        title="Create Account"
                        onPress={handleSignUp}
                    />

                    <View style={styles.loginPrompt}>
                        <Text style={styles.promptText}>
                            Already have an account?
                        </Text>

                        <Pressable
                            onPress={() =>
                                navigation.navigate("Login")
                            }
                        >
                            <Text style={styles.loginLink}>
                                Sign In
                            </Text>
                        </Pressable>
                    </View>
                </View>

                <Text style={styles.terms}>
                    By creating an account, you agree to our Terms
                    of Service and Privacy Policy.
                </Text>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: appColors.surface,
    },
    content: {
        flexGrow: 1,
        width: "100%",
        maxWidth: 480,
        alignSelf: "center",
        padding: 20,
        justifyContent: "center",
    },
    header: {
        alignItems: "center",
        marginBottom: 28,
    },
    logo: {
        width: 76,
        height: 76,
        borderRadius: 24,
        backgroundColor: appColors.primaryFixed,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 18,
    },
    title: {
        fontSize: 23,
        fontWeight: "700",
        color: appColors.text,
    },
    subtitle: {
        fontSize: 12,
        color: appColors.secondary,
        marginTop: 8,
        textAlign: "center",
    },
    form: {
        backgroundColor: appColors.white,
        borderRadius: 16,
        padding: 20,
        gap: 18,
    },
    passwordInfo: {
        fontSize: 11,
        color: appColors.secondary,
        lineHeight: 17,
    },
    loginPrompt: {
        flexDirection: "row",
        justifyContent: "center",
        gap: 5,
    },
    promptText: {
        fontSize: 12,
        color: appColors.secondary,
    },
    loginLink: {
        fontSize: 12,
        fontWeight: "700",
        color: appColors.primary,
    },
    terms: {
        fontSize: 11,
        color: appColors.secondary,
        textAlign: "center",
        marginTop: 24,
        lineHeight: 18,
    },
});