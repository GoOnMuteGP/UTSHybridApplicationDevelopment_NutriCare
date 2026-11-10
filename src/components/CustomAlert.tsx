
import React, {
    createContext,
    useContext,
    useState,
    ReactNode,
} from "react";

import {
    View,
    Text,
    Pressable,
    StyleSheet,
    Modal,
} from "react-native";

interface AlertButton {
    text: string;
    onPress?: () => void;
    style?: "default" | "cancel" | "destructive";
}

interface AlertOptions {
    title: string;
    message: string;
    buttons?: AlertButton[];
}

interface AlertContextType {
    showAlert: (
        title: string,
        message: string,
        buttons?: AlertButton[]
    ) => void;
}

const AlertContext = createContext<AlertContextType | undefined>(
    undefined
);

export const useCustomAlert = () => {
    const context = useContext(AlertContext);

    if (!context) {
        throw new Error(
            "useCustomAlert harus digunakan di dalam AlertProvider"
        );
    }

    return context;
};

export function AlertProvider({
    children,
}: {
    children: ReactNode;
}) {
    const [visible, setVisible] = useState(false);
    const [options, setOptions] = useState<AlertOptions>({
        title: "",
        message: "",
        buttons: [{ text: "OK" }],
    });

    const showAlert = (
        title: string,
        message: string,
        buttons: AlertButton[] = [{ text: "OK" }]
    ) => {
        setOptions({ title, message, buttons });
        setVisible(true);
    };

    const closeAlert = () => setVisible(false);

    const handleButtonPress = (button: AlertButton) => {
        closeAlert();
        button.onPress?.();
    };

    return (
        <AlertContext.Provider value={{ showAlert }}>
            {children}

            <Modal
                visible={visible}
                transparent
                animationType="fade"
                onRequestClose={closeAlert}
            >
                <View style={styles.overlay}>
                    <View style={styles.card}>
                        <Text style={styles.title}>
                            {options.title}
                        </Text>

                        <Text style={styles.message}>
                            {options.message}
                        </Text>

                        <View style={styles.buttons}>
                            {options.buttons?.map((button, index) => (
                                <Pressable
                                    key={index}
                                    onPress={() =>
                                        handleButtonPress(button)
                                    }
                                    style={[
                                        styles.button,
                                        button.style === "cancel"
                                            ? styles.cancelButton
                                            : styles.primaryButton,
                                    ]}
                                >
                                    <Text
                                        style={[
                                            styles.buttonText,
                                            button.style === "cancel"
                                                ? styles.cancelText
                                                : styles.primaryText,
                                        ]}
                                    >
                                        {button.text}
                                    </Text>
                                </Pressable>
                            ))}
                        </View>
                    </View>
                </View>
            </Modal>
        </AlertContext.Provider>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: "rgba(15,25,18,0.45)",
        justifyContent: "center",
        alignItems: "center",
        padding: 24,
    },
    card: {
        width: "100%",
        maxWidth: 380,
        backgroundColor: "#ffffff",
        borderRadius: 20,
        padding: 24,
        gap: 16,
    },
    title: {
        fontSize: 20,
        fontWeight: "700",
        color: "#171d19",
    },
    message: {
        fontSize: 14,
        lineHeight: 22,
        color: "#58605c",
    },
    buttons: {
        flexDirection: "row",
        justifyContent: "flex-end",
        gap: 10,
        marginTop: 8,
    },
    button: {
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 12,
    },
    primaryButton: {
        backgroundColor: "#33664b",
    },
    cancelButton: {
        backgroundColor: "#eff5ef",
    },
    buttonText: {
        fontSize: 14,
        fontWeight: "600",
    },
    primaryText: {
        color: "#ffffff",
    },
    cancelText: {
        color: "#33664b",
    },
});
