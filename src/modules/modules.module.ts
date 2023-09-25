import { Module } from '@nestjs/common';
import { UsuariosModule } from './usuarios/usuarios.module';
import { AuthModule } from './auth/auth.module';
import { EmergenciasModule } from './emergencias/emergencias.module';

@Module({
  imports: [UsuariosModule, AuthModule, EmergenciasModule ],
  controllers: [],
  providers: [],
  exports: [UsuariosModule, AuthModule, EmergenciasModule ],
})
export class ModulesModule {}
