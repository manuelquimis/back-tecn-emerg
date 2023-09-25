import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { EmergenciasService } from './emergencias.service';
import { CreateEmergenciaDto } from './dto/create-emergencia.dto';
import { UpdateEmergenciaDto } from './dto/update-emergencia.dto';
import {
  stateFinalizedEmergencyMessage,
  updatedEmergencyMessage,
} from '../common/utils/customResponse';
import { SearchEmergenciaDto } from './dto/search-emergencia.dto';
import { AuthGuard } from '../auth/guards/auth.guard';
import { RolesGuard } from '../common/guard/roles.guard';
import { Roles } from '../common/decorator/roles.decorator';
import { RolesEnum } from '../common/enum/role.enum';

@Controller('emergencias')
export class EmergenciasController {
  constructor(private readonly emergenciasService: EmergenciasService) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(RolesEnum.DELTA)
  @Post('nuevo')
  async createEmergency(@Body() createEmergenciaDto: CreateEmergenciaDto) {
    return this.emergenciasService.createEmergency(createEmergenciaDto);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Get('detalle/:uuid')
  async findInfoEmergencyByUuid(@Param('uuid') uuid: string){
    try {
      return await this.emergenciasService.findOneByUuid(uuid)
    } catch (error) {
      throw new NotFoundException('No fue encontrado el usuario')
      
    }
  }


  @UseGuards(AuthGuard, RolesGuard)
  @Get('encurso')
  findAllEncurso(
    // @Query('page', ParseIntPipe) page: number = 1,
    // @Query('limit', ParseIntPipe) limit: number = 10,
  ) {
    // return this.emergenciasService.allEmergencyInProgress(page, limit);
    return this.emergenciasService.allEmergencyInProgress();
  }

  // @Roles(RolesEnum.JOPERATION)
  @UseGuards(AuthGuard, RolesGuard)
  @Get('finalizada')
  AllEmergencyFinished(
    @Query('page', ParseIntPipe) page: number = 1,
    @Query('limit', ParseIntPipe) limit: number = 10,
  ) {
    return this.emergenciasService.allEmergencyfinished(page, limit);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(RolesEnum.ADMIN)
  @Delete(':uuid')
  async softDeleteEmergency(@Param('uuid') uuidEmergencia: string) {
    try {
      return await this.emergenciasService.softDeleteEmergency(uuidEmergencia);
    } catch (error) {
      throw new NotFoundException('Registro no encontrado');
    }
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(RolesEnum.DELTA)
  @Patch(':uuid')
  async updateEmergencia(
    @Param('uuid') uuid: string,
    @Body() updateEmergenciaDto: UpdateEmergenciaDto,
  ) {
    try {
      await this.emergenciasService.updateEmergency(uuid, updateEmergenciaDto);
      return updatedEmergencyMessage;
    } catch (error) {
      throw new NotFoundException('Registro no encontrado');
    }
  }

  // @UseGuards(AuthGuard, RolesGuard)
  // @Roles(RolesEnum.DELTA)
  // @Patch('finalizar/:uuid')
  // async updateStateEmergencia(
  //   @Param('uuid') uuid: string,
  //   @Body() updateEmergenciaDto: UpdateEmergenciaDto,
  // ) {
  //   try {
  //     await this.emergenciasService.updateEmergency(uuid, updateEmergenciaDto);
  //     return stateFinalizedEmergencyMessage;
  //   } catch (error) {
  //     throw new NotFoundException('Registro no encontrado');
  //   }
  // }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(RolesEnum.DELTA)
  @Delete('finalizar/:uuid')
  async updateStateEmergencia(
    @Param('uuid') uuid: string,
  ) {
    try {
      await this.emergenciasService.estadoFinalizadoEmergency(uuid);
      return stateFinalizedEmergencyMessage;
    } catch (error) {
      throw new NotFoundException('Registro no encontrado');
    }
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(RolesEnum.JOPERATION)
  @Get('search')
  async searchEmergency(@Query() busqueda: SearchEmergenciaDto) {
    try {
      return this.emergenciasService.searchEmergency(busqueda);
    } catch (error) {
      throw new NotFoundException('No se pudo procesar su petición');
    }
  }
}
