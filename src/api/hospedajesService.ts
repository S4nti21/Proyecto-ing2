import api from "./api";

export const subirImagenService = async (formData: FormData) => {
  const response = await api.post("/hospedaje", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const obtenerHospedajes = async () => {
  try {
    const response = await api.get("/hospedaje");
    return response.data;
  } catch (error) {
    console.error("Error al obtener hospedajes:", error);
    return [];
  }
};

export const crearHospedaje = async (hospedaje: any) => {
  try {
    const response = await api.post("/hospedaje", hospedaje);
    return response.data;
  } catch (error) {
    console.error("Error al crear hospedaje:", error);
    throw error;
  }
};
export const editarHospedaje = async (id: number, hospedaje: any) => {
  try {
    const response = await api.put(`/hospedaje/${id}`, hospedaje);
    return response.data;
  } catch (error) {
    console.error("Error al editar hospedaje:", error);
    throw error;
  }
};
export const getHospedajesPorUsuario = async (usuarioId: number) => {
  try {
    const response = await api.get(`/hospedaje/usuario/${usuarioId}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener hospedajes por usuario:", error);
    throw error;
  }
};
export const eliminarHospedaje = async (id: number) => {
  const response = await api.delete(`/hospedaje/${id}`);
  return response.data;
};