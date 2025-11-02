import api from "./api"; // tu instancia de axios

export const login = async (email: string, contraseña: string) => {
  try {
    const response = await api.post("/usuario/login", { email, contraseña });
    return response.data; // devuelve "Usuario correcto" o mensaje de error
  } catch (error: any) {
    throw new Error(error.response?.data || "Error en login");
  }
};
