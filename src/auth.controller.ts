import { Body, Controller, Post } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern('auth.login')
  async login(@Payload() payload: { email: string; password: string }) {
    console.log('📥 auth-service2 recibió:', payload);

    const tokenObject = await this.authService.validateUser(payload.email, payload.password);
    
    if (!tokenObject) {
      console.log('❌ No se pudo autenticar al usuario');
      return "INVALID_CREDENTIALS"; // ✅ Always return a string, NOT an object
    }

    console.log('✅ Token generado:', tokenObject.access_token);
    return tokenObject.access_token; // ✅ Return token as a string
  }

  
@MessagePattern('auth.create-dog')
async crearUsuario(@Payload() dto: CreateUserDto) {
  console.log('🐾 DTO recibido en el micro:', dto);
  return this.authService.crearUsuario(dto);
}


  @MessagePattern('auth.test-nuevo')
async testNuevo(@Payload() data: { nombre: string }) {
  console.log('👋 Llega al microservicio con:', data);
  return { message: `Hola ${data.nombre}, desde el micro!` };
}

}
