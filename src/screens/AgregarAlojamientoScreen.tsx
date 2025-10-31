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
} from "react-native";
import * as ImagePicker from "expo-image-picker";

export default function AgregarAlojamientoScreen({ navigation }: any) {
    const [nombre, setNombre] = useState("");
    const [tipo, setTipo] = useState("");
    const [direccion, setDireccion] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [imagen, setImagen] = useState<string | null>(null);

    const [servicios, setServicios] = useState({
        wifi: false,
        tv: false,
        aire: false,
        pileta: false,
        cochera: false,
        spa: false,
        desayuno: false,
    });

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

    const guardarAlojamiento = () => {
        const nuevoAlojamiento = {
            nombre,
            tipo,
            direccion,
            descripcion,
            servicios,
            imagen,
        };
        console.log("Alojamiento guardado:", nuevoAlojamiento);
        alert("Alojamiento guardado correctamente");
        navigation.goBack();
    };

    return (
        <ImageBackground
            source={require("../assets/Fondo_cortado.jpg")}
            style={styles.background}
            blurRadius={2}
        >

            <ScrollView style={styles.container} contentContainerStyle={styles.scroll}>
                <View style={styles.card}>
                    <Text style={styles.title}>Agregar alojamiento</Text>

                    <Text style={styles.label}>Nombre de alojamiento</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Ej: Hotel Central"
                        value={nombre}
                        onChangeText={setNombre}
                    />

                    <Text style={styles.label}>Tipo de alojamiento</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Ej: Cabaña, Hotel, Departamento..."
                        value={tipo}
                        onChangeText={setTipo}
                    />

                    <Text style={styles.label}>Dirección</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Ej: San Martín 123, Santa Fe"
                        value={direccion}
                        onChangeText={setDireccion}
                    />

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
                        placeholder="Agrega una breve descripción..."
                        value={descripcion}
                        multiline
                        numberOfLines={4}
                        onChangeText={setDescripcion}
                    />

                    <Text style={styles.label}>Agregar imagen</Text>
                    <TouchableOpacity style={styles.imageButton} onPress={seleccionarImagen}>
                        <Text style={{ color: "#fff", fontWeight: "bold" }}>
                            Seleccionar imagen
                        </Text>
                    </TouchableOpacity>

                    {imagen && <Image source={{ uri: imagen }} style={styles.imagePreview} />}

                    <TouchableOpacity style={styles.saveButton} onPress={guardarAlojamiento}>
                        <Text style={styles.saveButtonText}>Guardar</Text>
                    </TouchableOpacity>
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
    },
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
    label: {
        fontWeight: "bold",
        marginTop: 10,
        marginBottom: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 10,
        padding: 10,
        backgroundColor: "#f9f9f9",
    },
    textArea: {
        height: 80,
        textAlignVertical: "top",
    },
    checkboxGroup: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 10,
    },
    checkboxItem: {
        flexDirection: "row",
        alignItems: "center",
        width: "45%",
    },
    checkbox: {
        width: 18,
        height: 18,
        borderWidth: 1,
        borderColor: "#000",
        marginRight: 6,
        borderRadius: 3,
    },
    checked: {
        backgroundColor: "#000",
    },
    imageButton: {
        backgroundColor: "#000",
        padding: 12,
        borderRadius: 10,
        alignItems: "center",
        marginTop: 5,
    },
    imagePreview: {
        width: "100%",
        height: 180,
        marginTop: 10,
        borderRadius: 10,
    },
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
