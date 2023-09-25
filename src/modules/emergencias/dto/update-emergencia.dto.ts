import { PartialType } from '@nestjs/mapped-types';
import { CreateEmergenciaDto } from './create-emergencia.dto';
import { EstadoEmergenciaEnum } from 'src/modules/common/enum/emergencias.enum';
import { IsEnum } from 'class-validator';

export class UpdateEmergenciaDto extends PartialType(CreateEmergenciaDto) {
    // @IsEnum(EstadoEmergenciaEnum, {each: true}) //desabilitar si falla
  // estado: string;  
}
