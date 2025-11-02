import React, { useState } from "react";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppNavigator";
import { colors } from "../theme/colors";
import InputField from "../components/InputField";
import CustomButton from "../components/CustomButton";
import { login } from "../api/authService";

type Props = NativeStackScreenProps<RootStackParamList, "Login">;

export default function LoginScreen({ navigation }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin(): Promise<void> {
    try {
      const resultado = await login(email, password);
      if (resultado === "Usuario correcto") {
        navigation.replace("MainTabs");
      } else {
        alert(resultado);
      }
    } catch (error: any) {
      alert(error.message);
    }
  }

  return (
    <ImageBackground
      source={require("../assets/Fondo_cortado.jpg")}
      style={styles.bg}
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>Iniciar sesión</Text>

        <InputField
          placeholder="Correo electrónico"
          value={email}
          onChangeText={setEmail}
        />
        <InputField
          placeholder="Contraseña"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <CustomButton title="Ingresar" onPress={handleLogin} />

        <Text style={styles.footer}>
          ¿No tienes una cuenta?{" "}
          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <Text style={styles.link}>Regístrate aquí</Text>
          </TouchableOpacity>
        </Text>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: { flex: 1, resizeMode: "cover" },
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
