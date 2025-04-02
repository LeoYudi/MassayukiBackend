import { PrismaD1 } from '@prisma/adapter-d1';
import { PrismaClient } from '@prisma/client';

export class ProductCategoryRepository {
  prisma: PrismaClient;

  constructor(database: D1Database) {
    this.prisma = new PrismaClient({ adapter: new PrismaD1(database) });
  }

  async getById(id: number) {
    try {
      return await this.prisma.productCategory.findUnique({
        where: { id },
      });
    } catch (err) {
      return { error: `Failed to run query: ${err}` };
    }
  }

  async listAll() {
    try {
      return await this.prisma.productCategory.findMany();
    } catch (err) {
      return { error: `Failed to run query: ${err}` };
    }
  }

  async create(name: string) {
    try {
      return await this.prisma.productCategory.create({ data: { name } });
    } catch (err) {
      return { error: `Failed to run query: ${err}` };
    }
  }

  async delete(id: number) {
    try {
      return await this.prisma.productCategory.delete({ where: { id } });
    } catch (err) {
      return { error: `Failed to run query: ${err}` };
    }
  }
}
