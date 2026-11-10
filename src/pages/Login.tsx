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
    "Login"
>;

export default function Login() {
    const navigation = useNavigation<NavigationProp>();
    const { showAlert } = useCustomAlert();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = () => {
        if (!email.trim() || !password) {
            showAlert(
                "Login Failed",
                "Email dan password wajib diisi."
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

        showAlert(
            "Login Successful",
            "Selamat datang di NutriCare!"
        );

        navigation.replace("Home");
    };

    return (
        <SafeAreaView style={styles.container}>
            <AppNavbar title="NutriCare" subtitle="Welcome back" />

            <ScrollView
                contentContainerStyle={styles.content}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.header}>
                    <View style={styles.logo}>
                        <MaterialCommunityIcons
                            name="leaf"
                            size={36}
                            color={appColors.primary}
                        />
                    </View>

                    <Text style={styles.title}>
                        Welcome Back!
                    </Text>

                    <Text style={styles.subtitle}>
                        Sign in to continue your healthy journey.
                    </Text>
                </View>

                <View style={styles.form}>
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
                        placeholder="Enter your password"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                        leadingIcon="lock-outline"
                    />

                    <Pressable
                        style={styles.forgotButton}
                        onPress={() =>
                            showAlert(
                                "Forgot Password",
                                "Fitur reset password belum tersedia."
                            )
                        }
                    >
                        <Text style={styles.forgotText}>
                            Forgot Password?
                        </Text>
                    </Pressable>

                    <AppButton
                        title="Sign In"
                        onPress={handleLogin}
                    />

                    <View style={styles.divider}>
                        <View style={styles.line} />
                        <Text style={styles.orText}>OR</Text>
                        <View style={styles.line} />
                    </View>

                    <AppButton
                        title="Continue with Google"
                        variant="outline"
                        onPress={() =>
                            showAlert(
                                "Google Login",
                                "Google authentication belum tersedia."
                            )
                        }
                    />

                    <AppButton
                        title="Continue with Apple"
                        variant="outline"
                        onPress={() =>
                            showAlert(
                                "Apple Login",
                                "Apple authentication belum tersedia."
                            )
                        }
                    />

                    <View style={styles.signupPrompt}>
                        <Text style={styles.promptText}>
                            Don't have an account?
                        </Text>

                        <Pressable
                            onPress={() =>
                                navigation.navigate("SignUp")
                            }
                        >
                            <Text style={styles.signupLink}>
                                Sign Up
                            </Text>
                        </Pressable>
                    </View>
                </View>

                <Text style={styles.terms}>
                    By continuing, you agree to our Terms of Service
                    and Privacy Policy.
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
        marginBottom: 32,
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
        fontSize: 25,
        fontWeight: "700",
        color: appColors.text,
    },
    subtitle: {
        fontSize: 13,
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
    forgotButton: {
        alignSelf: "flex-end",
        marginTop: -8,
    },
    forgotText: {
        color: appColors.primary,
        fontSize: 12,
        fontWeight: "600",
    },
    divider: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
    },
    line: {
        flex: 1,
        height: 1,
        backgroundColor: appColors.border,
    },
    orText: {
        fontSize: 11,
        color: appColors.secondary,
    },
    signupPrompt: {
        flexDirection: "row",
        justifyContent: "center",
        gap: 5,
    },
    promptText: {
        fontSize: 12,
        color: appColors.secondary,
    },
    signupLink: {
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