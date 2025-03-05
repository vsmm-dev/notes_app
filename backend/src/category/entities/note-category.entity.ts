// src/category/entities/note-category.entity.ts
import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
} from 'sequelize-typescript';
import { Note } from '../../notes/entities/note.entity'; // Importar la entidad Note
import { Category } from './category.entity'; // Importar la entidad Category

@Table
export class NoteCategory extends Model<NoteCategory> {
  // Relación con Note (una categoría puede tener muchas notas)
  @ForeignKey(() => Note)
  @Column({
    type: DataType.INTEGER,
    allowNull: false, // Asegura que noteId no sea nulo
  })
  noteId: number;

  // Relación con Category (una nota puede pertenecer a muchas categorías)
  @ForeignKey(() => Category)
  @Column({
    type: DataType.INTEGER,
    allowNull: false, // Asegura que categoryId no sea nulo
  })
  categoryId: number;
}
