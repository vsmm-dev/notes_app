export class UpdateNoteDto {
  title?: string;
  content?: string;
  archived?: boolean;
  categoryIds?: number[]; // Array de IDs de categorías para actualizar
}
