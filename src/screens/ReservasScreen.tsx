import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    ScrollView,
    ImageBackground,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Calendar, LocaleConfig } from "react-native-calendars";
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

export default function ReservasScreen() {
    const [usuarioId, setUsuarioId] = useState<number | null>(null);
    const [reservas, setReservas] = useState<any[]>([]);
    const [markedDates, setMarkedDates] = useState<any>({});

    useEffect(() => {
        const fetchUsuario = async () => {
            const idStr = await AsyncStorage.getItem("usuarioId");
            if (idStr) setUsuarioId(parseInt(idStr));
        };
        fetchUsuario();
    }, []);

    useEffect(() => {
        if (usuarioId) fetchReservas();
    }, [usuarioId]);

    const fetchReservas = async () => {
        try {
            const data = await getReservasPorUsuario(usuarioId!);
            setReservas(data);
            marcarFechas(data);
        } catch (error) {
            console.error("Error al traer reservas:", error);
        }
    };

    const marcarFechas = (reservas: any[]) => {
        const dates: any = {};
        reservas.forEach((res) => {
            const start = new Date(res.fecha_check_in);
            const end = new Date(res.fecha_check_out);
            for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
                const key = d.toISOString().split("T")[0];
                if (key === res.fecha_check_in)
                    dates[key] = { startingDay: true, color: "#FFA500", textColor: "white" };
                else if (key === res.fecha_check_out)
                    dates[key] = { endingDay: true, color: "#FFA500", textColor: "white" };
                else
                    dates[key] = { color: "#FFA500", textColor: "white" };
            }
        });
        setMarkedDates(dates);
    };

    return (
        <ImageBackground
            source={require("../assets/Fondo_cortado.jpg")}
            style={styles.background}
            blurRadius={2}
        >
            <ScrollView style={styles.container}>
                <Text style={styles.title}>Mis reservas</Text>

                <Calendar
                    markingType={"period"}
                    markedDates={markedDates}
                    style={{
                        borderRadius: 10,
                        borderWidth: 1,
                        borderColor: "#ddd",
                        padding: 10,
                        marginBottom: 20,
                    }}
                />

                <FlatList
                    data={reservas}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.card}>
                            <Text style={styles.cardTitle}>{item.hospedaje.nombre}</Text>
                            <Text>Dirección: {item.hospedaje.direccion}</Text>
                            <Text>
                                Check-in: {item.fecha_check_in} | Check-out: {item.fecha_check_out}
                            </Text>
                        </View>
                    )}
                />
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
    title: {
        fontSize: 24, fontWeight: "bold", marginBottom: 20, color: "black"
    },
    card: {
        backgroundColor: "white", padding: 15, borderRadius: 12, marginBottom: 10
    },
    cardTitle: {
        fontWeight: "bold", fontSize: 16, marginBottom: 5
    },
});
