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

const colors = {
    primary: "#33664b",
    secondary: "#58605c",
    surface: "#f5fbf4",
    text: "#171d19",
    input: "#eff5ef",
    white: "#ffffff",
};
interface InputFieldProps {
    label: string;
    value: string;
    onChangeText: (text: string) => void;
    placeholder: string;
    keyboardType?: KeyboardTypeOptions;
}

type RootStackParamList = {
    Login: undefined;
    SignUp: undefined;
    Home: undefined;
    Menu: undefined;
    MenuDetail: { menuId: string };
    Consultation: undefined;
};

type SignUpNavigationProp = NativeStackNavigationProp<RootStackParamList, "SignUp">;

export default function SignUp() {
    const navigation = useNavigation<SignUpNavigationProp>()

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [birthDate, setBirthDate] = useState("");
    const [gender, setGender] = useState("");
    const [height, setHeight] = useState("");
    const [weight, setWeight] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);

    const { showAlert } = useCustomAlert();

    const handleSignUp = () => {
        if (
            !name.trim() ||
            !email.trim() ||
            !phone.trim() ||
            !birthDate.trim() ||
            !gender ||
            !height.trim() ||
            !weight.trim() ||
            !password ||
            !confirmPassword
        ) {
            showAlert("Pendaftaran Gagal", "Semua kolom wajib diisi.");
            return;
        }

        if (!/^[^\s@]+@(gmail\.com|binus\.ac\.id|yahoo\.com)$/i.test(email.trim())) {
            showAlert(
                "Email Tidak Valid",
                "Email harus menggunakan @gmail.com, @binus.ac.id, atau @yahoo.com."
            );
            return;
        }

        if (password.length <= 8) {
            showAlert("Password Tidak Valid", "Password harus lebih dari 8 karakter.");
            return;
        }

        if (!/[0-9]/.test(password)) {
            showAlert("Password Tidak Valid", "Password harus mengandung angka.");
            return;
        }

        if (!/[^A-Za-z0-9]/.test(password)) {
            showAlert("Password Tidak Valid", "Password harus mengandung simbol.");
            return;
        }

        if (password !== confirmPassword) {
            showAlert("Password Tidak Cocok", "Konfirmasi password tidak sama.");
            return;
        }

        showAlert(
            "Pendaftaran Berhasil!",
            "Akun NutriCare berhasil dibuat.",
            [
                {
                    text: "Lanjut",
                    onPress: () => navigation.navigate("Login"),
                },
            ]
        );
    };

    const InputField = ({
        label,
        value,
        onChangeText,
        placeholder,
        keyboardType = "default",
    }: InputFieldProps) => (
        <View style={styles.inputGroup}>
            <Text style={styles.label}>{label}</Text>

            <TextInput
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                placeholderTextColor={colors.secondary}
                keyboardType={keyboardType}
                autoCapitalize={
                    keyboardType === "email-address" ? "none" : "sentences"
                }
                style={styles.input}
            />
        </View>
    );

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView
                style={styles.container}
                contentContainerStyle={styles.content}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
            >
                <View style={styles.header}>
                    <View style={styles.logo}>
                        <Text style={styles.logoText}>N</Text>
                    </View>

                    <Text style={styles.appName}>NutriCare</Text>
                    <Text style={styles.subtitle}>
                        Create your personal nutrition account
                    </Text>
                </View>

                <View style={styles.form}>
                    <Text style={styles.formTitle}>Create Account</Text>
                    <Text style={styles.formSubtitle}>
                        Tell us a little about yourself
                    </Text>

                    <InputField
                        label="Full Name"
                        value={name}
                        onChangeText={setName}
                        placeholder="Enter your full name"
                    />

                    <InputField
                        label="Email Address"
                        value={email}
                        onChangeText={setEmail}
                        placeholder="name@example.com"
                        keyboardType="email-address"
                    />

                    <InputField
                        label="Phone Number"
                        value={phone}
                        onChangeText={setPhone}
                        placeholder="+62 8XX XXXX XXXX"
                        keyboardType="phone-pad"
                    />

                    <InputField
                        label="Date of Birth"
                        value={birthDate}
                        onChangeText={setBirthDate}
                        placeholder="DD/MM/YYYY"
                    />

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Gender</Text>

                        <View style={styles.genderContainer}>
                            {["Male", "Female"].map((item) => (
                                <Pressable
                                    key={item}
                                    onPress={() => setGender(item)}
                                    style={[
                                        styles.genderButton,
                                        gender === item && styles.genderActive,
                                    ]}
                                >
                                    <Text
                                        style={[
                                            styles.genderText,
                                            gender === item && styles.genderActiveText,
                                        ]}
                                    >
                                        {item}
                                    </Text>
                                </Pressable>
                            ))}
                        </View>
                    </View>

                    <View style={styles.row}>
                        <View style={styles.halfInput}>
                            <InputField
                                label="Height (cm)"
                                value={height}
                                onChangeText={setHeight}
                                placeholder="170"
                                keyboardType="numeric"
                            />
                        </View>

                        <View style={styles.halfInput}>
                            <InputField
                                label="Weight (kg)"
                                value={weight}
                                onChangeText={setWeight}
                                placeholder="65"
                                keyboardType="numeric"
                            />
                        </View>
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Password</Text>

                        <View style={styles.passwordContainer}>
                            <TextInput
                                value={password}
                                onChangeText={setPassword}
                                placeholder="More than 8 characters and contain numbers and symbols"
                                placeholderTextColor={colors.secondary}
                                secureTextEntry={!showPassword}
                                style={styles.passwordInput}
                            />

                            <Pressable onPress={() => setShowPassword(!showPassword)}>
                                <Text style={styles.showPassword}>
                                    {showPassword ? "Hide" : "Show"}
                                </Text>
                            </Pressable>
                        </View>
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Confirm Password</Text>

                        <TextInput
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                            placeholder="Re-enter your password"
                            placeholderTextColor={colors.secondary}
                            secureTextEntry={!showPassword}
                            style={styles.input}
                        />
                    </View>

                    <Pressable
                        style={styles.submitButton}
                        onPress={handleSignUp}
                    >
                        <Text style={styles.submitText}>
                            Create Account →
                        </Text>
                    </Pressable>
                </View>

                <View style={styles.footer}>
                    <Text style={styles.footerText}>
                        Already have an account?
                    </Text>

                    <Pressable onPress={() => navigation.navigate("Login")}>
                        <Text style={styles.loginText}>Log In</Text>
                    </Pressable>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: colors.surface,
    },
    container: {
        flex: 1,
    },
    content: {
        width: "100%",
        maxWidth: 448,
        alignSelf: "center",
        paddingHorizontal: 16,
        paddingBottom: 32,
    },
    header: {
        alignItems: "center",
        paddingTop: 24,
        paddingBottom: 24,
    },
    logo: {
        width: 64,
        height: 64,
        borderRadius: 16,
        backgroundColor: "#eaefe9",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 8,
    },
    logoText: {
        fontSize: 32,
        fontWeight: "700",
        color: colors.primary,
    },
    appName: {
        fontSize: 24,
        fontWeight: "600",
        color: colors.text,
    },
    subtitle: {
        fontSize: 14,
        color: colors.secondary,
        marginTop: 4,
    },
    form: {
        backgroundColor: colors.white,
        borderRadius: 16,
        padding: 20,
        gap: 16,
    },
    formTitle: {
        fontSize: 22,
        fontWeight: "700",
        color: colors.text,
    },
    formSubtitle: {
        fontSize: 14,
        color: colors.secondary,
        marginTop: -8,
        marginBottom: 8,
    },
    inputGroup: {
        gap: 8,
        flex: 1,
    },
    label: {
        fontSize: 14,
        fontWeight: "500",
        color: colors.text,
    },
    input: {
        width: "100%",
        height: 48,
        paddingHorizontal: 16,
        borderRadius: 12,
        backgroundColor: colors.input,
        color: colors.text,
        fontSize: 14,
    },
    row: {
        flexDirection: "row",
        gap: 12,
    },
    halfInput: {
        flex: 1,
    },
    genderContainer: {
        flexDirection: "row",
        gap: 8,
    },
    genderButton: {
        flex: 1,
        paddingVertical: 12,
        borderRadius: 10,
        backgroundColor: colors.input,
        alignItems: "center",
    },
    genderActive: {
        backgroundColor: colors.primary,
    },
    genderText: {
        fontSize: 13,
        color: colors.secondary,
    },
    genderActiveText: {
        color: colors.white,
        fontWeight: "600",
    },
    passwordContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: colors.input,
        borderRadius: 12,
        paddingRight: 16,
    },
    passwordInput: {
        flex: 1,
        height: 48,
        paddingHorizontal: 16,
        color: colors.text,
        fontSize: 14,
    },
    showPassword: {
        color: colors.secondary,
        fontSize: 14,
    },
    submitButton: {
        height: 48,
        borderRadius: 12,
        backgroundColor: colors.primary,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 8,
    },
    submitText: {
        color: colors.white,
        fontSize: 14,
        fontWeight: "600",
    },
    footer: {
        flexDirection: "row",
        justifyContent: "center",
        gap: 6,
        marginTop: 24,
        marginBottom: 16,
    },
    footerText: {
        color: colors.secondary,
        fontSize: 14,
    },
    loginText: {
        color: colors.primary,
        fontSize: 14,
        fontWeight: "600",
    },
});
