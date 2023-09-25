import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { EmergenciaEntity } from './entities/emergencia.entity';
import { CreateEmergenciaDto } from './dto/create-emergencia.dto';
import { UpdateEmergenciaDto } from './dto/update-emergencia.dto';
import { obtenerTiempoActual } from '../common/utils/dataTime';
import { EstadoEmergenciaEnum } from '../common/enum/emergencias.enum';
import {
  createdEmergencyMessage,
  deletdEmergencyMessage,
  stateFinalizedEmergencyMessage,
} from '../common/utils/customResponse';
import { SearchEmergenciaDto } from './dto/search-emergencia.dto';

@Injectable()
export class EmergenciasService {
  constructor(
    @InjectRepository(EmergenciaEntity)
    private readonly emergenciaRepository: Repository<EmergenciaEntity>,
  ) {}

  async createEmergency(createEmergenciaDto: CreateEmergenciaDto) {
    try {
      const {
        codEmergencia,
        tipoEmergencia,
        direccion,
        // fechaDespacho,
        horaDespacho,
        solicitante,
        casaSalud,
        estacion,
        horaLlegadaCasaMedica,
        horaLlegadaEmergencia,
        horaLlegadaEstacion,
        horaSalidaEstacion,
        horaTrabajoTerminado,
        kmEntrada,
        kmRecorrido,
        kmSalida,
        numeroParteEmergencia,
        observaciones,
        operador,
        tiempoFueraEstacion,
        tiempoLlegadaEmergencia,
        tiempoSalidaEstacion,
      } = createEmergenciaDto;

      const dataEmergencia = {
        codEmergencia,
        tipoEmergencia,
        direccion,
        // fechaDespacho,
        horaDespacho: obtenerTiempoActual(),
        solicitante,
        casaSalud,
        estacion,
        horaLlegadaCasaMedica,
        horaLlegadaEmergencia,
        horaLlegadaEstacion,
        horaSalidaEstacion,
        horaTrabajoTerminado,
        kmEntrada,
        kmRecorrido,
        kmSalida,
        numeroParteEmergencia,
        observaciones,
        operador,
        tiempoFueraEstacion,
        tiempoLlegadaEmergencia,
        tiempoSalidaEstacion,
      };

      const emergencia = this.emergenciaRepository.create(dataEmergencia);
      await this.emergenciaRepository.save(emergencia);
      return createdEmergencyMessage
    } catch (error) {
      throw new BadRequestException('Ocurrio un error', error.message);
    }
  }

  async findOneByUuid(uuidEmergencia: string) {
    try {
      return await this.emergenciaRepository.findOneBy({ uuidEmergencia });
    } catch (error) {
      throw new NotFoundException('Registro no encontrado');
    }
  }

  async softDeleteEmergency(uuid: string) {
    const emergencia = await this.emergenciaRepository.findOne({
      where: {
        estado: EstadoEmergenciaEnum.FINALIZADA,
        uuidEmergencia: uuid,
      },
    });

    if (emergencia) {
      emergencia.estado = EstadoEmergenciaEnum.ELIMINADA;
    }
    await this.emergenciaRepository.save(emergencia);
    return deletdEmergencyMessage;
  }

  async estadoFinalizadoEmergency(uuid: string) {
    const emergencia = await this.emergenciaRepository.findOne({
      where: {
        estado: EstadoEmergenciaEnum.ENCURSO,
        uuidEmergencia: uuid,
      },
    });

    if (emergencia) {
      emergencia.estado = EstadoEmergenciaEnum.FINALIZADA;
    }
    await this.emergenciaRepository.save(emergencia);
    return deletdEmergencyMessage;
  }

  async emergencyFinished(uuid: string) {
    const emergencia = await this.emergenciaRepository.findOne({
      where: {
        estado: EstadoEmergenciaEnum.ENCURSO,
        uuidEmergencia: uuid,
      },
    });

    if (!emergencia) {
      throw new NotFoundException('No se encontro el registro');
    }

    emergencia.estado = EstadoEmergenciaEnum.FINALIZADA;
    return await this.emergenciaRepository.save(emergencia);
  }

  // async allEmergencyInProgress(page: number, limit: number) {
  //   const [emergencias, total] = await this.emergenciaRepository.findAndCount({
  //     where: { estado: EstadoEmergenciaEnum.ENCURSO },
  //     select: [
  //       'fechaDespacho',
  //       'horaDespacho',
  //       'codEmergencia',
  //       'tipoEmergencia',
  //       'direccion',
  //       'estacion',
  //       'estado',
  //       'solicitante',
  //     ],
  //     skip: (page - 1) * limit,
  //     take: limit,
  //   });

  //   const listadoEnCurso = {
  //     statusCode: '200',
  //     message: 'Emergencias-En Curso',
  //     data: emergencias,
  //     count: total,
  //   };
  //   return listadoEnCurso;
  // }

  async allEmergencyInProgress() {
    const [emergencias, total] = await this.emergenciaRepository.findAndCount({
      where: { estado: EstadoEmergenciaEnum.ENCURSO },
      select: [
        'fechaDespacho',
        'horaDespacho',
        'codEmergencia',
        'tipoEmergencia',
        'direccion',
        'estacion',
        'estado',
        'solicitante',
        'uuidEmergencia'
      ],
    });

    const listadoEnCurso = {
      statusCode: '200',
      message: 'Emergencias-En Curso',
      data: emergencias,
      count: total,
    };
    return listadoEnCurso;
  }

  async allEmergencyfinished(page: number, limit: number) {
    const [emergencias, total] = await this.emergenciaRepository.findAndCount({
      where: { estado: EstadoEmergenciaEnum.FINALIZADA },
      select: [
        'fechaDespacho',
        'horaDespacho',
        'codEmergencia',
        'tipoEmergencia',
        'direccion',
        'estacion',
        'estado',
        'solicitante',
        'casaSalud',
        'codEmergencia',
        'horaLlegadaCasaMedica',
        'horaLlegadaEmergencia',
        'horaLlegadaEstacion',
        'horaTrabajoTerminado',
        'kmEntrada',
        'kmSalida',
        'kmRecorrido',
        'numeroParteEmergencia',
        'observaciones',
        'operador',
        'tiempoFueraEstacion',
        'tiempoLlegadaEmergencia',
        'tiempoSalidaEstacion',
        'uuidEmergencia'
      ],
      skip: (page - 1) * limit,
      take: limit,
    });

    const listadoEnCurso = {
      statusCode: '200',
      message: 'Emergencias-Finalizadas',
      data: emergencias,
      count: total,
    };
    return listadoEnCurso;
  }

  async updateEmergency(
    uuid: string,
    updateEmergenciaDto: UpdateEmergenciaDto,
  ): Promise<any> {
    const emergencia = await this.emergenciaRepository.findOne({
      where: { uuidEmergencia: uuid },
    });
    if (!emergencia) {
      throw new NotFoundException('Registro no encontrado');
    }
    return await this.emergenciaRepository.update(uuid, updateEmergenciaDto);
  }

  async emergencyFinalizedState(
    uuid: string,
    updateEmergenciaDto: UpdateEmergenciaDto,
  ): Promise<any> {
    const emergencia = await this.emergenciaRepository.findOne({
      where: { uuidEmergencia: uuid },
    });
    if (!emergencia) {
      throw new NotFoundException('Registro no encontrado');
    }
    emergencia.estado = EstadoEmergenciaEnum.FINALIZADA;
    await this.emergenciaRepository.save(emergencia);
    return this.emergenciaRepository.update(uuid, emergencia);
  }

  async searchEmergency(busqueda: SearchEmergenciaDto) {
    const query = this.emergenciaRepository.createQueryBuilder('emergencia');

    if (busqueda.fechaDespacho) {
      query.orWhere('emergencia.fechaDespacho = :fechaDespacho', {
        fechaDespacho: busqueda.fechaDespacho,
      });
    }

    if (busqueda.codEmergencia) {
      query.orWhere('emergencia.codEmergencia = :codEmergencia', {
        codEmergencia: busqueda.codEmergencia,
      });
    }

    if (busqueda.tipoEmergencia) {
      query.orWhere('emergencia.tipoEmergencia = :tipoEmergencia', {
        tipoEmergencia: busqueda.tipoEmergencia,
      });
    }

    if (busqueda.estacion) {
      query.orWhere('emergencia.estacion = :estacion', {
        estacion: busqueda.estacion,
      });
    }

    const data = await query
      .select([
        'emergencia.fechaDespacho',
        'emergencia.horaDespacho',
        'emergencia.direccion',
        'emergencia.tipoEmergencia',
        'emergencia.codEmergencia',
        'emergencia.estacion',
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
    query: SelectQueryBuilder<EmergenciaEntity>,
  ): Promise<number> {
    return await query.getCount();
  }
}
