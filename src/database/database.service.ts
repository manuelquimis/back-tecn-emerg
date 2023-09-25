import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

export const pgServices = [
  ConfigModule.forRoot({ isGlobal: true, cache: true }),
  TypeOrmModule.forRoot({
    type: 'postgres',
    host: process.env.AZURE_POSTGRESQL_HOST,
    port: parseInt(process.env.AZURE_POSTGRESQL_PORT),
    username: process.env.AZURE_POSTGRESQL_USER,
    password: process.env.AZURE_POSTGRESQL_PASSWORD,
    database: process.env.AZURE_POSTGRESQL_DATABASE,
    autoLoadEntities: true,
    synchronize: true,
  }),
];

// host: process.env.HOST_DB,
// port: parseInt(process.env.PORT_DB),
// username: process.env.USER_DB,
// password: process.env.PASS_DB,
// database: process.env.DATA_DB,