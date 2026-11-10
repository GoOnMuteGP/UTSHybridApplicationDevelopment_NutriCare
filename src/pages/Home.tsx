
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
        <SafeAreaView className="flex-1 bg-surface" edges={["top"]}>
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
                contentContainerClassName="p-4 pb-6 gap-4"
                showsVerticalScrollIndicator={false}
            >
                {/* Greeting */}
                <View className="flex-row items-center">
                    <View className="flex-1">
                        <Text className="text-xl font-bold text-text">
                            Good morning
                        </Text>

                        <Text className="text-xs text-secondary mt-1">
                            Ready to nourish your body today?
                        </Text>
                    </View>

                    <AppImage
                        name="avatar"
                        className="w-12 h-12 rounded-full"
                        style={{ width: 48, height: 48, borderRadius: 24 }}
                    />
                </View>

                {/* Search */}
                <View className="h-12 flex-row items-center gap-2.5 px-3.5 bg-white rounded-xl">
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
                        className="flex-1 text-text"
                    />
                </View>

                {/* Categories */}
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerClassName="flex-row gap-2.5 px-4"
                >
                    {categories.map((item) => (
                        <Pressable
                            key={item}
                            onPress={() => setCategory(item)}
                            className={`py-2.5 px-[18px] rounded-full ${category === item
                                    ? "bg-primary"
                                    : "bg-[#F0F0F0]"
                                }`}
                        >
                            <Text
                                className={`text-sm ${category === item
                                        ? "text-white font-bold"
                                        : "text-[#555555]"
                                    }`}
                            >
                                {item}
                            </Text>
                        </Pressable>
                    ))}
                </ScrollView>

                {/* Recommended Meals */}
                <View className="flex-row justify-between items-center">
                    <Text className="text-base font-bold text-text">
                        Recommended for You
                    </Text>

                    <Pressable
                        onPress={() => navigation.navigate("Cart")}
                    >
                        <Text className="text-primary text-[13px]">
                            See all
                        </Text>
                    </Pressable>
                </View>

                {filteredMeals.length === 0 ? (
                    <Text className="text-center text-secondary p-6">
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
                                className="flex-row p-3 gap-3 rounded-xl bg-white"
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
                                        style={{
                                            width: 100,
                                            height: 110,
                                            borderRadius: 10,
                                        }}
                                    />
                                </Pressable>

                                <View className="flex-1 justify-between">
                                    <Text className="text-[13px] font-bold text-text">
                                        {meal.name}
                                    </Text>

                                    <Text className="text-[11px] text-secondary mt-1">
                                        {meal.calories} kcal · {meal.nutrition}
                                    </Text>

                                    <Text className="self-start bg-input text-primary px-2 py-1 rounded-[10px] text-[10px] mt-1">
                                        {meal.category}
                                    </Text>

                                    <View className="flex-row justify-between items-center mt-2">
                                        <Text className="text-base font-bold text-text">
                                            {meal.price}
                                        </Text>

                                        <Pressable
                                            onPress={() => addToCart(meal.id)}
                                            className="w-[34px] h-[34px] rounded-full bg-primary items-center justify-center"
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

                {/* Featured Specialist */}
                <View className="flex-row justify-between items-center">
                    <Text className="text-base font-bold text-text">
                        Featured Specialist
                    </Text>

                    <Text className="text-primary text-[11px] font-semibold">
                        Available Now
                    </Text>
                </View>

                <View className="flex-row items-center gap-3 p-3 bg-white rounded-xl">
                    <AppImage
                        name="specialist"
                        style={{
                            width: 60,
                            height: 60,
                            borderRadius: 12,
                        }}
                    />

                    <View className="flex-1">
                        <Text className="font-bold text-text text-[13px]">
                            Dr. Sarah Alperin, RD
                        </Text>

                        <Text className="text-[11px] text-secondary mt-1">
                            Clinical Dietitian
                        </Text>

                        <Text className="text-[#d69b24] text-[11px] mt-1">
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

                {/* Premium */}
                <View className="bg-primary-fixed p-[18px] rounded-[14px] gap-2.5">
                    <MaterialCommunityIcons
                        name="crown"
                        size={30}
                        color={appColors.primary}
                    />

                    <Text className="text-base font-bold text-text">
                        NutriCare Premium
                    </Text>

                    <Text className="text-xs text-secondary">
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

            {/* Bottom Navigation */}
            <View className="h-16 flex-row justify-around items-center bg-white border-t border-border">
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
            className="flex-1 items-center gap-[3px]"
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
                className={`text-[10px] ${active ? "text-primary" : "text-secondary"
                    }`}
            >
                {label}
            </Text>
        </Pressable>
    );
}