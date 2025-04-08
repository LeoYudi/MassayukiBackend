import { PrismaD1 } from '@prisma/adapter-d1';
import { PrismaClient } from '@prisma/client';

export class ProductRepository {
  prisma: PrismaClient;

  constructor(database: D1Database) {
    this.prisma = new PrismaClient({ adapter: new PrismaD1(database) });
  }

  async getById(id: number) {
    try {
      return await this.prisma.product.findUnique({
        where: { id },
        include: {
          category: true,
        },
      });
    } catch (err) {
      return { error: `Failed to run query: ${err}` };
    }
  }

  async listAll() {
    try {
      return await this.prisma.product.findMany({
        include: { category: true },
      });
    } catch (err) {
      return { error: `Failed to run query: ${err}` };
    }
  }

  async create(
    name: string,
    price: number,
    categoryId: number,
    description: string
  ) {
    try {
      return await this.prisma.product.create({
        data: { name, description, price, categoryId },
      });
    } catch (err) {
      return { error: `Failed to run query: ${err}` };
    }
  }

  async delete(id: number) {
    try {
      return await this.prisma.product.delete({ where: { id } });
    } catch (err) {
      return { error: `Failed to run query: ${err}` };
    }
  }

  async update(
    id: number,
    name: string,
    price: number,
    categoryId: number,
    description: string
  ) {
    try {
      return await this.prisma.product.update({
        where: { id },
        data: { name, description, price, categoryId },
      });
    } catch (err) {
      return { error: `Failed to run query: ${err}` };
    }
  }
}
