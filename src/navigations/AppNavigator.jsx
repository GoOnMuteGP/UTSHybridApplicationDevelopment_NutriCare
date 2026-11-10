import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import Home from "../pages/Home";
import Menu from "../pages/Menu";
import MenuDetail from "../pages/MenuDetail";
import Consultation from "../pages/Consultation";

import { AlertProvider } from "../hooks/CustomAlert";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <AlertProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
          <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Menu" component={Menu} />
          <Stack.Screen name="MenuDetail" component={MenuDetail} />
          <Stack.Screen name="Consultation" component={Consultation} />
        </Stack.Navigator>
      </NavigationContainer>
    </AlertProvider>
  );
}