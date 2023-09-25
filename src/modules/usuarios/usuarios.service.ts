import {
  BadRequestException,
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import * as bcryptjs from 'bcryptjs';

import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { SearchUsersDto } from './dto/search-usuario.dto';

import { UsuarioEntity } from './entities/usuario.entity';

import { EstadoUsuarioEnum } from '../common/enum/estadosUsuarios.enum';
import { obtenerTiempoActual } from '../common/utils/dataTime';
import {
  changePasswordMessage,
  createdUserMessage,
  deletdUserMessage,
} from '../common/utils/customResponse';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(UsuarioEntity)
    private readonly usuarioRepository: Repository<UsuarioEntity>,
  ) {}

  async crearUsuario({
    email,
    password,
    // primerNombre,
    // segundoNombre,
    // primerApellido,
    // segundoApellido,
    nombres,
    apellidos,
    identificacion,
    roles,
  }: CreateUsuarioDto) {
    try {
      const correo = await this.findOneByEmail(email);
      const cedula = await this.findOneByIdentification(identificacion);

      if (correo! || cedula!) {
        throw new BadRequestException(`El usuario ya existe`);
      }

      const usuarioOK = this.usuarioRepository.create({
        email,
        password: await bcryptjs.hash(password, 10),
        // primerNombre,
        // segundoNombre,
        // primerApellido,
        // segundoApellido,
        nombres,
        apellidos,
        identificacion,
        roles,
        horaCreado: obtenerTiempoActual(),
      });

      await this.usuarioRepository.save(usuarioOK);
      return createdUserMessage;
    } catch (error) {
      throw error;
    }
  }

  async findOneByEmail(email: string) {
    try {
      return await this.usuarioRepository.findOneBy({ email });
    } catch (error) {
      throw new NotFoundException('Usuario no encontrado');
    }
  }

  async findOneByIdentification(identificacion: number) {
    try {
      return await this.usuarioRepository.findOneBy({ identificacion });
    } catch (error) {
      throw new NotFoundException('Usuario no encontrado');
    }
  }

  async findAll(page: number, limit: number) {
    const [usuarios, total] = await this.usuarioRepository.findAndCount({
      where: { estado: EstadoUsuarioEnum.ACTIVO },
      select: [
        'uuidUsuario',
        'email',
        // 'primerNombre',
        // 'segundoNombre',
        // 'primerApellido',
        // 'segundoApellido',
        'nombres',
        'apellidos',
        'identificacion',
        'estado',
        'roles',
        'fechaCreado',
        'horaCreado',
      ],
      skip: (page - 1) * limit,
      take: limit,
    });

    const listadoUsuarios = {
      statusCode: '200',
      message: 'Usuarios Obtenidos',
      data: usuarios,
      count: total,
    };

    return listadoUsuarios;
  }

  async findInfoUserByUuid(uuid: string) {
    const usuario = await this.usuarioRepository.findOne({
      where: { uuidUsuario: uuid },
    });

    console.log(usuario)
    const dataUsuario = {
      uuidUsuario: usuario.uuidUsuario,
      nombres: usuario.nombres,
      apellidos: usuario.apellidos,
      email: usuario.email,
      roles: usuario.roles,
      estado: usuario.estado,
      identificacion: usuario.identificacion,
    } as UsuarioEntity;

    const data = {
      estatusCode: '200',
      message: 'Usuario Obtenido',
      data: dataUsuario,
    };

    // return dataUsuario;
    return data;
  }

  async findInfoPerfilUser(uuid: string) {
    const usuario = await this.usuarioRepository.findOne({
      where: { uuidUsuario: uuid },
    });

    console.log(usuario)
    const dataUsuario = {
      uuidUsuario: usuario.uuidUsuario,
      nombres: usuario.nombres,
      apellidos: usuario.apellidos,
      email: usuario.email,
      roles: usuario.roles,
      estado: usuario.estado,
      identificacion: usuario.identificacion,
    } as UsuarioEntity;

    const data = {
      estatusCode: '200',
      message: 'Información Obtenida',
      data: dataUsuario,
    };

    // return dataUsuario;
    return data;
  }

  async softDeleteUser(uuid: string) {
    const usuarioEliminado = await this.usuarioRepository.findOne({
      where: { estado: EstadoUsuarioEnum.ACTIVO, uuidUsuario: uuid },
    });

    if (usuarioEliminado) {
      usuarioEliminado.estado = EstadoUsuarioEnum.INACTIVO;
    }
    await this.usuarioRepository.save(usuarioEliminado);
    return deletdUserMessage;
  }

  async changePassword(
    uuid: string,
    newPassword: UpdateUsuarioDto,
  ): Promise<any> {
    const usuario = await this.usuarioRepository.findOne({
      where: { uuidUsuario: uuid },
    });
    
    const objectUser = {
      password: await bcryptjs.hash(newPassword.password, 10),
    } as UpdateUsuarioDto;
    
    return await this.usuarioRepository.update(uuid, objectUser);
  }

  async updateUser(
    uuid: string,
    updateUsuarioDto: UpdateUsuarioDto,
  ): Promise<any> {
    const usuario = await this.usuarioRepository.findOne({
      where: { uuidUsuario: uuid },
    });
    if (!usuario) {
      throw new NotFoundException('Usuario no encontrado');
    }

    const objectUser = {
      email: updateUsuarioDto.email,
      // password: await bcryptjs.hash(updateUsuarioDto.password, 10),
      nombres: updateUsuarioDto.nombres,
      apellidos: updateUsuarioDto.apellidos,
      identificacion: updateUsuarioDto.identificacion,
      roles: updateUsuarioDto.roles,
    } as UpdateUsuarioDto;

    return await this.usuarioRepository.update(uuid, objectUser);
    // return await this.usuarioRepository.update(uuid, updateUsuarioDto);
  }

  async searchUser(busqueda: SearchUsersDto) {
    const query = this.usuarioRepository.createQueryBuilder('usuario');

    if (busqueda.email) {
      query.orWhere('usuario.email = :email', { email: busqueda.email });
    }

    if (busqueda.primerNombre) {
      query.orWhere('usuario.primerNombre LIKE :primerNombre', {
        primerNombre: `%${busqueda.primerNombre}%`,
      });
    }

    if (busqueda.segundoNombre) {
      query.orWhere('usuario.segundoNombre LIKE :segundoNombre', {
        segundoNombre: `%${busqueda.segundoNombre}%`,
      });
    }

    if (busqueda.primerApellido) {
      query.orWhere('usuario.primerApellido LIKE :primerApellido', {
        primerApellido: `%${busqueda.primerApellido}%`,
      });
    }

    if (busqueda.segundoApellido) {
      query.orWhere('usuario.segundoApellido LIKE :segundoApellido', {
        segundoApellido: `%${busqueda.segundoApellido}%`,
      });
    }

    if (busqueda.roles) {
      query.orWhere('usuario.roles = :roles', { roles: busqueda.roles });
    }

    const data = await query
      .select([
        'usuario.email',
        // 'usuario.primerNombre',
        // 'usuario.segundoNombre',
        // 'usuario.primerApellido',
        // 'usuario.segundoApellido',
        'nombres',
        'apellidos',
        'usuario.roles',
      ])
      .getMany();

    if (data.length === 0) {
      throw new NotFoundException('No se encontró información');
    }

    const countQuery = query.clone();
    const count = await this.getCount(countQuery);

    const dataFiltrada = {
      statusCode: 200,
      message: 'Resultados Filtrados',
      data: data,
      searchResult: count,
    };

    return dataFiltrada;
  }

  private async getCount(
    query: SelectQueryBuilder<UsuarioEntity>,
  ): Promise<number> {
    return await query.getCount();
  }
}
