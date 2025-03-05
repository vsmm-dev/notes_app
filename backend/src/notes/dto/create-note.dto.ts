// src/notes/dto/create-note.dto.ts
export class CreateNoteDto {
  title: string;
  content: string;
  archived?: boolean;
  userId: number; // ID del usuario que crea la nota
  categoryIds: number[]; // Array de IDs de categorías
}
