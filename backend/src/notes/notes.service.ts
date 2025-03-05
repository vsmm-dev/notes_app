// src/notes/note.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Note } from './entities/note.entity';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { Category } from '../category/entities/category.entity';

@Injectable()
export class NoteService {
  constructor(
    @InjectModel(Note)
    private noteModel: typeof Note,
  ) {}

  // Método para crear una nota y asociar categorías
  async createNote(createNoteDto: CreateNoteDto): Promise<Note> {
    const note = new Note();
    note.title = createNoteDto.title;
    note.content = createNoteDto.content;
    note.archived = createNoteDto.archived || false;
    note.userId = createNoteDto.userId; // Asignar el usuario

    // Guardar la nota primero
    await note.save();

    // Asociar las categorías a la nota
    if (createNoteDto.categoryIds && createNoteDto.categoryIds.length > 0) {
      await note.$set('categories', createNoteDto.categoryIds);
    }

    // Retornar la nota con las categorías asociadas
    return note;
  }

  // Método para obtener todas las notas con las categorías asociadas
  async getAllNotes(): Promise<Note[]> {
    return this.noteModel.findAll({
      include: [Category], // Incluir las categorías asociadas
    });
  }

  // Método para obtener una nota por ID con las categorías asociadas
  async getNoteById(id: number): Promise<Note> {
    return this.noteModel.findByPk(id, {
      include: [Category], // Incluir las categorías asociadas
    });
  }

  // Método para actualizar una nota
  async updateNote(id: number, updateNoteDto: UpdateNoteDto): Promise<Note> {
    const note = await this.getNoteById(id);
    if (updateNoteDto.title) note.title = updateNoteDto.title;
    if (updateNoteDto.content) note.content = updateNoteDto.content;
    if (updateNoteDto.archived !== undefined)
      note.archived = updateNoteDto.archived;

    // Si las categorías también se van a actualizar, gestionarlas
    if (updateNoteDto.categoryIds && updateNoteDto.categoryIds.length > 0) {
      await note.$set('categories', updateNoteDto.categoryIds); // Actualiza la relación de categorías
    }

    return note.save();
  }

  // Método para eliminar una nota
  async deleteNote(id: number): Promise<void> {
    const note = await this.getNoteById(id);
    await note.destroy();
  }
}
