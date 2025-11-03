import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import { editarUsuario, getUsuarioPorId } from "../api/usuarioService";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppNavigator";

type Props = NativeStackScreenProps<RootStackParamList, "Perfil">;

export default function ProfileScreen({ navigation }: Props) {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [dni, setDni] = useState("");
  const [imagen, setImagen] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [usuarioId, setUsuarioId] = useState<number | null>(null);

  useEffect(() => {
    const cargarUsuarioLogueado = async () => {
      setLoading(true);
      setNombre("");
      setApellido("");
      setDni("");
      setImagen(null);

      try {
        const idStr = await AsyncStorage.getItem("usuarioId");
        if (!idStr) {
          Alert.alert("Error", "No hay usuario logueado");
          setLoading(false);
          return;
        }
        const id = parseInt(idStr, 10);
        setUsuarioId(id);

        const usuario = await getUsuarioPorId(id);
        if (usuario) {
          setNombre(usuario.nombre || "");
          setApellido(usuario.apellido || "");
          setDni(usuario.dni || "");
          setImagen(usuario.imagen || null);
        }
      } catch (error) {
        console.error("Error cargando usuario:", error);
        Alert.alert("Error", "No se pudieron cargar los datos del usuario");
      } finally {
        setLoading(false);
      }
    };

    cargarUsuarioLogueado();
  }, []);

  const seleccionarImagen = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result.canceled) setImagen(result.assets[0].uri);
  };

  const guardarPerfil = async () => {
    if (!usuarioId) return;

    try {
      const usuario = { nombre, apellido, dni, imagen };
      await editarUsuario(usuarioId, usuario);
      Alert.alert("Éxito", "Perfil guardado correctamente");
    } catch (error) {
      console.error("Error guardando perfil:", error);
      Alert.alert("Error", "No se pudo guardar el perfil");
    }
  };

  const cerrarSesion = async () => {
    await AsyncStorage.removeItem("usuarioId");
    await AsyncStorage.removeItem("usuarioRol");
    navigation.replace("Login");
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="black" />
      </View>
    );
  }

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
            placeholder={nombre || "Tu nombre"}
            placeholderTextColor="#999"
          />

          <Text style={styles.label}>Apellido</Text>
          <TextInput
            style={styles.input}
            value={apellido}
            onChangeText={setApellido}
            placeholder={apellido || "Tu apellido"}
            placeholderTextColor="#999"
          />

          <Text style={styles.label}>D.N.I</Text>
          <TextInput
            style={styles.input}
            value={dni}
            onChangeText={setDni}
            placeholder={dni || "Tu D.N.I"}
            placeholderTextColor="#999"
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
  background: { flex: 1, resizeMode: "cover" },
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
    fontSize: 22, fontWeight: "bold", textAlign: "center", marginBottom: 20
  },
  label: { 
    fontWeight: "bold", marginBottom: 6 
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
  },
  imageContainer: { 
    alignItems: "center"
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
    color: "#999"
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
    color: "#333"
   },
  saveButton: {
    backgroundColor: "black",
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: "center",
    marginBottom: 10,
  },
  saveText: { 
    color: "white", fontWeight: "bold", fontSize: 16 
  },
  logoutButton: {
    backgroundColor: "#d32f2f",
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: "center",
  },
  logoutText: { 
    color: "white", fontWeight: "bold", fontSize: 16 
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
});
