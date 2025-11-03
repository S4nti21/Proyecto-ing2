import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Image,
  ImageBackground,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { obtenerHospedajes } from "../api/hospedajesService";

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
  const [alojamientos, setAlojamientos] = useState<any[]>([]);
  const [filteredAlojamientos, setFilteredAlojamientos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [tipoFiltro, setTipoFiltro] = useState<string | null>(null);

  useEffect(() => {
    const fetchAlojamientos = async () => {
      try {
        const data = await obtenerHospedajes();
        setAlojamientos(data);
        setFilteredAlojamientos(data); // inicialmente sin filtro
      } catch (error) {
        console.error("Error cargando alojamientos:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAlojamientos();
  }, []);

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
        toValue: 275,
        duration: 200,
        useNativeDriver: false,
      }).start();
    }
  };

  const aplicarFiltro = (tipo: string | null) => {
    setTipoFiltro(tipo);
    setMenuVisible(false);
    Animated.timing(menuHeight, { toValue: 0, duration: 200, useNativeDriver: false }).start();
    
    if (tipo) {
      const filtrados = alojamientos.filter(a => a.tipoHospedaje?.nombre === tipo);
      setFilteredAlojamientos(filtrados);
    } else {
      setFilteredAlojamientos(alojamientos);
    }
  };

  const tipos = ["Hotel", "Cabaña", "Departamento", "Hostel", "Casa"];

  return (
    <ImageBackground
      source={require("../assets/Fondo_cortado.jpg")}
      style={styles.background}
      blurRadius={2}
    >
      <View style={styles.overlay}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.filterButton} onPress={toggleMenu}>
            <Text style={styles.filterText}>{tipoFiltro ?? "Filtros"}</Text>
          </TouchableOpacity>
          <Image source={require("../assets/logo3.png")} style={styles.logo} resizeMode="contain" />
        </View>
        {menuVisible && (
          <Animated.View style={[styles.menu, { height: menuHeight, top: 100, left: 20 }]}>
            {tipos.map((tipo) => (
              <TouchableOpacity
                key={tipo}
                style={[
                  styles.menuItem,
                  tipoFiltro === tipo && { backgroundColor: "#ddd" },
                ]}
                onPress={() => aplicarFiltro(tipo)}
              >
                <Text style={styles.menuText}>{tipo}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              style={[styles.menuItem, styles.menuItemDisabled]}
              onPress={() => aplicarFiltro(null)}
            >
              <Text style={[styles.menuText, { color: "#aaa" }]}>Mostrar todos</Text>
            </TouchableOpacity>
          </Animated.View>
        )}
        {loading ? (
          <View style={{ flex: 1, justifyContent: "center", alignItems: "center", marginTop: 150 }}>
            <ActivityIndicator size="large" color="#000" />
          </View>
        ) : (
          <ScrollView
            contentContainerStyle={styles.scrollContainer}
            showsVerticalScrollIndicator={false}
          >
            {filteredAlojamientos.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.card}
                activeOpacity={0.8}
                onPress={() => navigation.navigate("AlojamientoDetalles", { alojamiento: item })}
              >
                {item.imagen ? (
                  <Image source={{ uri: item.imagen }} style={styles.image} />
                ) : (
                  <Image source={require("../assets/logo3.png")} style={styles.image} />
                )}
                <View style={styles.info}>
                  <Text style={styles.title}>{item.nombre}</Text>
                  <Text style={styles.subtitle}>{item.tipoHospedaje?.nombre}</Text>
                  <Text style={styles.price}>
                    <Text style={{ fontWeight: "bold" }}>${item.precio_por_noche || 0}</Text> Noche
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1, resizeMode: "cover" },
  overlay: { flex: 1 },
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
    width: 120, height: 50
   },
  filterButton: { 
    backgroundColor: "white", paddingVertical: 8, paddingHorizontal: 16, borderRadius: 10
   },
  filterText: { 
    fontWeight: "600", fontSize: 16 
  },
  menu: { 
    position: "absolute", backgroundColor: "white", borderRadius: 12, overflow: "hidden", elevation: 5, zIndex: 15
   },
  menuItem: { 
    padding: 12, borderBottomWidth: 1, borderBottomColor: "#eee" 
  },
  menuItemDisabled: { 
    backgroundColor: "#f7f7f7"
   },
  menuText: { 
    fontSize: 16
   },
  scrollContainer: { 
    paddingTop: 140, paddingHorizontal: 20, paddingBottom: 40, flexDirection: "row", flexWrap: "wrap", justifyContent: "space-around" 
  },
  card: { 
    backgroundColor: "white", borderRadius: 16, width: "45%", marginBottom: 20, overflow: "hidden", elevation: 6
   },
  image: { 
    height: 120, width: "100%"
   },
  info: { 
    padding: 10 
  },
  title: { 
    fontSize: 16, fontWeight: "bold", color: "#000"
   },
  subtitle: {
     color: "#666", marginBottom: 4
     },
  price: { 
    fontSize: 14, color: "#444"
  },
});
