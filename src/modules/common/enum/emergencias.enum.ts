export enum EstadoEmergenciaEnum {
  ENCURSO = 'En Curso',
  FINALIZADA = 'Finalizado',
  ELIMINADA = 'Eliminado',
}

export enum SolicitanteEnum {
  ECU911 = 'Ecu-911',
  ALERTANTE = 'Alertante',
}

export enum CodEmergenciaEnum {
  cod10_30 = '10-20',
  cod10_31 = '10-31',
  cod10_32 = '10-32',
  cod10_33 = '10-33',
  cod10_45 = '10-45',
  cod10_50 = '10-50',
  cod10_60 = '10-60',
  cod10_70 = '10-70',
  cod10_80 = '10-80',

}

export enum TipoEmergenciaEnum {
  INCENDIO_ESTRUCTURAL = 'Incendio Estructural',
  INCENDIO_FORESTAL = 'Incendio Forestal',
  INCENDIO_VEHICULAR = 'Incendio Vehícular',
  RESCATE_ALTURA = 'Rescate en Altura',
  DERRAME_QUIMICO = 'Derrame Químico',
  RESCATE_ACUATICO = 'Rescate Acuático',
  FUGA_GAS = 'Fuga de Gas',
  EVACUACION_EDIFICIO = 'Evacuación de Edificio',
  EMERGENCIA_MEDICA = 'Emergencia Médica',
}

export enum OperadorEnum {}

export enum EstacionesEnum {
  ESTACION1 = 'Estación 1',
  ESTACION2 = 'Estación 2',
  ESTACION3 = 'Estación 3',
  ESTACION4 = 'Estación 4',
  ESTACION5 = 'Estación 5',
  ESTACION6 = 'Estación 6',
}

export enum CodVehiculosEnum {
  MOTOR_BOMBERO = 'E1',
  CAMION_ESCALERA = 'T1',
  VEHICULO_RESCATE = 'R1',
  CAMION_HAZMAT = 'H1',
  CAMION_FORESTAL = 'B1',
  AMBULANCIA = 'A1',
}
