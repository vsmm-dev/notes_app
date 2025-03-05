// src/notes/note.module.ts
import { Module } from '@nestjs/common';
import { NoteController } from './notes.controller';
import { NoteService } from './notes.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Note } from './entities/note.entity';
import { Category } from '../category/entities/category.entity';
import { NoteCategory } from '../category/entities/note-category.entity';

@Module({
  imports: [SequelizeModule.forFeature([Note, Category, NoteCategory])],
  controllers: [NoteController],
  providers: [NoteService],
})
export class NoteModule {}
