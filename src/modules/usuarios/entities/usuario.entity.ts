import { RolesEnum } from '../../common/enum/role.enum';
import { EstadoUsuarioEnum } from '../../common/enum/estadosUsuarios.enum';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity('usuario')
export class UsuarioEntity {
  @PrimaryGeneratedColumn('uuid')
  uuidUsuario: string;

  @Column({ unique: true, nullable: false })
  @Column()
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: false })
  nombres: string;
  // primerNombre: string;

  // @Column({ nullable: false })
  // segundoNombre: string;

  @Column({ nullable: false })
  apellidos: string;
  // primerApellido: string;

  // @Column({ nullable: false })
  // segundoApellido: string;

  @Column({ nullable: false })
  identificacion: number;

  @Column({ type: 'enum', enum: RolesEnum })
  roles: string;

  @Column({
    type: 'enum',
    enum: EstadoUsuarioEnum,
    default: EstadoUsuarioEnum.ACTIVO,
  })
  estado: string;

  @CreateDateColumn({ type: 'date' })
  fechaCreado: Date;

  @Column({ type: 'time' })
  horaCreado: Date;

  @CreateDateColumn({ type: 'timestamp' })
  updated: Date;
}
