import React, { useMemo, useState } from "react";
import {
    View,
    Text,
    Pressable,
    StatusBar,
    ScrollView,
    StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RouteProp } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import AppNavbar from "../components/AppNavbar";
import AppImage from "../components/AppImage";
import { appColors } from "../components/colors";
import { useCustomAlert } from "../hooks/CustomAlert";
import { meals as dataMeals } from "../data/DataMeals";
import { addCartItem } from "./Cart";

type RootStackParamList = {
    Home: undefined;
    MenuDetail: { menuId: string };
    Cart: undefined;
};

type MenuDetailRouteProp = RouteProp<RootStackParamList, "MenuDetail">;
type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const mealDetails: Record<string, {
    description: string;
    time: string;
    protein: number;
    carbs: number;
    fats: number;
    serving: string;
    ingredients: string[];
    highlights: string[];
}> = {
    "1": {
        description: "Tender grilled chicken breast on a bed of fluffy tri-color quinoa, accompanied by creamy avocado, fresh cucumbers, cherry tomatoes, and a light lemon-oregano vinaigrette.",
        time: "15–20 min",
        protein: 38,
        carbs: 42,
        fats: 18,
        serving: "420g bowl",
        ingredients: [
            "Grilled chicken breast",
            "Tri-color quinoa",
            "Haas avocado",
            "Cherry tomatoes",
            "Persian cucumbers",
            "Sheep feta",
            "Olive oil",
            "Fresh herbs & lemon",
        ],
        highlights: ["Low Sodium", "High Fiber", "Heart Healthy"],
    },
    "2": {
        description: "A nourishing Norwegian salmon fillet served with fresh herbs and wholesome sides. A balanced meal rich in protein and healthy fats.",
        time: "20–25 min",
        protein: 42,
        carbs: 34,
        fats: 22,
        serving: "400g plate",
        ingredients: [
            "Norwegian salmon",
            "Brown rice",
            "Steamed broccoli",
            "Asparagus",
            "Lemon",
            "Olive oil",
            "Fresh dill",
        ],
        highlights: ["High Protein", "Omega-3", "Heart Healthy"],
    },
    "3": {
        description: "A refreshing acai bowl blended with antioxidant-rich berries, topped with banana, chia seeds, and crunchy granola for a naturally energizing meal.",
        time: "10–15 min",
        protein: 8,
        carbs: 56,
        fats: 12,
        serving: "350g bowl",
        ingredients: [
            "Acai berry",
            "Strawberries",
            "Blueberries",
            "Banana",
            "Chia seeds",
            "Granola",
            "Almond milk",
        ],
        highlights: ["Vegan", "Antioxidants", "High Fiber"],
    },
};

export default function MenuDetail() {
    const navigation = useNavigation<NavigationProp>();
    const route = useRoute<MenuDetailRouteProp>();
    const { showAlert } = useCustomAlert();

    const [quantity, setQuantity] = useState(1);
    const [isFavorite, setIsFavorite] = useState(false);

    const meal = useMemo(
        () =>
            dataMeals.find(
                (item) => item.id === route.params?.menuId,
            ) ?? dataMeals[0],
        [route.params?.menuId],
    );

    const detail = mealDetails[meal.id] ?? mealDetails["1"];
    const unitPrice =
        Number(meal.price.replace(/[^0-9.]/g, "")) || 0;
    const totalPrice = (unitPrice * quantity).toFixed(2);

    const handleAddToCart = () => {
        addCartItem(meal, quantity);

        showAlert(
            "Added to Cart",
            `${quantity} serving(s) of ${meal.name} added to your cart.`,
            [
                {
                    text: "Continue Shopping",
                    style: "cancel",
                },
                {
                    text: "View Cart",
                    onPress: () => navigation.navigate("Cart"),
                },
            ],
        );
    };

    return (
        <SafeAreaView style={styles.safeArea} edges={["top"]}>
            <StatusBar barStyle="dark-content" />

            <AppNavbar
                title="Meal Detail"
                onBack={() => navigation.goBack()}
                rightIcon="share-variant-outline"
                onRightPress={() =>
                    showAlert(
                        "Share Meal",
                        "Meal sharing is not available yet.",
                    )
                }
            />

            <View style={styles.page}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.scrollContent}
                >
                    <View style={styles.hero}>
                        <AppImage
                            name={meal.image}
                            style={styles.heroImage}
                        />

                        <View style={styles.freshBadge}>
                            <MaterialCommunityIcons
                                name="leaf"
                                size={15}
                                color={appColors.primary}
                            />
                            <Text style={styles.freshText}>
                                Freshly Prepared
                            </Text>
                        </View>

                        <Pressable
                            onPress={() =>
                                setIsFavorite((value) => !value)
                            }
                            style={styles.favoriteButton}
                        >
                            <MaterialCommunityIcons
                                name={
                                    isFavorite
                                        ? "heart"
                                        : "heart-outline"
                                }
                                size={22}
                                color={
                                    isFavorite
                                        ? "#a8302f"
                                        : appColors.secondary
                                }
                            />
                        </Pressable>
                    </View>

                    <View style={styles.content}>
                        <View style={styles.badges}>
                            <Text style={styles.categoryBadge}>
                                {meal.category}
                            </Text>

                            <View style={styles.timeBadge}>
                                <MaterialCommunityIcons
                                    name="clock-outline"
                                    size={14}
                                    color={appColors.secondary}
                                />
                                <Text style={styles.timeText}>
                                    {detail.time}
                                </Text>
                            </View>
                        </View>

                        <Text style={styles.mealName}>
                            {meal.name}
                        </Text>

                        <View style={styles.priceRow}>
                            <Text style={styles.price}>
                                {meal.price}
                            </Text>
                            <Text style={styles.perServing}>
                                per serving
                            </Text>
                        </View>

                        <Text style={styles.description}>
                            {detail.description}
                        </Text>

                        <View style={styles.highlights}>
                            {detail.highlights.map((item) => (
                                <View
                                    key={item}
                                    style={styles.highlightPill}
                                >
                                    <MaterialCommunityIcons
                                        name="check-circle"
                                        size={14}
                                        color={appColors.primary}
                                    />
                                    <Text style={styles.highlightText}>
                                        {item}
                                    </Text>
                                </View>
                            ))}
                        </View>

                        <View style={styles.section}>
                            <View style={styles.sectionHeader}>
                                <Text style={styles.sectionTitle}>
                                    Nutrition Metrics
                                </Text>
                                <Text style={styles.sectionCaption}>
                                    Per {detail.serving}
                                </Text>
                            </View>

                            <View style={styles.metricsGrid}>
                                <NutritionMetric
                                    label="Calories"
                                    value={String(meal.calories)}
                                    unit="kcal"
                                    icon="fire"
                                    progress={0.72}
                                />

                                <NutritionMetric
                                    label="Protein"
                                    value={String(detail.protein)}
                                    unit="g"
                                    icon="dumbbell"
                                    progress={detail.protein / 50}
                                />

                                <NutritionMetric
                                    label="Carbs"
                                    value={String(detail.carbs)}
                                    unit="g"
                                    icon="grain"
                                    progress={detail.carbs / 100}
                                />

                                <NutritionMetric
                                    label="Fats"
                                    value={String(detail.fats)}
                                    unit="g"
                                    icon="water"
                                    progress={detail.fats / 65}
                                />
                            </View>
                        </View>

                        <View style={styles.section}>
                            <View style={styles.sectionHeader}>
                                <Text style={styles.sectionTitle}>
                                    Fresh Ingredients
                                </Text>
                                <Text style={styles.sectionCaption}>
                                    {detail.ingredients.length} components
                                </Text>
                            </View>

                            <View style={styles.ingredientsCard}>
                                <View style={styles.ingredientsGrid}>
                                    {detail.ingredients.map((ingredient) => (
                                        <View
                                            key={ingredient}
                                            style={styles.ingredientItem}
                                        >
                                            <View
                                                style={styles.ingredientDot}
                                            />
                                            <Text
                                                style={styles.ingredientText}
                                            >
                                                {ingredient}
                                            </Text>
                                        </View>
                                    ))}
                                </View>
                            </View>
                        </View>

                        <View style={styles.verifiedCard}>
                            <View style={styles.verifiedIcon}>
                                <MaterialCommunityIcons
                                    name="check-decagram"
                                    size={21}
                                    color={appColors.primary}
                                />
                            </View>

                            <View style={styles.verifiedCopy}>
                                <Text style={styles.verifiedTitle}>
                                    NutriCare Clinical Verified
                                </Text>
                                <Text style={styles.verifiedDescription}>
                                    Nutrition information provided for meal guidance.
                                </Text>
                            </View>
                        </View>
                    </View>
                </ScrollView>

                <View style={styles.bottomBar}>
                    <View style={styles.quantityControl}>
                        <Pressable
                            onPress={() =>
                                setQuantity((value) =>
                                    Math.max(1, value - 1),
                                )
                            }
                            disabled={quantity === 1}
                            style={styles.quantityButton}
                        >
                            <MaterialCommunityIcons
                                name="minus"
                                size={18}
                                color={
                                    quantity === 1
                                        ? appColors.muted
                                        : appColors.text
                                }
                            />
                        </Pressable>

                        <Text style={styles.quantityText}>
                            {quantity}
                        </Text>

                        <Pressable
                            onPress={() =>
                                setQuantity((value) =>
                                    Math.min(10, value + 1),
                                )
                            }
                            disabled={quantity === 10}
                            style={styles.quantityButton}
                        >
                            <MaterialCommunityIcons
                                name="plus"
                                size={18}
                                color={appColors.text}
                            />
                        </Pressable>
                    </View>

                    <Pressable
                        onPress={handleAddToCart}
                        style={styles.addCartButton}
                    >
                        <MaterialCommunityIcons
                            name="shopping-outline"
                            size={20}
                            color={appColors.white}
                        />
                        <Text style={styles.addCartText}>
                            Add to Cart · ${totalPrice}
                        </Text>
                    </Pressable>
                </View>
            </View>
        </SafeAreaView>
    );
}

function NutritionMetric({
    label,
    value,
    unit,
    icon,
    progress,
}: {
    label: string;
    value: string;
    unit: string;
    icon: keyof typeof MaterialCommunityIcons.glyphMap;
    progress: number;
}) {
    return (
        <View style={styles.metricCard}>
            <View style={styles.metricTop}>
                <Text style={styles.metricLabel}>
                    {label}
                </Text>
                <MaterialCommunityIcons
                    name={icon}
                    size={18}
                    color={appColors.primary}
                />
            </View>

            <View style={styles.metricValueRow}>
                <Text style={styles.metricValue}>
                    {value}
                </Text>
                <Text style={styles.metricUnit}>
                    {unit}
                </Text>
            </View>

            <View style={styles.progressTrack}>
                <View
                    style={[
                        styles.progressFill,
                        {
                            width: `${Math.min(
                                100,
                                Math.max(0, progress * 100),
                            )}%`,
                        },
                    ]}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: appColors.surface,
    },
    page: {
        flex: 1,
        backgroundColor: appColors.surface,
    },
    scrollContent: {
        paddingBottom: 22,
    },
    hero: {
        height: 245,
        width: "100%",
        backgroundColor: appColors.input,
        position: "relative",
    },
    heroImage: {
        width: "100%",
        height: "100%",
    },
    freshBadge: {
        position: "absolute",
        top: 16,
        left: 18,
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
        backgroundColor: "rgba(255,255,255,0.94)",
        paddingHorizontal: 12,
        paddingVertical: 7,
        borderRadius: 20,
    },
    freshText: {
        color: appColors.primary,
        fontSize: 12,
        fontWeight: "600",
    },
    favoriteButton: {
        position: "absolute",
        right: 18,
        bottom: 16,
        width: 42,
        height: 42,
        borderRadius: 22,
        backgroundColor: "rgba(255,255,255,0.95)",
        alignItems: "center",
        justifyContent: "center",
    },
    content: {
        paddingHorizontal: 18,
        paddingTop: 18,
        gap: 17,
    },
    badges: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        flexWrap: "wrap",
    },
    categoryBadge: {
        color: appColors.primaryDark,
        backgroundColor: appColors.primaryFixed,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 16,
        fontSize: 11,
        fontWeight: "700",
    },
    timeBadge: {
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
        backgroundColor: "#eaefe9",
        paddingHorizontal: 9,
        paddingVertical: 5,
        borderRadius: 16,
    },
    timeText: {
        color: appColors.secondary,
        fontSize: 11,
        fontWeight: "500",
    },
    mealName: {
        color: appColors.text,
        fontSize: 25,
        lineHeight: 32,
        fontWeight: "700",
        marginTop: -8,
    },
    priceRow: {
        flexDirection: "row",
        alignItems: "baseline",
        gap: 8,
        marginTop: -11,
    },
    price: {
        color: appColors.primary,
        fontSize: 27,
        fontWeight: "700",
    },
    perServing: {
        color: appColors.secondary,
        fontSize: 12,
    },
    description: {
        color: "#414943",
        fontSize: 13,
        lineHeight: 21,
        marginTop: -5,
    },
    highlights: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 7,
        marginTop: -5,
    },
    highlightPill: {
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
        backgroundColor: "#eff5ef",
        paddingHorizontal: 10,
        paddingVertical: 7,
        borderRadius: 18,
    },
    highlightText: {
        color: appColors.secondary,
        fontSize: 11,
        fontWeight: "500",
    },
    section: {
        gap: 10,
        marginTop: 1,
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
    sectionCaption: {
        color: appColors.secondary,
        fontSize: 11,
    },
    metricsGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 10,
    },
    metricCard: {
        width: "48%",
        flexGrow: 1,
        backgroundColor: appColors.white,
        padding: 13,
        borderRadius: 15,
        gap: 5,
    },
    metricTop: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    metricLabel: {
        color: appColors.secondary,
        fontSize: 10,
        fontWeight: "700",
        letterSpacing: 0.7,
        textTransform: "uppercase",
    },
    metricValueRow: {
        flexDirection: "row",
        alignItems: "baseline",
        gap: 4,
    },
    metricValue: {
        color: appColors.text,
        fontSize: 23,
        fontWeight: "700",
    },
    metricUnit: {
        color: appColors.secondary,
        fontSize: 12,
    },
    progressTrack: {
        height: 5,
        backgroundColor: "#eaefe9",
        borderRadius: 5,
        overflow: "hidden",
        marginTop: 3,
    },
    progressFill: {
        height: "100%",
        backgroundColor: appColors.primary,
        borderRadius: 5,
    },
    ingredientsCard: {
        backgroundColor: appColors.white,
        borderRadius: 15,
        padding: 15,
    },
    ingredientsGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        rowGap: 12,
    },
    ingredientItem: {
        width: "50%",
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        paddingRight: 8,
    },
    ingredientDot: {
        width: 7,
        height: 7,
        borderRadius: 4,
        backgroundColor: appColors.primary,
    },
    ingredientText: {
        flex: 1,
        color: appColors.text,
        fontSize: 11,
    },
    verifiedCard: {
        flexDirection: "row",
        alignItems: "center",
        gap: 11,
        backgroundColor: "#eff5ef",
        borderRadius: 14,
        padding: 13,
        marginTop: 1,
    },
    verifiedIcon: {
        width: 40,
        height: 40,
        borderRadius: 22,
        backgroundColor: appColors.primaryFixed,
        alignItems: "center",
        justifyContent: "center",
    },
    verifiedCopy: {
        flex: 1,
        gap: 3,
    },
    verifiedTitle: {
        color: appColors.text,
        fontSize: 12,
        fontWeight: "700",
    },
    verifiedDescription: {
        color: appColors.secondary,
        fontSize: 11,
        lineHeight: 16,
    },
    bottomBar: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        paddingHorizontal: 17,
        paddingTop: 11,
        paddingBottom: 12,
        backgroundColor: appColors.surface,
        borderTopWidth: 1,
        borderTopColor: appColors.border,
    },
    quantityControl: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#e4eae3",
        borderRadius: 24,
        padding: 4,
    },
    quantityButton: {
        width: 34,
        height: 34,
        borderRadius: 18,
        backgroundColor: appColors.white,
        alignItems: "center",
        justifyContent: "center",
    },
    quantityText: {
        width: 30,
        textAlign: "center",
        color: appColors.text,
        fontSize: 14,
        fontWeight: "700",
    },
    addCartButton: {
        flex: 1,
        height: 46,
        borderRadius: 25,
        backgroundColor: appColors.primary,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
    },
    addCartText: {
        color: appColors.white,
        fontSize: 13,
        fontWeight: "700",
    },
});