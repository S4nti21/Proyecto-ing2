import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList, ScrollView, ImageBackground } from "react-native";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { colors } from "../theme/colors";
import { Calendar, LocaleConfig } from "react-native-calendars";

// Configuración del idioma del calendario
LocaleConfig.locales['es'] = {
  monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
  monthNamesShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
  dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
  dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'],
  today: 'Hoy'
};
LocaleConfig.defaultLocale = 'es';

type TabParamList = {
  Home: undefined;
  Perfil: undefined;
  Panel: undefined;
  AgregarAlojamientoScreen: undefined;
};

type Props = {
  navigation: BottomTabNavigationProp<TabParamList, "Panel">;
};

const alojamientos = [
  {
    id: '1',
    nombre: 'Matrimonial',
    ubicacion: 'Santa Fe',
    imagen: require('../assets/8aa8209e-5435-4a34-9c91-6e04ae1cc7f5.png'),
  },
  {
    id: '2',
    nombre: 'Monoambiente',
    ubicacion: 'Santa Fe',
    imagen: require('../assets/8aa8209e-5435-4a34-9c91-6e04ae1cc7f5.png'),
  },
];

export default function PanelScreen({ navigation }: Props) {
  const renderItem = ({ item }: any) => (
    <View style={styles.card}>
      <Image source={item.imagen} style={styles.cardImage} />
      <Text style={styles.cardTitle}>{item.nombre}</Text>
      <Text style={styles.cardSubtitle}>{item.ubicacion}</Text>
    </View>
  );

  return (
    <ImageBackground
      source={require("../assets/Fondo_cortado.jpg")}
      style={styles.background}
      blurRadius={2}
    >

      <ScrollView style={styles.container}>
        {/* HEADER */}
        <View style={styles.header}>
        </View>

        {/* BOTÓN AGREGAR */}
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate("AgregarAlojamientoScreen")}
        >
          <Text style={styles.addButtonText}>+ Agregar alojamiento</Text>
        </TouchableOpacity>

        {/* CONTENIDO */}
        <View style={styles.content}>
          <FlatList
            data={alojamientos}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            horizontal
            style={{ marginBottom: 20 }}
            contentContainerStyle={{ gap: 10 }}
          />

          <Calendar
            markingType={'period'}
            markedDates={{
              '2025-10-03': { startingDay: true, color: '#FFA500', textColor: 'white' },
              '2025-10-04': { endingDay: true, color: '#FFA500', textColor: 'white' },
              '2025-10-07': { startingDay: true, color: '#FFA500', textColor: 'white' },
              '2025-10-09': { endingDay: true, color: '#FFA500', textColor: 'white' },
            }}
            style={{ borderRadius: 10, borderWidth: 1, borderColor: '#ddd', padding: 10 }}
          />
        </View>
      </ScrollView>
    </ImageBackground >
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
  },
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    paddingVertical: 30,
    marginBottom: 10,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.primary,
  },
  addButton: {
    backgroundColor: colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginBottom: 20,
  },
  addButtonText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
  },
  content: {
    flex: 1,
  },
  card: {
    width: 200,
    borderRadius: 10,
    backgroundColor: 'white',
    overflow: 'hidden',
    elevation: 3,
  },
  cardImage: {
    width: '100%',
    height: 120,
  },
  cardTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 5,
    marginHorizontal: 10,
  },
  cardSubtitle: {
    fontSize: 14,
    marginHorizontal: 10,
    marginBottom: 10,
    color: '#555',
  },
});
