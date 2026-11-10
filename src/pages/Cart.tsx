
import React, { useEffect, useState } from "react";
import {
    View,
    Text,
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
import type { Meal } from "../data/DataMeals";

type RootStackParamList = {
    Home: undefined;
    Cart: undefined;
    MenuDetail: { menuId: string };
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export type CartItem = {
    meal: Meal;
    quantity: number;
};

let cartItems: CartItem[] = [];

const cartListeners: Array<(items: CartItem[]) => void> = [];

const notifyCartChange = () => {
    cartListeners.forEach((listener) => listener([...cartItems]));
};

export const getCartItems = () => [...cartItems];

export const subscribeCartChanges = (
    listener: (items: CartItem[]) => void,
) => {
    cartListeners.push(listener);
    listener([...cartItems]);

    return () => {
        const index = cartListeners.indexOf(listener);

        if (index !== -1) {
            cartListeners.splice(index, 1);
        }
    };
};

export const addCartItem = (meal: Meal, quantity: number) => {
    const existingItem = cartItems.find(
        (item) => item.meal.id === meal.id,
    );

    if (existingItem) {
        cartItems = cartItems.map((item) =>
            item.meal.id === meal.id
                ? {
                    ...item,
                    quantity: item.quantity + quantity,
                }
                : item,
        );
    } else {
        cartItems = [...cartItems, { meal, quantity }];
    }

    notifyCartChange();
};

export const updateCartQuantity = (
    mealId: string,
    quantity: number,
) => {
    cartItems = cartItems.map((item) =>
        item.meal.id === mealId
            ? {
                ...item,
                quantity: Math.max(1, quantity),
            }
            : item,
    );

    notifyCartChange();
};

export const removeCartItem = (mealId: string) => {
    cartItems = cartItems.filter(
        (item) => item.meal.id !== mealId,
    );

    notifyCartChange();
};

export const clearCart = () => {
    cartItems = [];
    notifyCartChange();
};

export default function Cart() {
    const navigation = useNavigation<NavigationProp>();
    const { showAlert } = useCustomAlert();

    const [items, setItems] = useState<CartItem[]>(getCartItems);

    useEffect(() => {
        return subscribeCartChanges(setItems);
    }, []);

    const getPrice = (price: string) =>
        Number(price.replace(/[^0-9.]/g, "")) || 0;

    const subtotal = items.reduce(
        (total, item) =>
            total + getPrice(item.meal.price) * item.quantity,
        0,
    );

    const deliveryFee = items.length > 0 ? 2.5 : 0;
    const total = subtotal + deliveryFee;

    const totalItems = items.reduce(
        (sum, item) => sum + item.quantity,
        0,
    );

    const handleCheckout = () => {
        if (items.length === 0) {
            showAlert(
                "Your Cart Is Empty",
                "Please add some meals before checkout.",
            );
            return;
        }

        showAlert(
            "Order Confirmation",
            `Your order total is $${total.toFixed(2)}. Checkout functionality will be connected to the payment system later.`,
            [
                {
                    text: "Continue Shopping",
                    style: "cancel",
                },
                {
                    text: "Confirm",
                    onPress: () => {
                        clearCart();

                        showAlert(
                            "Order Placed",
                            "Your demo order has been placed successfully.",
                        );
                    },
                },
            ],
        );
    };

    const handleRemove = (meal: Meal) => {
        showAlert(
            "Remove Item",
            `Remove ${meal.name} from your cart?`,
            [
                {
                    text: "Cancel",
                    style: "cancel",
                },
                {
                    text: "Remove",
                    onPress: () => removeCartItem(meal.id),
                },
            ],
        );
    };

    return (
        <SafeAreaView style={styles.safeArea} edges={["top"]}>
            <StatusBar barStyle="dark-content" />

            <AppNavbar
                title="My Cart"
                subtitle={`${totalItems} item(s) in your cart`}
                onBack={() => navigation.goBack()}
            />

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {items.length === 0 ? (
                    <View style={styles.emptyContainer}>
                        <View style={styles.emptyIcon}>
                            <MaterialCommunityIcons
                                name="cart-outline"
                                size={48}
                                color={appColors.primary}
                            />
                        </View>

                        <Text style={styles.emptyTitle}>
                            Your Cart Is Empty
                        </Text>

                        <Text style={styles.emptyDescription}>
                            Looks like you haven't added any meals yet.
                            Explore our healthy meals and find something you like.
                        </Text>

                        <AppButton
                            title="Explore Meals"
                            onPress={() => navigation.navigate("Home")}
                            style={styles.exploreButton}
                        />
                    </View>
                ) : (
                    <>
                        <View style={styles.sectionHeader}>
                            <Text style={styles.sectionTitle}>
                                Order Items
                            </Text>

                            <Text style={styles.sectionCaption}>
                                {items.length} meal(s)
                            </Text>
                        </View>

                        <View style={styles.itemsContainer}>
                            {items.map((item) => {
                                const itemPrice = getPrice(
                                    item.meal.price,
                                );

                                const itemTotal =
                                    itemPrice * item.quantity;

                                return (
                                    <View
                                        key={item.meal.id}
                                        style={styles.itemCard}
                                    >
                                        <AppImage
                                            name={item.meal.image}
                                            style={styles.itemImage}
                                        />

                                        <View style={styles.itemContent}>
                                            <View style={styles.itemTitleRow}>
                                                <Text
                                                    style={styles.itemName}
                                                    numberOfLines={2}
                                                >
                                                    {item.meal.name}
                                                </Text>

                                                <Pressable
                                                    onPress={() =>
                                                        handleRemove(item.meal)
                                                    }
                                                    style={styles.removeButton}
                                                >
                                                    <MaterialCommunityIcons
                                                        name="trash-can-outline"
                                                        size={19}
                                                        color="#b54b4b"
                                                    />
                                                </Pressable>
                                            </View>

                                            <Text style={styles.itemCategory}>
                                                {item.meal.category}
                                            </Text>

                                            <Text style={styles.itemPrice}>
                                                ${itemTotal.toFixed(2)}
                                            </Text>

                                            <View style={styles.itemBottom}>
                                                <Text style={styles.unitPrice}>
                                                    ${itemPrice.toFixed(2)} / serving
                                                </Text>

                                                <View style={styles.quantityControl}>
                                                    <Pressable
                                                        onPress={() =>
                                                            updateCartQuantity(
                                                                item.meal.id,
                                                                item.quantity - 1,
                                                            )
                                                        }
                                                        disabled={item.quantity <= 1}
                                                        style={styles.quantityButton}
                                                    >
                                                        <MaterialCommunityIcons
                                                            name="minus"
                                                            size={15}
                                                            color={
                                                                item.quantity <= 1
                                                                    ? appColors.muted
                                                                    : appColors.text
                                                            }
                                                        />
                                                    </Pressable>

                                                    <Text style={styles.quantityText}>
                                                        {item.quantity}
                                                    </Text>

                                                    <Pressable
                                                        onPress={() =>
                                                            updateCartQuantity(
                                                                item.meal.id,
                                                                item.quantity + 1,
                                                            )
                                                        }
                                                        style={styles.quantityButton}
                                                    >
                                                        <MaterialCommunityIcons
                                                            name="plus"
                                                            size={15}
                                                            color={appColors.text}
                                                        />
                                                    </Pressable>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                );
                            })}
                        </View>

                        <Pressable
                            onPress={() => navigation.navigate("Home")}
                            style={styles.continueShopping}
                        >
                            <MaterialCommunityIcons
                                name="plus-circle-outline"
                                size={19}
                                color={appColors.primary}
                            />

                            <Text style={styles.continueShoppingText}>
                                Add More Meals
                            </Text>
                        </Pressable>

                        <View style={styles.summaryCard}>
                            <Text style={styles.sectionTitle}>
                                Order Summary
                            </Text>

                            <View style={styles.summaryRow}>
                                <Text style={styles.summaryLabel}>
                                    Subtotal
                                </Text>

                                <Text style={styles.summaryValue}>
                                    ${subtotal.toFixed(2)}
                                </Text>
                            </View>

                            <View style={styles.summaryRow}>
                                <Text style={styles.summaryLabel}>
                                    Delivery Fee
                                </Text>

                                <Text style={styles.summaryValue}>
                                    ${deliveryFee.toFixed(2)}
                                </Text>
                            </View>

                            <View style={styles.summaryDivider} />

                            <View style={styles.summaryRow}>
                                <Text style={styles.totalLabel}>
                                    Total
                                </Text>

                                <Text style={styles.totalValue}>
                                    ${total.toFixed(2)}
                                </Text>
                            </View>

                            <AppButton
                                title="Proceed to Checkout"
                                onPress={handleCheckout}
                                style={styles.checkoutButton}
                            />

                            <View style={styles.secureNote}>
                                <MaterialCommunityIcons
                                    name="shield-check-outline"
                                    size={15}
                                    color={appColors.secondary}
                                />

                                <Text style={styles.secureText}>
                                    Secure and safe checkout
                                </Text>
                            </View>
                        </View>
                    </>
                )}
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
        paddingTop: 18,
        paddingBottom: 35,
        flexGrow: 1,
    },
    emptyContainer: {
        flex: 1,
        minHeight: 500,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 20,
    },
    emptyIcon: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: "#e8f1e8",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 22,
    },
    emptyTitle: {
        fontSize: 21,
        fontWeight: "700",
        color: appColors.text,
        marginBottom: 9,
    },
    emptyDescription: {
        fontSize: 13,
        lineHeight: 21,
        color: appColors.secondary,
        textAlign: "center",
        marginBottom: 24,
    },
    exploreButton: {
        width: "100%",
    },
    sectionHeader: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 13,
    },
    sectionTitle: {
        fontSize: 17,
        fontWeight: "700",
        color: appColors.text,
    },
    sectionCaption: {
        fontSize: 12,
        color: appColors.secondary,
    },
    itemsContainer: {
        gap: 13,
    },
    itemCard: {
        flexDirection: "row",
        backgroundColor: appColors.white,
        borderRadius: 15,
        padding: 11,
        gap: 12,
    },
    itemImage: {
        width: 105,
        height: 125,
        borderRadius: 11,
    },
    itemContent: {
        flex: 1,
        justifyContent: "space-between",
        paddingVertical: 2,
    },
    itemTitleRow: {
        flexDirection: "row",
        alignItems: "flex-start",
        gap: 5,
    },
    itemName: {
        flex: 1,
        fontSize: 13,
        lineHeight: 18,
        fontWeight: "700",
        color: appColors.text,
    },
    removeButton: {
        padding: 3,
    },
    itemCategory: {
        fontSize: 10,
        color: appColors.secondary,
        marginTop: 3,
    },
    itemPrice: {
        fontSize: 16,
        fontWeight: "700",
        color: appColors.primary,
        marginTop: 7,
    },
    itemBottom: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 9,
    },
    unitPrice: {
        fontSize: 10,
        color: appColors.muted,
    },
    quantityControl: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#e9efe8",
        borderRadius: 20,
        padding: 3,
    },
    quantityButton: {
        width: 25,
        height: 25,
        borderRadius: 14,
        backgroundColor: appColors.white,
        alignItems: "center",
        justifyContent: "center",
    },
    quantityText: {
        minWidth: 25,
        textAlign: "center",
        fontSize: 12,
        fontWeight: "700",
        color: appColors.text,
    },
    continueShopping: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 7,
        paddingVertical: 19,
    },
    continueShoppingText: {
        color: appColors.primary,
        fontSize: 13,
        fontWeight: "600",
    },
    summaryCard: {
        backgroundColor: appColors.white,
        borderRadius: 16,
        padding: 17,
        gap: 15,
        marginTop: 5,
    },
    summaryRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    summaryLabel: {
        fontSize: 13,
        color: appColors.secondary,
    },
    summaryValue: {
        fontSize: 13,
        fontWeight: "600",
        color: appColors.text,
    },
    summaryDivider: {
        height: 1,
        backgroundColor: appColors.border,
    },
    totalLabel: {
        fontSize: 15,
        fontWeight: "700",
        color: appColors.text,
    },
    totalValue: {
        fontSize: 20,
        fontWeight: "700",
        color: appColors.primary,
    },
    checkoutButton: {
        marginTop: 3,
    },
    secureNote: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 6,
    },
    secureText: {
        fontSize: 10,
        color: appColors.secondary,
    },
});
