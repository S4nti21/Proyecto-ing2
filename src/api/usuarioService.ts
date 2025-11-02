// src/api/usuarioService.ts
import api from "./api";
import { Usuario } from "../models/Usuario";

export const crearUsuario = async (usuario: Usuario): Promise<Usuario> => {
  const res = await api.post<Usuario>("/usuario", usuario); 
  return res.data;
};
