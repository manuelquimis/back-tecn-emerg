import { DatabaseModule } from './database/database.module';
import { ModulesModule } from './modules/modules.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [DatabaseModule, ModulesModule],
})
export class AppModule {}
