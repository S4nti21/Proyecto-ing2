import React, { useState } from "react";
import { ImageBackground } from "react-native";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";

export default function AlojamientoDetalle({ route, navigation }: any) {
  const { alojamiento } = route.params;

  // Estados de fechas
  const [isPickerVisible, setPickerVisible] = useState(false);
  const [tipoFecha, setTipoFecha] = useState<"desde" | "hasta" | null>(null);
  const [fechaDesde, setFechaDesde] = useState<Date | null>(null);
  const [fechaHasta, setFechaHasta] = useState<Date | null>(null);

  // Mostrar y ocultar picker
  const mostrarPicker = (tipo: "desde" | "hasta") => {
    setTipoFecha(tipo);
    setPickerVisible(true);
  };

  const confirmarFecha = (date: Date) => {
    if (tipoFecha === "desde") setFechaDesde(date);
    if (tipoFecha === "hasta") setFechaHasta(date);
    setPickerVisible(false);
  };

  const formatearFecha = (date: Date | null) =>
    date ? date.toLocaleDateString() : "dd/mm/aaaa";

  return (
    <ImageBackground
      source={require("../assets/Fondo_cortado.jpg")}
      style={styles.background}
      blurRadius={3}
    >
      <View style={styles.screen}>
        {/* Contenido scrollable */}
        <ScrollView style={styles.container}>
          {/* Imagen principal */}
          <View style={styles.imageContainer}>
            <Image
              source={require("../assets/8aa8209e-5435-4a34-9c91-6e04ae1cc7f5.png")}
              style={styles.image}
              resizeMode="cover"
            />
          </View>

          {/* Contenido */}
          <View style={styles.content}>
            <Text style={styles.title}>{alojamiento.nombre}</Text>
            <Text style={styles.description}>
              Se encuentra en Boulevard Gálvez 1408, en pleno barrio Candioti. Está
              a pasos de la costanera, zonas gastronómicas y puntos emblemáticos de
              la ciudad. Los huéspedes destacan su posición estratégica para
              recorrer la ciudad caminando.
            </Text>

            <Text style={styles.sectionTitle}>¿Qué servicios tengo?</Text>
            <View style={styles.services}>
              <Text>Conexión WIFI</Text>
              <Text>Cafetería</Text>
              <Text>Piscina</Text>
              <Text>Spa</Text>
            </View>

            {/* Caja de reserva */}
            <View style={styles.box}>
              <Text style={styles.price}>${alojamiento.precio}/Noche</Text>

              <View style={styles.row}>
                {/* Fecha Desde */}
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Desde</Text>
                  <TouchableOpacity
                    style={styles.input}
                    onPress={() => mostrarPicker("desde")}
                  >
                    <Text style={styles.inputText}>
                      {formatearFecha(fechaDesde)}
                    </Text>
                  </TouchableOpacity>
                </View>

                {/* Fecha Hasta */}
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Hasta</Text>
                  <TouchableOpacity
                    style={styles.input}
                    onPress={() => mostrarPicker("hasta")}
                  >
                    <Text style={styles.inputText}>
                      {formatearFecha(fechaHasta)}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Reservar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>

        {/* Picker de fecha */}
        <DateTimePickerModal
          isVisible={isPickerVisible}
          mode="date"
          onConfirm={confirmarFecha}
          onCancel={() => setPickerVisible(false)}
          minimumDate={
            tipoFecha === "hasta" && fechaDesde ? fechaDesde : new Date()
          }
        />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
  },
  screen: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    paddingTop: StatusBar.currentHeight || 40,
  },
  container: {
    flex: 1,
    marginTop: 10,
  },
  imageContainer: {
    margin: 20,
    borderRadius: 20,
    overflow: "hidden",
    elevation: 6,
  },
  image: {
    width: "100%",
    height: 220,
  },
  content: {
    backgroundColor: "white",
    borderRadius: 16,
    marginHorizontal: 20,
    padding: 20,
    elevation: 3,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
  description: {
    color: "#444",
    fontSize: 15,
    marginBottom: 20,
  },
  sectionTitle: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 10,
  },
  services: {
    marginBottom: 25,
    gap: 5,
  },
  box: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 16,
    elevation: 5,
  },
  price: {
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  inputGroup: {
    width: "48%",
  },
  label: {
    fontSize: 14,
    color: "#444",
    marginBottom: 4,
  },
  input: {
    backgroundColor: "#f7f7f7",
    padding: 10,
    borderRadius: 8,
    color: "#888",
  },
  inputText: {
    color: "#555",
  },
  button: {
    backgroundColor: "black",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});
