import { IsString, IsNumber, IsEnum } from 'class-validator';
import {
  CodEmergenciaEnum,
  EstacionesEnum,
  EstadoEmergenciaEnum,
  OperadorEnum,
  SolicitanteEnum,
  TipoEmergenciaEnum,
} from 'src/modules/common/enum/emergencias.enum';

export class CreateEmergenciaDto {
  @IsEnum(TipoEmergenciaEnum, { each: true })
  tipoEmergencia: string;

  @IsString()
  direccion: string;

  // @IsString()
  // fechaDespacho: Date;

  // @IsString()
  horaDespacho: string;

  @IsEnum(CodEmergenciaEnum, { each: true })
  codEmergencia: string;

  // @IsEnum(SolicitanteEnum, { each: true })
  @IsEnum(SolicitanteEnum, { each: true })
  solicitante: string;

  // @IsString()
  horaSalidaEstacion: string;

  // @IsString()
  tiempoSalidaEstacion: string;

  // @IsString()
  horaLlegadaEmergencia: string;

  // @IsString()
  tiempoLlegadaEmergencia: string;

  // @IsString()
  horaLlegadaCasaMedica: string;

  // @IsString()
  horaTrabajoTerminado: string;

  // @IsString()
  horaLlegadaEstacion: string;

  // @IsNumber()
  tiempoFueraEstacion: number;

  // @IsNumber()
  kmSalida: number;

  // @IsNumber()
  kmEntrada: number;

  // @IsNumber()
  kmRecorrido: number;

  // @IsEnum(OperadorEnum, { each: true })
  operador: string;

  @IsEnum(EstacionesEnum, { each: true })
  estacion: string;

  // @IsEnum(EstadoEmergenciaEnum, {each: true}) //desabilitar si falla
  // estado: string;

  // @IsString()
  casaSalud: string;

  // @IsNumber()
  numeroParteEmergencia: number;

  // @IsString()
  observaciones: string;
}
