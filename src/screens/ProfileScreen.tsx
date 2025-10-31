import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground,
  ScrollView,
  StatusBar,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

export default function ProfileScreen() {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [dni, setDni] = useState("");
  const [imagen, setImagen] = useState<string | null>(null);

  const seleccionarImagen = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result.canceled) setImagen(result.assets[0].uri);
  };

  const guardarPerfil = () => {
    console.log({ nombre, apellido, dni, imagen });
    alert("Perfil guardado correctamente");
  };

  const cerrarSesion = () => {
    alert("Sesión cerrada");
  };

  return (
    <ImageBackground
      source={require("../assets/Fondo_cortado.jpg")}
      style={styles.background}
      blurRadius={2}
    >

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.card}>
          <Text style={styles.title}>Editar perfil</Text>

          <Text style={styles.label}>Nombre</Text>
          <TextInput
            style={styles.input}
            value={nombre}
            onChangeText={setNombre}
            placeholder="Tu nombre"
          />

          <Text style={styles.label}>Apellido</Text>
          <TextInput
            style={styles.input}
            value={apellido}
            onChangeText={setApellido}
            placeholder="Tu apellido"
          />

          <Text style={styles.label}>D.N.I</Text>
          <TextInput
            style={styles.input}
            value={dni}
            onChangeText={setDni}
            placeholder="Tu D.N.I"
            placeholderTextColor="#888"
            keyboardType="numeric"
          />

          <Text style={styles.label}>Foto de perfil</Text>
          <View style={styles.imageContainer}>
            {imagen ? (
              <Image source={{ uri: imagen }} style={styles.profileImage} />
            ) : (
              <View style={styles.placeholder}>
                <Text style={styles.placeholderText}>Sin imagen</Text>
              </View>
            )}
          </View>

          <TouchableOpacity style={styles.uploadButton} onPress={seleccionarImagen}>
            <Text style={styles.uploadText}>
              {imagen ? "Cambiar imagen" : "Seleccionar imagen"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.saveButton} onPress={guardarPerfil}>
            <Text style={styles.saveText}>Guardar perfil</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.logoutButton} onPress={cerrarSesion}>
            <Text style={styles.logoutText}>Cerrar sesión</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
  },
  logo: {
    width: 120,
    height: 50,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    paddingTop: 50,
  },
  card: {
    width: "100%",
    maxWidth: 400,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 25,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 8,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  label: {
    fontWeight: "bold",
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
  },

  imageContainer: {
    alignItems: "center",
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: "#ccc",
    marginBottom: 10,
  },
  placeholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#eee",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 10,
  },
  placeholderText: {
    color: "#999",
  },

  uploadButton: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 12,
    alignItems: "center",
    marginBottom: 25,
    flexDirection: "row",
    justifyContent: "center",
  },
  uploadText: {
    color: "#333",
  },
  saveButton: {
    backgroundColor: "black",
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: "center",
    marginBottom: 10,
  },
  saveText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  logoutButton: {
    backgroundColor: "#d32f2f",
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: "center",
  },
  logoutText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});
