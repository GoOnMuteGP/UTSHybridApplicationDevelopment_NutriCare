/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./App.{js,jsx,ts,tsx}",
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    presets: [require("nativewind/preset")],
    theme: {
        extend: {
            colors: {
                primary: "#33664b",
                "primary-dark": "#244c37",
                secondary: "#58605c",
                surface: "#f5fbf4",
                input: "#eff5ef",
                text: "#171d19",
                muted: "#87918a",
                border: "#e4eae3",
                "primary-fixed": "#b7efcc",
            },
        },
    },
    plugins: [],
};