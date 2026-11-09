import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    Pressable,
    ScrollView,
    StyleSheet,
    Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const colors = {
    primary: "#33664b",
    secondary: "#58605c",
    surface: "#f5fbf4",
    "on-surface": "#171d19",
    "surface-container": "#eaefe9",
    "surface-container-low": "#eff5ef",
    "surface-container-high": "#e4eae3",
    "surface-container-lowest": "#ffffff",
    "on-primary": "#ffffff",
};

const spacing = {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
};

const borderRadius = {
    lg: 8,
    xl: 12,
};

const fontSize = {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 24,
};

export default function LoginScreen() {
    const navigation = useNavigation<any>();

    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignIn = () => {
        if (!email.trim() || !password) {
            Alert.alert("Login Gagal", "Email dan password wajib diisi.");
            return;
        }

        if (!/^[^\s@]+@gmail\.com$/i.test(email)) {
            Alert.alert(
                "Email Tidak Valid",
                "Email harus menggunakan @gmail.com."
            );
            return;
        }

        if (password.length <= 8) {
            Alert.alert(
                "Password Tidak Valid",
                "Password harus lebih dari 8 karakter."
            );
            return;
        }

        if (!/[0-9]/.test(password)) {
            Alert.alert(
                "Password Tidak Valid",
                "Password harus mengandung angka."
            );
            return;
        }

        if (!/[^A-Za-z0-9]/.test(password)) {
            Alert.alert(
                "Password Tidak Valid",
                "Password harus mengandung simbol."
            );
            return;
        }

        Alert.alert(
            "Login Berhasil",
            "Selamat datang di NutriCare!"
        );
    };

    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={styles.content}
            showsVerticalScrollIndicator={false}
        >
            <View style={styles.header}>
                <Text style={styles.appName}>NutriCare</Text>
                <Text style={styles.subtitle}>
                    Simple, balanced daily nutrition
                </Text>
            </View>

            <View style={styles.form}>
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Email</Text>
                    <TextInput
                        value={email}
                        onChangeText={setEmail}
                        placeholder="nama@gmail.com"
                        placeholderTextColor={colors.secondary}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        style={styles.input}
                    />
                </View>

                <View style={styles.inputGroup}>
                    <View style={styles.passwordHeader}>
                        <Text style={styles.label}>Password</Text>
                        <Pressable
                            onPress={() =>
                                Alert.alert(
                                    "Lupa Password",
                                    "Fitur lupa password belum tersedia."
                                )
                            }
                        >
                            <Text style={styles.forgotText}>Lupa?</Text>
                        </Pressable>
                    </View>

                    <View style={styles.passwordContainer}>
                        <TextInput
                            value={password}
                            onChangeText={setPassword}
                            placeholder="Masukkan password"
                            placeholderTextColor={colors.secondary}
                            secureTextEntry={!showPassword}
                            style={styles.passwordInput}
                        />

                        <Pressable
                            onPress={() => setShowPassword(!showPassword)}
                        >
                            <Text style={styles.showPassword}>
                                {showPassword ? "Sembunyikan" : "Lihat"}
                            </Text>
                        </Pressable>
                    </View>
                </View>

                <Text style={styles.verificationText}>
                    Masuk untuk melanjutkan ke NutriCare
                </Text>

                <Pressable
                    style={styles.submitButton}
                    onPress={handleSignIn}
                >
                    <Text style={styles.submitText}>Masuk</Text>
                </Pressable>

                <View style={styles.signupPrompt}>
                    <Text style={styles.signupPromptText}>
                        Belum punya akun?
                    </Text>

                    <Pressable
                        onPress={() => navigation.navigate("SignUp")}
                    >
                        <Text style={styles.signupLink}>Daftar</Text>
                    </Pressable>
                </View>
            </View>

            <View style={styles.dividerContainer}>
                <View style={styles.divider} />

                <Text style={styles.dividerText}>
                    atau lanjutkan dengan
                </Text>

                <View style={styles.divider} />
            </View>

            <View style={styles.socialContainer}>
                <Pressable style={styles.socialButton}>
                    <Text style={styles.socialText}>G  Google</Text>
                </Pressable>

                <Pressable style={styles.socialButton}>
                    <Text style={styles.socialText}>Apple</Text>
                </Pressable>
            </View>

            <Text style={styles.terms}>
                Dengan melanjutkan, kamu menyetujui{" "}
                <Text style={styles.termsLink}>
                    Ketentuan Layanan
                </Text>
                {" "}dan{" "}
                <Text style={styles.termsLink}>
                    Kebijakan Privasi
                </Text>.
            </Text>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.surface,
    },
    content: {
        width: "100%",
        maxWidth: 448,
        alignSelf: "center",
        paddingHorizontal: spacing.md,
        paddingBottom: spacing.xl,
    },
    header: {
        alignItems: "center",
        paddingTop: spacing.xl,
        paddingBottom: spacing.sm,
    },
    appName: {
        fontSize: fontSize.lg,
        fontWeight: "600",
        color: colors["on-surface"],
    },
    subtitle: {
        fontSize: fontSize.sm,
        color: colors.secondary,
        marginTop: spacing.xs,
    },
    form: {
        backgroundColor: colors["surface-container-lowest"],
        borderRadius: borderRadius.xl,
        padding: 20,
        gap: spacing.md,
        marginTop: spacing.lg,
    },
    inputGroup: {
        gap: spacing.sm,
    },
    label: {
        fontSize: fontSize.sm,
        fontWeight: "500",
        color: colors["on-surface"],
    },
    input: {
        width: "100%",
        height: 48,
        paddingHorizontal: spacing.md,
        borderRadius: borderRadius.xl,
        backgroundColor: colors["surface-container-low"],
        color: colors["on-surface"],
        fontSize: fontSize.sm,
    },
    passwordHeader: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    forgotText: {
        fontSize: fontSize.xs,
        color: colors.primary,
    },
    passwordContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: colors["surface-container-low"],
        borderRadius: borderRadius.xl,
        paddingRight: spacing.md,
    },
    passwordInput: {
        flex: 1,
        height: 48,
        paddingHorizontal: spacing.md,
        color: colors["on-surface"],
        fontSize: fontSize.sm,
    },
    showPassword: {
        color: colors.secondary,
        fontSize: fontSize.sm,
    },
    verificationText: {
        color: colors.secondary,
        fontSize: fontSize.xs,
    },
    submitButton: {
        width: "100%",
        height: 48,
        borderRadius: borderRadius.xl,
        backgroundColor: colors.primary,
        alignItems: "center",
        justifyContent: "center",
        marginTop: spacing.sm,
    },
    submitText: {
        color: colors["on-primary"],
        fontSize: fontSize.sm,
        fontWeight: "600",
    },
    signupPrompt: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 6,
        marginTop: spacing.md,
    },
    signupPromptText: {
        color: colors.secondary,
        fontSize: fontSize.sm,
    },
    signupLink: {
        color: colors.primary,
        fontSize: fontSize.sm,
        fontWeight: "600",
    },
    dividerContainer: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: spacing.sm,
        marginTop: spacing.md,
    },
    divider: {
        flex: 1,
        height: 1,
        backgroundColor: colors["surface-container-high"],
    },
    dividerText: {
        marginHorizontal: spacing.md,
        fontSize: fontSize.xs,
        color: colors.secondary,
        textTransform: "uppercase",
    },
    socialContainer: {
        flexDirection: "row",
        gap: 12,
    },
    socialButton: {
        flex: 1,
        height: 48,
        borderRadius: borderRadius.xl,
        backgroundColor: colors["surface-container-lowest"],
        alignItems: "center",
        justifyContent: "center",
    },
    socialText: {
        color: colors["on-surface"],
        fontSize: fontSize.sm,
        fontWeight: "500",
    },
    terms: {
        fontSize: fontSize.xs,
        color: colors.secondary,
        textAlign: "center",
        paddingHorizontal: spacing.md,
        lineHeight: 20,
        marginTop: spacing.lg,
    },
    termsLink: {
        color: colors["on-surface"],
        textDecorationLine: "underline",
    },
});
