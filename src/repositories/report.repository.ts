import { PrismaD1 } from '@prisma/adapter-d1';
import { PrismaClient } from '@prisma/client';

export class ReportRepository {
  prisma: PrismaClient;

  constructor(database: D1Database) {
    this.prisma = new PrismaClient({ adapter: new PrismaD1(database) });
  }

  async listAll() {
    try {
      return await this.prisma.report.findMany();
    } catch (err) {
      return { error: `Failed to run query: ${err}` };
    }
  }

  async create(
    pix: number,
    credit: number,
    debit: number,
    money: number,
    type: string,
    date: Date
  ) {
    try {
      return await this.prisma.report.create({
        data: {
          pix,
          credit,
          debit,
          money,
          type,
          date,
        },
      });
    } catch (err) {
      return { error: `Failed to run query: ${err}` };
    }
  }
}
