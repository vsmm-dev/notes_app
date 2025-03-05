// src/notes/entities/note.entity.ts
import {
  Column,
  ForeignKey,
  Model,
  Table,
  BelongsTo,
  BelongsToMany,
} from 'sequelize-typescript';
import { User } from '../../users/entities/user.entity'; // Importamos la entidad User
import { Category } from '../../category/entities/category.entity'; // Importamos la entidad Category
import { NoteCategory } from '../../category/entities/note-category.entity'; // Importamos la entidad de relación de categorías

@Table
export class Note extends Model<Note> {
  @Column
  title: string; // Título de la nota

  @Column
  content: string; // Contenido de la nota

  @Column
  archived: boolean; // Estado de archivado de la nota

  @ForeignKey(() => User) // Relación de muchos a uno con User (un usuario puede tener muchas notas)
  @Column
  userId: number; // La columna que hace referencia al usuario propietario de la nota

  @BelongsTo(() => User) // Relación inversa con User (una nota pertenece a un usuario)
  user: User;

  @BelongsToMany(() => Category, () => NoteCategory) // Relación de muchos a muchos con Category (una nota puede pertenecer a varias categorías)
  categories: Category[];
}
