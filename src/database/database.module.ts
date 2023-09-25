import { Module } from '@nestjs/common';
import { pgServices } from './database.service';

@Module({
  imports: [...pgServices],
  exports: [...pgServices],
  controllers: [],
  providers: [],
})
export class DatabaseModule {}
