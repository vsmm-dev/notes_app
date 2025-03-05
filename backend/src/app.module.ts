// src/app.module.ts
import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { SequelizeModule } from '@nestjs/sequelize';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { UserModule } from './users/users.module';
import { CategoryModule } from './category/category.module';
import { NoteModule } from './notes/notes.module';
import { AuthModule } from './auth/auth.module';
import { User } from './users/entities/user.entity';
import { Category } from './category/entities/category.entity';
import { Note } from './notes/entities/note.entity';
import { NoteCategory } from './category/entities/note-category.entity';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: process.env.DATABASE_HOST || 'localhost',
      port: parseInt(process.env.DATABASE_PORT) || 3306,
      username: process.env.DATABASE_USER || 'root',
      password: process.env.DATABASE_PASSWORD || 'secret',
      database: process.env.DATABASE_NAME || 'notesapp',
      models: [User, Category, Note, NoteCategory],
      autoLoadModels: true,
      synchronize: true,
    }),
    UserModule,
    CategoryModule,
    NoteModule,
    AuthModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
