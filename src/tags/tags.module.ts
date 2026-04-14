import { Module } from '@nestjs/common';
import { TagsService } from './tags.service';
import { TagsController } from './tags.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TagsEntity } from './tags.entity';

@Module({
  imports:[TypeOrmModule.forFeature([TagsEntity])],
  controllers: [TagsController],
  providers: [TagsService],
})
export class TagsModule {}
