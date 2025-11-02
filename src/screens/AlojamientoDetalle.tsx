import React, { useState, useEffect } from "react";
import { ImageBackground, View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, StatusBar, ActivityIndicator } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";

export default function AlojamientoDetalle({ route, navigation }: any) {
  const { alojamiento } = route.params;
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const [isPickerVisible, setPickerVisible] = useState(false);
  const [tipoFecha, setTipoFecha] = useState<"desde" | "hasta" | null>(null);
  const [fechaDesde, setFechaDesde] = useState<Date | null>(null);
  const [fechaHasta, setFechaHasta] = useState<Date | null>(null);

  // Traer datos del backend
  useEffect(() => {
    fetch(`http://192.168.0.27:8080/api/hospedaje/${alojamiento.id}`)
      .then(res => res.json())
      .then(resData => {
        setData(resData);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [alojamiento.id]);

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

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  if (!data) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Error al cargar el alojamiento.</Text>
      </View>
    );
  }

  return (
    <ImageBackground
      source={require("../assets/Fondo_cortado.jpg")}
      style={styles.background}
      blurRadius={3}
    >
      <View style={styles.screen}>
        <ScrollView style={styles.container}>
          <View style={styles.imageContainer}>
            <Image
              source={data.imagen ? { uri: data.imagen } : require("../assets/logo3.png")}
              style={styles.image}
              resizeMode="cover"
            />
          </View>

          <View style={styles.content}>
            <Text style={styles.title}>{data.nombre}</Text>
            <Text style={styles.subtitle}>{data.tipoHospedaje?.nombre}</Text>
            <Text style={styles.description}>{data.descripcion}</Text>

            <Text style={styles.sectionTitle}>Servicios</Text>
            <View style={styles.services}>
              {data.servicios?.map((servicio: any) => (
                <Text key={servicio.id}>• {servicio.nombre}</Text>
              ))}
            </View>

            <View style={styles.box}>
              <Text style={styles.price}>${data.precio_por_noche}/Noche</Text>

              <View style={styles.row}>
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Desde</Text>
                  <TouchableOpacity
                    style={styles.input}
                    onPress={() => mostrarPicker("desde")}
                  >
                    <Text style={styles.inputText}>{formatearFecha(fechaDesde)}</Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Hasta</Text>
                  <TouchableOpacity
                    style={styles.input}
                    onPress={() => mostrarPicker("hasta")}
                  >
                    <Text style={styles.inputText}>{formatearFecha(fechaHasta)}</Text>
                  </TouchableOpacity>
                </View>
              </View>

              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Reservar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>

        <DateTimePickerModal
          isVisible={isPickerVisible}
          mode="date"
          onConfirm={confirmarFecha}
          onCancel={() => setPickerVisible(false)}
          minimumDate={tipoFecha === "hasta" && fechaDesde ? fechaDesde : new Date()}
        />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1, resizeMode: "cover"
  },
  screen: {
    flex: 1, backgroundColor: "rgba(0,0,0,0.4)", paddingTop: StatusBar.currentHeight || 40
  },
  container: {
    flex: 1, marginTop: 10
  },
  imageContainer: {
    margin: 20, borderRadius: 20, overflow: "hidden", elevation: 6
  },
  image: {
    width: "100%", height: 220

  },
  content: {
    backgroundColor: "white", borderRadius: 16, marginHorizontal: 20, padding: 20, elevation: 3
  },
  title: {
    fontSize: 22, fontWeight: "bold", marginBottom: 5
  },
  subtitle: {
    fontSize: 16, fontWeight: "600", color: "#555", marginBottom: 10
  },
  description: {
    color: "#444", fontSize: 15, marginBottom: 20
  },
  sectionTitle: {
    fontWeight: "bold", fontSize: 16, marginBottom: 10

  },
  services: {
    marginBottom: 25, gap: 5
  },
  box: {
    backgroundColor: "white", padding: 16, borderRadius: 16, elevation: 5
  },
  price: {
    fontWeight: "bold", fontSize: 18, textAlign: "center", marginBottom: 10
  },
  row: {
    flexDirection: "row", justifyContent: "space-between", marginBottom: 10
  },
  inputGroup: {
    width: "48%"
  },
  label: {
    fontSize: 14, color: "#444", marginBottom: 4
  },
  input: {
    backgroundColor: "#f7f7f7", padding: 10, borderRadius: 8, color: "#888"
  },
  inputText: {
    color: "#555"
  },
  button: {
    backgroundColor: "black", padding: 12, borderRadius: 8, alignItems: "center"
  },
  buttonText: {
    color: "white", fontWeight: "bold", fontSize: 16
  },
});
