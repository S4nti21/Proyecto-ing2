import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Image,
  ImageBackground,
  ScrollView,
} from "react-native";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";

type TabParamList = {
  Home: undefined;
  Perfil: undefined;
  Panel: undefined;
  AlojamientoDetalles: { alojamiento: any };
};

type Props = {
  navigation: BottomTabNavigationProp<TabParamList, "Home">;
};

export default function HomeScreen({ navigation }: Props) {
  const [menuVisible, setMenuVisible] = useState(false);
  const [menuHeight] = useState(new Animated.Value(0));

  const toggleMenu = () => {
    if (menuVisible) {
      Animated.timing(menuHeight, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start(() => setMenuVisible(false));
    } else {
      setMenuVisible(true);
      Animated.timing(menuHeight, {
        toValue: 150,
        duration: 200,
        useNativeDriver: false,
      }).start();
    }
  };

  const alojamientos = [
    { id: 1, nombre: "Tucuman", tipo: "Dept. monoambiente", precio: 40000 },
    { id: 2, nombre: "Cordoba", tipo: "Dept. 2 ambientes", precio: 55000 },
    { id: 3, nombre: "Rosario", tipo: "Dept. moderno", precio: 48000 },
    { id: 4, nombre: "Mendoza", tipo: "Dept. premium", precio: 65000 },
    { id: 5, nombre: "Salta", tipo: "Dept. clásico", precio: 42000 },
  ];

  return (
    <ImageBackground
      source={require("../assets/Fondo_cortado.jpg")}
      style={styles.background}
      blurRadius={2}
    >

      <View style={styles.overlay}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.filterButton} onPress={toggleMenu}>
            <Text style={styles.filterText}>Filtros</Text>
          </TouchableOpacity>

          <Image
            source={require("../assets/logo3.png")}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        {menuVisible && (
          <Animated.View
            style={[styles.menu, { height: menuHeight, top: 100, left: 20 }]}
          >
            <TouchableOpacity style={styles.menuItem} onPress={toggleMenu}>
              <Text style={styles.menuText}>Ocupados</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem} onPress={toggleMenu}>
              <Text style={styles.menuText}>Desocupados</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.menuItem, styles.menuItemDisabled]}
              onPress={toggleMenu}
            >
              <Text style={[styles.menuText, { color: "#aaa" }]}>
                Mostrar todos
              </Text>
            </TouchableOpacity>
          </Animated.View>
        )}

        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          {alojamientos.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.card}
              activeOpacity={0.8}
              onPress={() =>
                navigation.navigate("AlojamientoDetalles", { alojamiento: item })
              }
            >
              <Image
                source={require("../assets/8aa8209e-5435-4a34-9c91-6e04ae1cc7f5.png")}
                style={styles.image}
              />
              <View style={styles.info}>
                <Text style={styles.title}>{item.nombre}</Text>
                <Text style={styles.subtitle}>{item.tipo}</Text>
                <Text style={styles.price}>
                  <Text style={{ fontWeight: "bold" }}>${item.precio}</Text>{" "}
                  Noche
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
  },
  overlay: {
    flex: 1,
  },
  header: {
    position: "absolute",
    top: 50,
    left: 20,
    right: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    zIndex: 20,
  },
  logo: {
    width: 120,
    height: 50,
  },
  filterButton: {
    backgroundColor: "white",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 10,
  },
  filterText: {
    fontWeight: "600",
    fontSize: 16,
  },
  menu: {
    position: "absolute",
    backgroundColor: "white",
    borderRadius: 12,
    overflow: "hidden",
    elevation: 5,
    zIndex: 15,
  },
  menuItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  menuItemDisabled: {
    backgroundColor: "#f7f7f7",
  },
  menuText: {
    fontSize: 16,
  },
  scrollContainer: {
    paddingTop: 140,
    paddingHorizontal: 20,
    paddingBottom: 40,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
  card: {
    backgroundColor: "white",
    borderRadius: 16,
    width: "45%",
    marginBottom: 20,
    overflow: "hidden",
    elevation: 6,
  },
  image: {
    height: 120,
    width: "100%",
  },
  info: {
    padding: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  subtitle: {
    color: "#666",
    marginBottom: 4,
  },
  price: {
    fontSize: 14,
    color: "#444",
  },
});
