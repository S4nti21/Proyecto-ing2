import api from "./api";

export const crearHospedaje = async (hospedaje: any) => {
    const response = await api.post("/hospedaje", hospedaje);
    return response.data;
};
export const subirImagenService = async (formData: FormData) => {
    const response = await api.post("/hospedaje", formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data; // URL de la imagen
};

export const obtenerHospedajes = async () => {
  try {
    const response = await api.get("/hospedaje");
    return response.data; // será un array de Hospedaje
  } catch (error) {
    console.error("Error al obtener hospedajes:", error);
    return [];
  }
};