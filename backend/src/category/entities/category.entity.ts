// src/category/entities/category.entity.ts
import {
  Column,
  Model,
  Table,
  DataType,
  BelongsToMany,
} from 'sequelize-typescript';
import { Note } from '../../notes/entities/note.entity';
import { NoteCategory } from './note-category.entity';

@Table
export class Category extends Model<Category> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @BelongsToMany(() => Note, () => NoteCategory)
  notes: Note[];
}
