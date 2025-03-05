// src/category/category.module.ts
import { Module } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Category } from './entities/category.entity';
import { NoteCategory } from './entities/note-category.entity';
import { Note } from '../notes/entities/note.entity';

@Module({
  imports: [SequelizeModule.forFeature([Category, Note, NoteCategory])],
  controllers: [CategoryController],
  providers: [CategoryService],
})
export class CategoryModule {}
