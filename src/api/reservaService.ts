import api from "./api"; // tu instancia de Axios o fetch wrapper

export const crearReserva = async (reserva: {
  alojamientoId: number;
  usuarioId: number;
  fecha_check_in: string;
  fecha_check_out: string;
}) => {
  try {
    const response = await api.post("/reserva", reserva);
    return response.data;
  } catch (error) {
    console.error("Error creando la reserva:", error);
    throw error;
  }
};

export const getReservasPorUsuario = async (usuarioId: number) => {
  const response = await api.get(`/reserva/usuario/${usuarioId}`);
  return response.data; // Array de reservas
};
