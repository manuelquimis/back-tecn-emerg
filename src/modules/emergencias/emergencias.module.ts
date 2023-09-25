import { Module } from '@nestjs/common';
import { EmergenciasService } from './emergencias.service';
import { EmergenciasController } from './emergencias.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmergenciaEntity } from './entities/emergencia.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EmergenciaEntity])],
  controllers: [EmergenciasController],
  providers: [EmergenciasService],
  exports: [EmergenciasService]
})
export class EmergenciasModule {}
