import api from "./api";
import { Usuario } from "../models/Usuario";

export const crearUsuario = async (usuario: Usuario): Promise<Usuario> => {
  const res = await api.post<Usuario>("/usuario", usuario); 
  return res.data;
};

export const editarUsuario = async (id: number, usuario: any) => {
  const response = await api.put(`/usuario/${id}`, usuario);
  return response.data;
};

export const getUsuarios = async () => {
  const response = await api.get("/usuario");
  return response.data;
};
export const getUsuarioPorId = async (id: number) => {
  const response = await api.get(`/usuario/${id}`);
  return response.data;
};