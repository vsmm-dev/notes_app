// src/user/entities/user.entity.ts
import { Column, Model, Table, HasMany } from 'sequelize-typescript';
import { Note } from '../../notes/entities/note.entity'; // Importamos la entidad Note

@Table
export class User extends Model<User> {
  @Column
  username: string;

  @Column
  email: string;

  @Column
  password: string; // En un entorno real, asegúrate de hashear la contraseña

  @HasMany(() => Note) // Relación de uno a muchos con la entidad Note
  notes: Note[];
}
