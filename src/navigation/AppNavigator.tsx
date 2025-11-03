import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import AlojamientoDetalle from "../screens/AlojamientoDetalle";
import PanelScreen from "../screens/PanelScreen";
import AgregarAlojamientoScreen from "../screens/AgregarAlojamientoScreen";
import EditarAlojamientoScreen from "../screens/EditarAlojamientoScreen";
import ReservasScreen from "../screens/ReservasScreen";
export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  MainTabs: undefined;
  ReservasTabs: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();
function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;
          if (route.name === "Home") iconName = "home-outline";
          else if (route.name === "Panel") iconName = "settings-outline";
          else iconName = "Perfil" ? "person-outline" : "alert-circle-outline";
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "black",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Panel" component={PanelScreen} />
      <Tab.Screen name="Perfil" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
function ReservasTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;
          if (route.name === "Home") iconName = "home-outline";
          else if (route.name === "MisReservas") iconName = "calendar-outline";
          else if (route.name === "Perfil") iconName = "person-outline";
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "black",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Mis Reservas" component={ReservasScreen} />
      <Tab.Screen name="Perfil" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="MainTabs" component={MainTabs} />
        <Stack.Screen name="ReservasTabs" component={ReservasTabs} />
        <Stack.Screen name="AlojamientoDetalles" component={AlojamientoDetalle} />
        <Stack.Screen name="PanelScreen" component={PanelScreen} />
        <Stack.Screen name="AgregarAlojamientoScreen" component={AgregarAlojamientoScreen} />
        <Stack.Screen name="EditarAlojamientoScreen" component={EditarAlojamientoScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
