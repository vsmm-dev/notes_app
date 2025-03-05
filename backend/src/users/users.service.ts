// src/user/user.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcryptjs'; // Importa bcryptjs

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  // Crear un nuevo usuario
  async create(createUserDto: CreateUserDto): Promise<User> {
    const { username, email, password } = createUserDto;

    // Verificar si el email ya está registrado
    const existingUser = await this.userModel.findOne({ where: { email } });
    if (existingUser) {
      throw new Error('Email already in use');
    }

    const hashedPassword = await bcrypt.hash(password, 10); // Hashear la contraseña antes de guardarla
    const user = new User({ username, email, password: hashedPassword });
    return user.save();
  }

  // Obtener todos los usuarios
  async findAll(): Promise<User[]> {
    return this.userModel.findAll();
  }

  // Obtener un usuario por su ID
  async findById(id: number): Promise<User> {
    const user = await this.userModel.findByPk(id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  // Actualizar un usuario
  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findById(id);
    return user.update(updateUserDto);
  }

  // Eliminar un usuario
  async remove(id: number): Promise<void> {
    const user = await this.findById(id);
    await user.destroy();
  }

  // Obtener un usuario por su email
  async getUserByEmail(email: string): Promise<User> {
    return this.userModel.findOne({ where: { email } });
  }

  // Verificar si la contraseña es correcta
  async validatePassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }
}
