import { IsDateString, IsIn, IsOptional, IsString } from 'class-validator';
import { EstacionesEnum } from '../../common/enum/emergencias.enum';

export class SearchEmergenciaDto {
  @IsDateString()
  @IsOptional()
  readonly fechaDespacho?: Date;

  @IsOptional()
  @IsDateString()
  readonly fechaInicio?: Date;

  @IsOptional()
  @IsDateString()
  readonly fechaFin?: Date;

  @IsOptional()
  @IsString()
  readonly codEmergencia?: string;

  @IsOptional()
  @IsString()
  readonly tipoEmergencia?: string;

  @IsOptional()
  @IsIn(Object.values(EstacionesEnum))
  readonly estacion?: EstacionesEnum;
}
