
import React, { useEffect, useMemo, useState } from "react";
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

import { categories as dataCategories } from "../data/DataCategory";
import { meals as dataMeals } from "../data/DataMeals";
import {
    addCartItem,
    getCartItems,
    subscribeCartChanges,
    type CartItem,
} from "./Cart";

type RootStackParamList = {
    Login: undefined;
    SignUp: undefined;
    Home: undefined;
    MenuDetail: { menuId: string };
    Cart: undefined;
    Consultation: undefined;
};

type NavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    "Home"
>;

const categories = [...dataCategories];

export default function Home() {
    const navigation = useNavigation<NavigationProp>();
    const { showAlert } = useCustomAlert();

    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("All");
    const [cart, setCart] = useState<CartItem[]>(getCartItems);

    useEffect(() => {
        return subscribeCartChanges(setCart);
    }, []);

    const filteredMeals = useMemo(() => {
        return dataMeals.filter((meal) => {
            const matchCategory =
                category === "All" || meal.category === category;

            const matchSearch = meal.name
                .toLowerCase()
                .includes(search.toLowerCase());

            return matchCategory && matchSearch;
        });
    }, [search, category]);

    const addToCart = (id: string) => {
        const meal = dataMeals.find((item) => item.id === id);

        if (!meal) {
            showAlert("Cart", "Menu tidak ditemukan.");
            return;
        }

        const alreadyAdded = cart.some(
            (item) => item.meal.id === id,
        );

        if (alreadyAdded) {
            showAlert("Cart", "Menu sudah ada di cart.");
            return;
        }

        addCartItem(meal, 1);

        showAlert(
            "Added to Cart",
            "Menu berhasil ditambahkan.",
        );
    };

    const totalCartItems = cart.reduce(
        (total, item) => total + item.quantity,
        0,
    );

    return (
        <SafeAreaView style={styles.container} edges={["top"]}>
            <StatusBar barStyle="dark-content" />

            <AppNavbar
                title="NutriCare"
                subtitle="Home"
                rightIcon="bell-outline"
                onRightPress={() =>
                    showAlert(
                        "Notifications",
                        "Belum ada notifikasi.",
                    )
                }
            />

            <ScrollView
                contentContainerStyle={styles.content}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.greeting}>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.greetingTitle}>
                            Good morning
                        </Text>

                        <Text style={styles.subtitle}>
                            Ready to nourish your body today?
                        </Text>
                    </View>

                    <AppImage
                        name="avatar"
                        style={styles.avatar}
                    />
                </View>

                <View style={styles.searchBox}>
                    <MaterialCommunityIcons
                        name="magnify"
                        size={22}
                        color={appColors.secondary}
                    />

                    <TextInput
                        value={search}
                        onChangeText={setSearch}
                        placeholder="Search healthy meals..."
                        placeholderTextColor={appColors.muted}
                        style={styles.searchInput}
                    />
                </View>

                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.categories}
                >
                    {categories.map((item) => (
                        <Pressable
                            key={item}
                            onPress={() => setCategory(item)}
                            style={[
                                styles.category,
                                category === item && styles.categoryActive,
                            ]}
                        >
                            <Text
                                style={[
                                    styles.categoryText,
                                    category === item &&
                                    styles.categoryTextActive,
                                ]}
                            >
                                {item}
                            </Text>
                        </Pressable>
                    ))}
                </ScrollView>

                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>
                        Recommended for You
                    </Text>

                    <Pressable
                        onPress={() => navigation.navigate("Cart")}
                    >
                        <Text style={styles.link}>
                            See all
                        </Text>
                    </Pressable>
                </View>

                {filteredMeals.length === 0 ? (
                    <Text style={styles.emptyText}>
                        No meals found.
                    </Text>
                ) : (
                    filteredMeals.map((meal) => {
                        const isInCart = cart.some(
                            (item) => item.meal.id === meal.id,
                        );

                        return (
                            <View
                                key={meal.id}
                                style={styles.mealCard}
                            >
                                <Pressable
                                    onPress={() =>
                                        navigation.navigate("MenuDetail", {
                                            menuId: meal.id,
                                        })
                                    }
                                >
                                    <AppImage
                                        name={meal.image}
                                        style={styles.mealImage}
                                    />
                                </Pressable>

                                <View style={styles.mealContent}>
                                    <Text style={styles.mealName}>
                                        {meal.name}
                                    </Text>

                                    <Text style={styles.mealInfo}>
                                        {meal.calories} kcal · {meal.nutrition}
                                    </Text>

                                    <Text style={styles.mealCategory}>
                                        {meal.category}
                                    </Text>

                                    <View style={styles.mealBottom}>
                                        <Text style={styles.price}>
                                            {meal.price}
                                        </Text>

                                        <Pressable
                                            onPress={() =>
                                                addToCart(meal.id)
                                            }
                                            style={styles.addButton}
                                        >
                                            <MaterialCommunityIcons
                                                name={
                                                    isInCart
                                                        ? "check"
                                                        : "plus"
                                                }
                                                size={21}
                                                color={appColors.white}
                                            />
                                        </Pressable>
                                    </View>
                                </View>
                            </View>
                        );
                    })
                )}

                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>
                        Featured Specialist
                    </Text>

                    <Text style={styles.available}>
                        Available Now
                    </Text>
                </View>

                <View style={styles.specialistCard}>
                    <AppImage
                        name="specialist"
                        style={styles.specialistImage}
                    />

                    <View style={{ flex: 1 }}>
                        <Text style={styles.specialistName}>
                            Dr. Sarah Alperin, RD
                        </Text>

                        <Text style={styles.mealInfo}>
                            Clinical Dietitian
                        </Text>

                        <Text style={styles.rating}>
                            ★ 4.9 (124 reviews)
                        </Text>
                    </View>
                </View>

                <AppButton
                    title="Consult a Specialist"
                    onPress={() =>
                        navigation.navigate("Consultation")
                    }
                />

                <View style={styles.premiumCard}>
                    <MaterialCommunityIcons
                        name="crown"
                        size={30}
                        color={appColors.primary}
                    />

                    <Text style={styles.premiumTitle}>
                        NutriCare Premium
                    </Text>

                    <Text style={styles.subtitle}>
                        Unlock personalized nutrition tracking.
                    </Text>

                    <AppButton
                        title="Upgrade Now"
                        onPress={() =>
                            showAlert(
                                "Premium",
                                "Fitur Premium belum tersedia.",
                            )
                        }
                    />
                </View>
            </ScrollView>

            <View style={styles.bottomNav}>
                <BottomNavItem
                    icon="home"
                    label="Home"
                    active
                    onPress={() => { }}
                />

                <BottomNavItem
                    icon="account-heart"
                    label="Experts"
                    onPress={() =>
                        navigation.navigate("Consultation")
                    }
                />

                <BottomNavItem
                    icon="shopping"
                    label={`Cart (${totalCartItems})`}
                    onPress={() =>
                        navigation.navigate("Cart")
                    }
                />

                <BottomNavItem
                    icon="crown"
                    label="Premium"
                    onPress={() =>
                        showAlert(
                            "Premium",
                            "Fitur belum tersedia.",
                        )
                    }
                />
            </View>
        </SafeAreaView>
    );
}

type BottomNavItemProps = {
    icon: keyof typeof MaterialCommunityIcons.glyphMap;
    label: string;
    active?: boolean;
    onPress: () => void;
};

function BottomNavItem({
    icon,
    label,
    active = false,
    onPress,
}: BottomNavItemProps) {
    return (
        <Pressable
            style={styles.navItem}
            onPress={onPress}
        >
            <MaterialCommunityIcons
                name={icon}
                size={23}
                color={
                    active
                        ? appColors.primary
                        : appColors.secondary
                }
            />

            <Text
                style={[
                    styles.navLabel,
                    active && {
                        color: appColors.primary,
                    },
                ]}
            >
                {label}
            </Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: appColors.surface,
    },
    content: {
        padding: 16,
        gap: 16,
        paddingBottom: 24,
    },
    greeting: {
        flexDirection: "row",
        alignItems: "center",
    },
    greetingTitle: {
        fontSize: 20,
        fontWeight: "700",
        color: appColors.text,
    },
    subtitle: {
        fontSize: 12,
        color: appColors.secondary,
        marginTop: 4,
    },
    avatar: {
        width: 48,
        height: 48,
        borderRadius: 24,
    },
    searchBox: {
        height: 48,
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        paddingHorizontal: 14,
        backgroundColor: appColors.white,
        borderRadius: 12,
    },
    searchInput: {
        flex: 1,
        color: appColors.text,
    },
    categories: {
        flexDirection: "row",
        gap: 10,
        paddingHorizontal: 16,
    },
    category: {
        paddingVertical: 10,
        paddingHorizontal: 18,
        borderRadius: 20,
        backgroundColor: "#F0F0F0",
    },
    categoryActive: {
        backgroundColor: "#2E7D32",
    },
    categoryText: {
        fontSize: 14,
        color: "#555555",
    },
    categoryTextActive: {
        color: "#FFFFFF",
        fontWeight: "bold",
    },
    sectionHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: "700",
        color: appColors.text,
    },
    link: {
        color: appColors.primary,
        fontSize: 13,
    },
    mealCard: {
        flexDirection: "row",
        padding: 12,
        gap: 12,
        borderRadius: 12,
        backgroundColor: appColors.white,
    },
    mealImage: {
        width: 100,
        height: 110,
        borderRadius: 10,
    },
    mealContent: {
        flex: 1,
        justifyContent: "space-between",
    },
    mealName: {
        fontSize: 13,
        fontWeight: "700",
        color: appColors.text,
    },
    mealInfo: {
        fontSize: 11,
        color: appColors.secondary,
        marginTop: 5,
    },
    mealCategory: {
        alignSelf: "flex-start",
        backgroundColor: appColors.input,
        color: appColors.primary,
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 10,
        fontSize: 10,
        marginTop: 5,
    },
    mealBottom: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 8,
    },
    price: {
        fontSize: 16,
        fontWeight: "700",
        color: appColors.text,
    },
    addButton: {
        width: 34,
        height: 34,
        borderRadius: 18,
        backgroundColor: appColors.primary,
        alignItems: "center",
        justifyContent: "center",
    },
    emptyText: {
        textAlign: "center",
        color: appColors.secondary,
        padding: 24,
    },
    available: {
        color: appColors.primary,
        fontSize: 11,
        fontWeight: "600",
    },
    specialistCard: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
        padding: 12,
        backgroundColor: appColors.white,
        borderRadius: 12,
    },
    specialistImage: {
        width: 60,
        height: 60,
        borderRadius: 12,
    },
    specialistName: {
        fontWeight: "700",
        color: appColors.text,
        fontSize: 13,
    },
    rating: {
        color: "#d69b24",
        fontSize: 11,
        marginTop: 5,
    },
    premiumCard: {
        backgroundColor: appColors.primaryFixed,
        padding: 18,
        borderRadius: 14,
        gap: 10,
    },
    premiumTitle: {
        fontSize: 16,
        fontWeight: "700",
        color: appColors.text,
    },
    bottomNav: {
        height: 64,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        backgroundColor: appColors.white,
        borderTopWidth: 1,
        borderTopColor: appColors.border,
    },
    navItem: {
        flex: 1,
        alignItems: "center",
        gap: 3,
    },
    navLabel: {
        fontSize: 10,
        color: appColors.secondary,
    },
});
