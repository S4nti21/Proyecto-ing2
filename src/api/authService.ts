import api from "./api";

export const login = async (email: string, contraseña: string) => {
  try {
    const response = await api.post("/usuario/login", { email, contraseña });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data || "Error en login");
  }
};
