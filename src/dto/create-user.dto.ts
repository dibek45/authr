export class CreateUserDto {
  email: string;
  password: string;
  nombre: string;
  rol: string; // ej: 'admin' o 'vendedor'
}
