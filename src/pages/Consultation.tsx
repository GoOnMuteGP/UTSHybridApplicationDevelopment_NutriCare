
import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    Pressable,
    StatusBar,
    ScrollView,
    StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import AppNavbar from "../components/AppNavbar";
import AppImage from "../components/AppImage";
import AppButton from "../components/AppButton";
import { appColors } from "../components/colors";
import { useCustomAlert } from "../hooks/CustomAlert";
import { nutritionists, dates, timeSlots } from "../data/DataConsultant";

type RootStackParamList = {
    Home: undefined;
    Consultation: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function Consultation() {
    const navigation = useNavigation<NavigationProp>();
    const { showAlert } = useCustomAlert();

    const [selectedNutritionist, setSelectedNutritionist] = useState("1");
    const [selectedDate, setSelectedDate] = useState("1");
    const [selectedTime, setSelectedTime] = useState("10:00 AM");
    const [consultationType, setConsultationType] = useState("Video Call");
    const [notes, setNotes] = useState("");

    const nutritionist = nutritionists.find(
        (item) => item.id === selectedNutritionist,
    )!;

    const handleBooking = () => {
        if (!selectedNutritionist || !selectedDate || !selectedTime) {
            showAlert(
                "Incomplete Information",
                "Please select a nutritionist, date, and time.",
            );
            return;
        }

        const date = dates.find(
            (item) => item.id === selectedDate,
        );

        showAlert(
            "Confirm Consultation",
            `Nutritionist: ${nutritionist.name}\nDate: ${date?.day}, ${date?.date}\nTime: ${selectedTime}\nType: ${consultationType}\nPrice: $${nutritionist.price}`,
            [
                {
                    text: "Cancel",
                    style: "cancel",
                },
                {
                    text: "Confirm Booking",
                    onPress: () => {
                        showAlert(
                            "Booking Successful",
                            "Your consultation booking has been confirmed. Payment and video call integration will be available soon.",
                            [
                                {
                                    text: "Done",
                                    onPress: () =>
                                        navigation.navigate("Home"),
                                },
                            ],
                        );
                    },
                },
            ],
        );
    };

    return (
        <SafeAreaView style={styles.safeArea} edges={["top"]}>
            <StatusBar barStyle="dark-content" />

            <AppNavbar
                title="Nutritionist"
                subtitle="Professional nutrition consultation"
                onBack={() => navigation.goBack()}
            />

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                <View style={styles.heroCard}>
                    <View style={styles.heroTextContainer}>
                        <Text style={styles.heroTitle}>
                            Your Health,{"\n"}Our Priority
                        </Text>

                        <Text style={styles.heroDescription}>
                            Get personalized nutrition guidance from certified
                            nutrition professionals.
                        </Text>

                        <View style={styles.heroBadge}>
                            <MaterialCommunityIcons
                                name="check-decagram"
                                size={14}
                                color={appColors.primary}
                            />

                            <Text style={styles.heroBadgeText}>
                                Certified Experts
                            </Text>
                        </View>
                    </View>

                    <AppImage
                        name="specialist"
                        style={styles.heroImage}
                    />
                </View>

                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <View>
                            <Text style={styles.sectionTitle}>
                                Choose Your Nutritionist
                            </Text>

                            <Text style={styles.sectionSubtitle}>
                                Find the right expert for your needs
                            </Text>
                        </View>
                    </View>

                    <View style={styles.nutritionistList}>
                        {nutritionists.map((item) => {
                            const selected =
                                selectedNutritionist === item.id;

                            return (
                                <Pressable
                                    key={item.id}
                                    onPress={() =>
                                        setSelectedNutritionist(item.id)
                                    }
                                    style={[
                                        styles.nutritionistCard,
                                        selected &&
                                        styles.selectedNutritionistCard,
                                    ]}
                                >
                                    <View style={styles.nutritionistImageContainer}>
                                        <AppImage
                                            name="specialist"
                                            style={styles.nutritionistImage}
                                        />
                                    </View>

                                    <View style={styles.nutritionistInfo}>
                                        <View style={styles.nameRow}>
                                            <Text style={styles.nutritionistName}>
                                                {item.name}
                                            </Text>

                                            {selected && (
                                                <MaterialCommunityIcons
                                                    name="check-circle"
                                                    size={17}
                                                    color={appColors.primary}
                                                />
                                            )}
                                        </View>

                                        <Text style={styles.specialty}>
                                            {item.specialty}
                                        </Text>

                                        <Text style={styles.experience}>
                                            {item.experience}
                                        </Text>

                                        <View style={styles.ratingRow}>
                                            <MaterialCommunityIcons
                                                name="star"
                                                size={14}
                                                color="#e8a83e"
                                            />

                                            <Text style={styles.rating}>
                                                {item.rating}
                                            </Text>

                                            <Text style={styles.availability}>
                                                · {item.available}
                                            </Text>
                                        </View>
                                    </View>

                                    <View style={styles.nutritionistPrice}>
                                        <Text style={styles.price}>
                                            ${item.price}
                                        </Text>

                                        <Text style={styles.priceCaption}>
                                            / session
                                        </Text>
                                    </View>
                                </Pressable>
                            );
                        })}
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>
                        Select Date
                    </Text>

                    <Text style={styles.sectionSubtitle}>
                        Choose your preferred consultation date
                    </Text>

                    <View style={styles.dateList}>
                        {dates.map((item) => {
                            const selected = selectedDate === item.id;

                            return (
                                <Pressable
                                    key={item.id}
                                    onPress={() => setSelectedDate(item.id)}
                                    style={[
                                        styles.dateCard,
                                        selected && styles.selectedDateCard,
                                    ]}
                                >
                                    <Text
                                        style={[
                                            styles.dateDay,
                                            selected && styles.selectedDateText,
                                        ]}
                                    >
                                        {item.day}
                                    </Text>

                                    <Text
                                        style={[
                                            styles.dateNumber,
                                            selected && styles.selectedDateText,
                                        ]}
                                    >
                                        {item.date}
                                    </Text>
                                </Pressable>
                            );
                        })}
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>
                        Available Time
                    </Text>

                    <Text style={styles.sectionSubtitle}>
                        Select a suitable time slot
                    </Text>

                    <View style={styles.timeList}>
                        {timeSlots.map((time) => {
                            const selected = selectedTime === time;

                            return (
                                <Pressable
                                    key={time}
                                    onPress={() => setSelectedTime(time)}
                                    style={[
                                        styles.timeCard,
                                        selected && styles.selectedTimeCard,
                                    ]}
                                >
                                    <Text
                                        style={[
                                            styles.timeText,
                                            selected && styles.selectedTimeText,
                                        ]}
                                    >
                                        {time}
                                    </Text>
                                </Pressable>
                            );
                        })}
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>
                        Consultation Type
                    </Text>

                    <View style={styles.consultationTypeList}>
                        <Pressable
                            onPress={() =>
                                setConsultationType("Video Call")
                            }
                            style={[
                                styles.consultationTypeCard,
                                consultationType === "Video Call" &&
                                styles.selectedTypeCard,
                            ]}
                        >
                            <MaterialCommunityIcons
                                name="video-outline"
                                size={23}
                                color={appColors.primary}
                            />

                            <View style={styles.typeTextContainer}>
                                <Text style={styles.typeTitle}>
                                    Video Call
                                </Text>

                                <Text style={styles.typeDescription}>
                                    Online consultation
                                </Text>
                            </View>

                            <MaterialCommunityIcons
                                name={
                                    consultationType === "Video Call"
                                        ? "radiobox-marked"
                                        : "radiobox-blank"
                                }
                                size={20}
                                color={appColors.primary}
                            />
                        </Pressable>

                        <Pressable
                            onPress={() => setConsultationType("Chat")}
                            style={[
                                styles.consultationTypeCard,
                                consultationType === "Chat" &&
                                styles.selectedTypeCard,
                            ]}
                        >
                            <MaterialCommunityIcons
                                name="chat-outline"
                                size={23}
                                color={appColors.primary}
                            />

                            <View style={styles.typeTextContainer}>
                                <Text style={styles.typeTitle}>
                                    Chat
                                </Text>

                                <Text style={styles.typeDescription}>
                                    Text-based consultation
                                </Text>
                            </View>

                            <MaterialCommunityIcons
                                name={
                                    consultationType === "Chat"
                                        ? "radiobox-marked"
                                        : "radiobox-blank"
                                }
                                size={20}
                                color={appColors.primary}
                            />
                        </Pressable>
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>
                        Additional Notes
                    </Text>

                    <Text style={styles.sectionSubtitle}>
                        Tell the nutritionist what you want to discuss
                    </Text>

                    <TextInput
                        value={notes}
                        onChangeText={setNotes}
                        placeholder="Example: I want to improve my daily diet..."
                        placeholderTextColor={appColors.muted}
                        multiline
                        textAlignVertical="top"
                        style={styles.notesInput}
                    />
                </View>

                <View style={styles.summaryCard}>
                    <Text style={styles.summaryTitle}>
                        Consultation Summary
                    </Text>

                    <View style={styles.summaryRow}>
                        <Text style={styles.summaryLabel}>
                            Nutritionist
                        </Text>

                        <Text style={styles.summaryValue}>
                            {nutritionist.name}
                        </Text>
                    </View>

                    <View style={styles.summaryRow}>
                        <Text style={styles.summaryLabel}>
                            Consultation
                        </Text>

                        <Text style={styles.summaryValue}>
                            {consultationType}
                        </Text>
                    </View>

                    <View style={styles.summaryRow}>
                        <Text style={styles.summaryLabel}>
                            Session Fee
                        </Text>

                        <Text style={styles.summaryPrice}>
                            ${nutritionist.price.toFixed(2)}
                        </Text>
                    </View>

                    <AppButton
                        title="Book Consultation"
                        onPress={handleBooking}
                        style={styles.bookingButton}
                    />

                    <View style={styles.secureNote}>
                        <MaterialCommunityIcons
                            name="shield-check-outline"
                            size={15}
                            color={appColors.secondary}
                        />

                        <Text style={styles.secureText}>
                            Your consultation details are kept private.
                        </Text>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: appColors.surface,
    },
    scrollContent: {
        paddingHorizontal: 18,
        paddingTop: 12,
        paddingBottom: 35,
        gap: 25,
    },
    heroCard: {
        minHeight: 175,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#e7f2e6",
        borderRadius: 18,
        padding: 16,
        overflow: "hidden",
    },
    heroTextContainer: {
        flex: 1,
        gap: 9,
    },
    heroTitle: {
        color: appColors.primaryDark,
        fontSize: 22,
        lineHeight: 28,
        fontWeight: "700",
    },
    heroDescription: {
        color: appColors.secondary,
        fontSize: 11,
        lineHeight: 17,
    },
    heroBadge: {
        flexDirection: "row",
        alignItems: "center",
        alignSelf: "flex-start",
        gap: 5,
        backgroundColor: appColors.white,
        paddingHorizontal: 9,
        paddingVertical: 6,
        borderRadius: 15,
    },
    heroBadgeText: {
        color: appColors.primary,
        fontSize: 10,
        fontWeight: "600",
    },
    heroImage: {
        width: 105,
        height: 135,
        borderRadius: 12,
    },
    section: {
        gap: 10,
    },
    sectionHeader: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    sectionTitle: {
        color: appColors.text,
        fontSize: 17,
        fontWeight: "700",
    },
    sectionSubtitle: {
        color: appColors.secondary,
        fontSize: 11,
        lineHeight: 17,
    },
    nutritionistList: {
        gap: 11,
    },
    nutritionistCard: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: appColors.white,
        borderWidth: 1,
        borderColor: appColors.border,
        borderRadius: 15,
        padding: 11,
        gap: 10,
    },
    selectedNutritionistCard: {
        borderColor: appColors.primary,
        backgroundColor: "#f0f7ef",
    },
    nutritionistImageContainer: {
        width: 65,
        height: 75,
        borderRadius: 11,
        overflow: "hidden",
        backgroundColor: appColors.input,
    },
    nutritionistImage: {
        width: "100%",
        height: "100%",
    },
    nutritionistInfo: {
        flex: 1,
        gap: 4,
    },
    nameRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
    },
    nutritionistName: {
        flexShrink: 1,
        color: appColors.text,
        fontSize: 12,
        fontWeight: "700",
    },
    specialty: {
        color: appColors.primary,
        fontSize: 10,
        fontWeight: "600",
    },
    experience: {
        color: appColors.secondary,
        fontSize: 10,
    },
    ratingRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
    },
    rating: {
        color: appColors.text,
        fontSize: 10,
        fontWeight: "700",
    },
    availability: {
        color: appColors.secondary,
        fontSize: 9,
    },
    nutritionistPrice: {
        alignItems: "flex-end",
        justifyContent: "center",
    },
    price: {
        color: appColors.primary,
        fontSize: 15,
        fontWeight: "700",
    },
    priceCaption: {
        color: appColors.muted,
        fontSize: 9,
    },
    dateList: {
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 7,
        marginTop: 4,
    },
    dateCard: {
        flex: 1,
        height: 72,
        alignItems: "center",
        justifyContent: "center",
        gap: 7,
        borderRadius: 12,
        backgroundColor: appColors.white,
        borderWidth: 1,
        borderColor: appColors.border,
    },
    selectedDateCard: {
        backgroundColor: appColors.primary,
        borderColor: appColors.primary,
    },
    dateDay: {
        color: appColors.secondary,
        fontSize: 9,
        fontWeight: "600",
    },
    dateNumber: {
        color: appColors.text,
        fontSize: 18,
        fontWeight: "700",
    },
    selectedDateText: {
        color: appColors.white,
    },
    timeList: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 9,
        marginTop: 4,
    },
    timeCard: {
        width: "31%",
        minHeight: 42,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: appColors.white,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: appColors.border,
    },
    selectedTimeCard: {
        backgroundColor: appColors.primary,
        borderColor: appColors.primary,
    },
    timeText: {
        color: appColors.text,
        fontSize: 11,
        fontWeight: "600",
    },
    selectedTimeText: {
        color: appColors.white,
    },
    consultationTypeList: {
        gap: 10,
        marginTop: 3,
    },
    consultationTypeCard: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: appColors.white,
        borderWidth: 1,
        borderColor: appColors.border,
        borderRadius: 13,
        padding: 14,
        gap: 12,
    },
    selectedTypeCard: {
        borderColor: appColors.primary,
        backgroundColor: "#f0f7ef",
    },
    typeTextContainer: {
        flex: 1,
        gap: 3,
    },
    typeTitle: {
        color: appColors.text,
        fontSize: 12,
        fontWeight: "700",
    },
    typeDescription: {
        color: appColors.secondary,
        fontSize: 10,
    },
    notesInput: {
        minHeight: 100,
        backgroundColor: appColors.white,
        borderWidth: 1,
        borderColor: appColors.border,
        borderRadius: 12,
        padding: 13,
        color: appColors.text,
        fontSize: 12,
        lineHeight: 19,
    },
    summaryCard: {
        backgroundColor: appColors.white,
        borderRadius: 16,
        padding: 17,
        gap: 15,
    },
    summaryTitle: {
        color: appColors.text,
        fontSize: 17,
        fontWeight: "700",
        marginBottom: 2,
    },
    summaryRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 10,
    },
    summaryLabel: {
        color: appColors.secondary,
        fontSize: 11,
    },
    summaryValue: {
        flexShrink: 1,
        color: appColors.text,
        fontSize: 11,
        fontWeight: "600",
        textAlign: "right",
    },
    summaryPrice: {
        color: appColors.primary,
        fontSize: 16,
        fontWeight: "700",
    },
    bookingButton: {
        marginTop: 5,
    },
    secureNote: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 6,
    },
    secureText: {
        color: appColors.secondary,
        fontSize: 10,
    },
});
