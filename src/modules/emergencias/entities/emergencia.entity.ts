import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Timestamp,
} from 'typeorm';
import {
  TipoEmergenciaEnum,
  SolicitanteEnum,
  OperadorEnum,
  EstadoEmergenciaEnum,
  EstacionesEnum,
  CodEmergenciaEnum,
  CodVehiculosEnum,
} from '../../common/enum/emergencias.enum';
@Entity('emergencia')
export class EmergenciaEntity {
  @PrimaryGeneratedColumn('uuid')
  uuidEmergencia: string;

  // @Column({ type: 'enum', enum: TipoEmergenciaEnum, nullable: true })
  // tipoEmergencia: TipoEmergenciaEnum;
  @Column({ nullable: true })
  tipoEmergencia: string;

  @Column({ nullable: true })
  direccion: string;

  @CreateDateColumn({ type: 'date' })
  fechaDespacho: Date;

  @Column({ type: 'time' })
  horaDespacho: string;

  @Column({ nullable: true })
  codEmergencia: string;

  @Column({ nullable: true })
  solicitante: string;

  @Column({ type: 'time', nullable: true })
  horaSalidaEstacion: Date;

  @Column({ type: 'time', nullable: true })
  tiempoSalidaEstacion: Timestamp;

  @Column({ type: 'time', nullable: true })
  horaLlegadaEmergencia: Date;

  @Column({ type: 'time', nullable: true })
  tiempoLlegadaEmergencia: Timestamp;

  @Column({ type: 'time', nullable: true })
  horaLlegadaCasaMedica: Date;

  @Column({ type: 'time', nullable: true })
  horaTrabajoTerminado: Date;

  @Column({ type: 'time', nullable: true })
  horaLlegadaEstacion: Date;

  @Column({ type: 'int', nullable: true })
  tiempoFueraEstacion: number;

  @Column({ type: 'int', nullable: true })
  kmSalida: number;

  @Column({ type: 'int', nullable: true })
  kmEntrada: number;

  @Column({ type: 'int', nullable: true })
  kmRecorrido: number;

  @Column({ type: 'enum', enum: OperadorEnum, nullable: true })
  operador: string;

  @Column({ type: 'enum', enum: EstacionesEnum, nullable: true })
  estacion: string;

  @Column({
    type: 'enum',
    enum: EstadoEmergenciaEnum,
    default: EstadoEmergenciaEnum.ENCURSO,
    nullable: true,
  })
  estado: string;

  @Column({ nullable: true })
  casaSalud: string;

  @Column({ type: 'int', nullable: true })
  numeroParteEmergencia: number;

  @Column({ nullable: true })
  observaciones: string;

  @CreateDateColumn({ type: 'timestamp' })
  updated: Date;
}
