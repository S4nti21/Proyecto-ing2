import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  ImageBackground,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Picker } from "@react-native-picker/picker";
import { editarHospedaje } from "../api/hospedajesService";

export default function EditarAlojamientoScreen({ route, navigation }: any) {
  const { alojamiento } = route.params;

  const [nombre, setNombre] = useState(alojamiento?.nombre || "");
  const [tipo, setTipo] = useState(
    alojamiento?.tipoHospedaje?.id?.toString() || ""
  );
  const [direccion, setDireccion] = useState(alojamiento?.direccion || "");
  const [descripcion, setDescripcion] = useState(alojamiento?.descripcion || "");
  const [imagen, setImagen] = useState(alojamiento?.imagen || null);

  const [servicios, setServicios] = useState({
    wifi: alojamiento?.servicios?.some((s: any) => s.nombre === "Wi-Fi") || false,
    tv: alojamiento?.servicios?.some((s: any) => s.nombre === "TV") || false,
    aire: alojamiento?.servicios?.some((s: any) => s.nombre === "Aire acondicionado") || false,
    pileta: alojamiento?.servicios?.some((s: any) => s.nombre === "Pileta") || false,
    cochera: alojamiento?.servicios?.some((s: any) => s.nombre === "Cochera") || false,
    spa: alojamiento?.servicios?.some((s: any) => s.nombre === "Spa") || false,
    desayuno: alojamiento?.servicios?.some((s: any) => s.nombre === "Desayuno") || false,
  });

  const tiposAlojamiento = [
    { id: 1, nombre: "Hotel" },
    { id: 2, nombre: "Cabaña" },
    { id: 3, nombre: "Departamento" },
    { id: 4, nombre: "Hostel" },
    { id: 5, nombre: "Casa" },
  ];

  const toggleServicio = (key: keyof typeof servicios) => {
    setServicios({ ...servicios, [key]: !servicios[key] });
  };

  const seleccionarImagen = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImagen(result.assets[0].uri);
    }
  };

  const guardarCambios = async () => {
    try {
      if (!nombre || !tipo || !direccion || !descripcion) {
        alert("Por favor completá todos los campos obligatorios.");
        return;
      }
      const mapServicios: any = {
        wifi: 1,
        tv: 2,
        aire: 3,
        pileta: 4,
        cochera: 5,
        spa: 6,
        desayuno: 7,
      };

      const serviciosSeleccionados = Object.entries(servicios)
        .filter(([_, value]) => value)
        .map(([key]) => ({ id: mapServicios[key] }));

      const hospedajeEditado = {
        ...alojamiento,
        nombre,
        direccion,
        descripcion,
        imagen,
        tipoHospedaje: { id: parseInt(tipo) },
        servicios: serviciosSeleccionados,
      };

      await editarHospedaje(alojamiento.id, hospedajeEditado);
      Alert.alert("Éxito", "Alojamiento actualizado correctamente ✅");
      navigation.goBack();
    } catch (error: any) {
      console.error("Error al editar alojamiento:", error);
      Alert.alert("Error", "No se pudo actualizar el alojamiento ❌");
    }
  };

  return (
    <ImageBackground
      source={require("../assets/Fondo_cortado.jpg")}
      style={styles.background}
      blurRadius={2}
    >
      <ScrollView style={styles.container} contentContainerStyle={styles.scroll}>
        <View style={styles.card}>
          <Text style={styles.title}>Editar alojamiento</Text>

          <Text style={styles.label}>Nombre</Text>
          <TextInput style={styles.input} value={nombre} onChangeText={setNombre} />

          <Text style={styles.label}>Tipo de alojamiento</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={tipo}
              onValueChange={(itemValue) => setTipo(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="Seleccionar tipo..." value="" />
              {tiposAlojamiento.map((t) => (
                <Picker.Item key={t.id} label={t.nombre} value={t.id.toString()} />
              ))}
            </Picker>
          </View>

          <Text style={styles.label}>Dirección</Text>
          <TextInput style={styles.input} value={direccion} onChangeText={setDireccion} />

          <Text style={styles.label}>Servicios</Text>
          <View style={styles.checkboxGroup}>
            {[
              ["wifi", "Wi-Fi"],
              ["tv", "TV"],
              ["aire", "Aire acondicionado"],
              ["pileta", "Pileta"],
              ["cochera", "Cochera"],
              ["spa", "Spa"],
              ["desayuno", "Desayuno"],
            ].map(([key, label]) => (
              <TouchableOpacity
                key={key}
                style={styles.checkboxItem}
                onPress={() => toggleServicio(key as keyof typeof servicios)}
              >
                <View
                  style={[
                    styles.checkbox,
                    servicios[key as keyof typeof servicios] && styles.checked,
                  ]}
                />
                <Text>{label}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.label}>Descripción</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={descripcion}
            onChangeText={setDescripcion}
            multiline
          />

          <Text style={styles.label}>Imagen</Text>
          <TouchableOpacity style={styles.imageButton} onPress={seleccionarImagen}>
            <Text style={{ color: "#fff", fontWeight: "bold" }}>Cambiar imagen</Text>
          </TouchableOpacity>

          {imagen && <Image source={{ uri: imagen }} style={styles.imagePreview} />}

          <TouchableOpacity style={styles.saveButton} onPress={guardarCambios}>
            <Text style={styles.saveButtonText}>Guardar cambios</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1 },
  container: { flex: 1 },
  scroll: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 40,
  },
  card: {
    width: "90%",
    backgroundColor: "white",
    borderRadius: 16,
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  label: { fontWeight: "bold", marginTop: 10 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 10,
    backgroundColor: "#f9f9f9",
  },
  textArea: { height: 80, textAlignVertical: "top" },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    backgroundColor: "#f9f9f9",
    overflow: "hidden",
  },
  picker: { height: 50 },
  checkboxGroup: { flexDirection: "row", flexWrap: "wrap", gap: 10 },
  checkboxItem: { flexDirection: "row", alignItems: "center", width: "45%" },
  checkbox: { width: 18, height: 18, borderWidth: 1, borderColor: "#000", marginRight: 6 },
  checked: { backgroundColor: "#000" },
  imageButton: {
    backgroundColor: "#000",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 5,
  },
  imagePreview: { width: "100%", height: 180, marginTop: 10, borderRadius: 10 },
  saveButton: {
    backgroundColor: "#000",
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  saveButtonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 16,
  },
});
