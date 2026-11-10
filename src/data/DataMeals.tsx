
export type Meal = {
    id: string;
    name: string;
    category: string;
    calories: number;
    nutrition: string;
    price: string;
    image: "quinoa" | "salmon" | "acai";
};

export const meals: Meal[] = [
    {
        id: "1",
        name: "Mediterranean Quinoa Bowl",
        category: "High Protein",
        calories: 480,
        nutrition: "34g Carbs",
        price: "$12.50",
        image: "quinoa",
    },
    {
        id: "2",
        name: "Wild Herb Norwegian Salmon",
        category: "High Protein",
        calories: 520,
        nutrition: "42g Protein",
        price: "$15.80",
        image: "salmon",
    },
    {
        id: "3",
        name: "Antioxidant Berry Acai Bowl",
        category: "Vegan",
        calories: 340,
        nutrition: "12g Fiber",
        price: "$9.50",
        image: "acai",
    },
];
