export type RolUsuario = "ANFITRION" | "HUESPED";

export interface Usuario {
  id?: number;
  nombre: string;
  apellido: string;
  email: string;
  contraseña: string;
  dni?: number;
  imagen?: string;
  rol: RolUsuario;
}
