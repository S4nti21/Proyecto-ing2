import React, { useState } from "react";
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity } from "react-native";
import { colors } from "../theme/colors";
import InputField from "../components/InputField";
import CustomButton from "../components/CustomButton";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppNavigator";

type Props = NativeStackScreenProps<RootStackParamList, "Register">;

export default function RegisterScreen({ navigation }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <ImageBackground
      source={require("../assets/Fondo_cortado.jpg")}
      style={styles.bg}
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>Crear cuenta</Text>

        <InputField placeholder="Correo electrónico" value={email} onChangeText={setEmail} />
        <InputField placeholder="Contraseña" value={password} onChangeText={setPassword} secureTextEntry />

        <CustomButton title="Registrarme" onPress={() => navigation.navigate("Login")} />

        <Text style={styles.footer}>
          ¿Ya tienes una cuenta?{" "}
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={styles.link}>Inicia sesión</Text>
          </TouchableOpacity>
        </Text>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: { flex: 1 },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "center",
    padding: 25,
  },
  title: {
    color: colors.text,
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
  },
  footer: {
    color: colors.text,
    textAlign: "center",
    marginTop: 15,
  },
  link: { color: colors.accent, fontWeight: "bold" },
});
