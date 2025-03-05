// src/category/category.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Category } from './entities/category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category)
    private categoryModel: typeof Category,
  ) {}

  async createCategory(
    createCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    const category = new Category();
    category.name = createCategoryDto.name;
    return category.save();
  }

  async getAllCategories(): Promise<Category[]> {
    return this.categoryModel.findAll();
  }

  async getCategoryById(id: number): Promise<Category> {
    return this.categoryModel.findByPk(id);
  }

  async updateCategory(
    id: number,
    createCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    const category = await this.getCategoryById(id);
    category.name = createCategoryDto.name;
    return category.save();
  }

  async deleteCategory(id: number): Promise<void> {
    const category = await this.getCategoryById(id);
    await category.destroy();
  }
}
