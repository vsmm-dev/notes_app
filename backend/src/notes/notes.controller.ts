// src/notes/note.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { NoteService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { Note } from './entities/note.entity';

@Controller('notes')
export class NoteController {
  constructor(private readonly noteService: NoteService) {}

  @Post()
  create(@Body() createNoteDto: CreateNoteDto): Promise<Note> {
    return this.noteService.createNote(createNoteDto);
  }

  @Get()
  findAll(): Promise<Note[]> {
    return this.noteService.getAllNotes();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Note> {
    return this.noteService.getNoteById(+id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateNoteDto: UpdateNoteDto,
  ): Promise<Note> {
    return this.noteService.updateNote(+id, updateNoteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.noteService.deleteNote(+id);
  }
}
