import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  ScrollView,
  ImageBackground,
  Alert,
} from "react-native";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { colors } from "../theme/colors";
import { Calendar, LocaleConfig } from "react-native-calendars";
import { getHospedajesPorUsuario, eliminarHospedaje } from "../api/hospedajesService";
import { getReservasPorUsuario } from "../api/reservaService";

LocaleConfig.locales["es"] = {
  monthNames: [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ],
  monthNamesShort: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
  dayNames: ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
  dayNamesShort: ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"],
  today: "Hoy",
};
LocaleConfig.defaultLocale = "es";

type TabParamList = {
  Home: undefined;
  Perfil: undefined;
  Panel: undefined;
  AgregarAlojamientoScreen: undefined;
  EditarAlojamientoScreen: { alojamiento: any };
};

type Props = {
  navigation: BottomTabNavigationProp<TabParamList, "Panel">;
  route: any;
};

export default function PanelScreen({ navigation }: Props) {
  const [selected, setSelected] = useState<string | null>(null);
  const [alojamientos, setAlojamientos] = useState<any[]>([]);
  const [markedDates, setMarkedDates] = useState<any>({});
  const [usuarioId, setUsuarioId] = useState<number | null>(null);

  useEffect(() => {
    const fetchUsuario = async () => {
      const idStr = await AsyncStorage.getItem("usuarioId");
      if (idStr) setUsuarioId(parseInt(idStr));
    };
    fetchUsuario();
  }, []);

  useEffect(() => {
    if (usuarioId) {
      fetchAlojamientos();
      fetchReservas();
    }
  }, [usuarioId]);

  const fetchAlojamientos = async () => {
    try {
      const data = await getHospedajesPorUsuario(usuarioId!);
      setAlojamientos(data);
    } catch (error) {
      console.error("Error al traer hospedajes:", error);
    }
  };

  const fetchReservas = async () => {
    try {
      const reservas = await getReservasPorUsuario(usuarioId!);

      const marcas: any = {};
      reservas.forEach((reserva: any) => {
        const start = reserva.fecha_check_in;
        const end = reserva.fecha_check_out;

        let current = new Date(start);
        const last = new Date(end);
        while (current <= last) {
          const key = current.toISOString().split("T")[0];
          marcas[key] = { color: "#FFA500", textColor: "white" };
          current.setDate(current.getDate() + 1);
        }
      });

      setMarkedDates(marcas);
    } catch (error) {
      console.error("Error al traer reservas:", error);
    }
  };

  const handlePress = (id: string) => {
    setSelected(selected === id ? null : id);
  };

  const handleDelete = (alojamiento: any) => {
    Alert.alert(
      "Eliminar alojamiento",
      `¿Seguro que deseas eliminar "${alojamiento.nombre}"?`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: async () => {
            try {
              await eliminarHospedaje(alojamiento.id);
              Alert.alert("Éxito", "Alojamiento eliminado correctamente");
              fetchAlojamientos();
              fetchReservas();
            } catch (error) {
              console.error("Error al eliminar alojamiento:", error);
              Alert.alert("Error", "No se pudo eliminar el alojamiento");
            }
          },
        },
      ]
    );
  };

  const renderItem = ({ item }: any) => (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => handlePress(item.id)}
      style={styles.card}
    >
      <Image source={{ uri: item.imagen }} style={styles.cardImage} />

      {selected === item.id && (
        <View style={styles.overlay}>
          <TouchableOpacity
            style={styles.overlayButton}
            onPress={() =>
              navigation.navigate("EditarAlojamientoScreen", { alojamiento: item })
            }
          >
            <Text style={styles.overlayButtonText}>Editar alojamiento</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.overlayButtonD}
            onPress={() => handleDelete(item)}
          >
            <Text style={styles.overlayButtonText}>Eliminar alojamiento</Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.cardInfo}>
        <Text style={styles.cardTitle}>{item.nombre}</Text>
        <Text style={styles.cardSubtitle}>{item.direccion}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <ImageBackground
      source={require("../assets/Fondo_cortado.jpg")}
      style={styles.background}
      blurRadius={2}
    >
      <ScrollView style={styles.container}>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate("AgregarAlojamientoScreen")}
        >
          <Text style={styles.addButtonText}>+ Agregar alojamiento</Text>
        </TouchableOpacity>

        <View style={styles.content}>
          <FlatList
            data={alojamientos}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            style={{ marginBottom: 20 }}
            contentContainerStyle={{ gap: 10 }}
          />

          <Calendar
            markingType={"period"}
            markedDates={markedDates}
            style={{
              borderRadius: 10,
              borderWidth: 1,
              borderColor: "#ddd",
              padding: 10,
            }}
          />
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1, resizeMode: "cover"
  },
  container: {
    flex: 1, padding: 20, paddingTop: 70
  },
  addButton: {
    backgroundColor: colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignSelf: "flex-start",
    marginBottom: 20,
  },
  addButtonText: {
    color: "black", fontWeight: "bold", fontSize: 16
  },
  content: {
    flex: 1
  },
  card: {
    width: 200, borderRadius: 15, backgroundColor: "white", overflow: "hidden", elevation: 3
  },
  cardImage: {
    width: "100%", height: 130
  },
  cardInfo: {
    padding: 10
  },
  cardTitle: {
    fontWeight: "bold", fontSize: 16
  },
  cardSubtitle: {
    fontSize: 14, color: "#666"
  },
  overlay: {
    position: "absolute", top: 0, left: 0, right: 0, height: 130, backgroundColor: "rgba(0,0,0,0.5)", alignItems: "center", justifyContent: "center"
  },
  overlayButton: {
    backgroundColor: "rgba(255,255,255,0.2)", paddingVertical: 6, paddingHorizontal: 12, borderRadius: 8, marginVertical: 5
  },
  overlayButtonD: {
    backgroundColor: "rgba(255,0,0,0.2)", paddingVertical: 6, paddingHorizontal: 12, borderRadius: 8, marginVertical: 5
  },
  overlayButtonText: {
    color: "white", fontWeight: "bold"
  },
});
