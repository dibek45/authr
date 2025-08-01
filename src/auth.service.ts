import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { OpsTeam } from './entities/ops-team.entity';

import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthService {
 
  constructor(
    private readonly jwtService: JwtService,    
    @InjectRepository(OpsTeam) private readonly opsTeamRepository: Repository<OpsTeam>,

  ) {}

  async validateUser(email: string, password: string) {
    console.log('📥 Llega a validar usuario:', email);
    
    const user2=await this.opsTeamRepository.find( 
     ); 
    console.log(user2)
    const user = await this.opsTeamRepository.findOne({ 
      where: { email }, 
    }); 

    if (!user) {
      console.log('❌ Usuario no encontrado:', email);
      return null;
    }

    // Aquí podrías verificar la contraseña con bcrypt
    if (user.password !== password) {
      console.log('❌ Contraseña incorrecta para:', email);
      return null;
    }

    console.log('✅ Usuario autenticado:', user.email);

    
    return {
      access_token: this.jwtService.sign({ 
        id: user.id, 
        gymId:user.gym_id,
        email: user.email, 
        
      }),
    };
    
  }

  async findUserByEmail(email: string): Promise<OpsTeam | null> {
    return this.opsTeamRepository.findOne({ where: { email }});
  }
}
