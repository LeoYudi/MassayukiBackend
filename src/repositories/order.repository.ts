import { PrismaD1 } from '@prisma/adapter-d1';
import { PrismaClient } from '@prisma/client';
import { OrderItem } from 'types/order';

export class OrderRepository {
  prisma: PrismaClient;

  constructor(database: D1Database) {
    this.prisma = new PrismaClient({ adapter: new PrismaD1(database) });
  }

  async getById(id: number) {
    try {
      return await this.prisma.order.findUnique({
        where: { id },
        include: {
          orderItems: {
            include: {
              product: true,
            },
          },
        },
      });
    } catch (err) {
      return { error: `Failed to run query: ${err}` };
    }
  }

  async listAll() {
    try {
      return await this.prisma.order.findMany({
        include: {
          orderItems: {
            include: {
              product: true,
            },
          },
        },
      });
    } catch (err) {
      return { error: `Failed to run query: ${err}` };
    }
  }

  async create(
    totalPrice: number,
    customer: string,
    tableNumber: number,
    orderItems: OrderItem[]
  ) {
    try {
      return await this.prisma.order.create({
        data: {
          paid: false,
          totalPrice,
          customer,
          tableNumber,
          orderItems: { createMany: { data: orderItems } },
        },
      });
    } catch (err) {
      return { error: `Failed to run query: ${err}` };
    }
  }

  async pay(id: number, paymentMethod: string) {
    try {
      return await this.prisma.order.update({
        where: { id },
        data: { paid: true, paymentMethod },
      });
    } catch (err) {
      return { error: `Failed to run query: ${err}` };
    }
  }

  async delete(id: number) {
    try {
      return await this.prisma.order.delete({ where: { id } });
    } catch (err) {
      return { error: `Failed to run query: ${err}` };
    }
  }
}
