import { OpenAPIRoute } from 'chanfana';
import { z } from 'zod';
import { Context } from 'hono';

import { OrderBodyZod, OrderReturnZod } from 'types/order';
import { Bindings } from 'types/bindings';

import * as OrderServices from 'services/order.service';

export class OrderCreate extends OpenAPIRoute {
  schema = {
    tags: ['Orders'],
    summary: 'Create a new Order',
    request: {
      body: {
        content: {
          'application/json': {
            schema: OrderBodyZod,
          },
        },
      },
    },
    responses: {
      '200': {
        description: 'Returns the created order',
        content: {
          'application/json': {
            schema: z.object({
              series: OrderReturnZod,
            }),
          },
        },
      },
    },
  };

  async handle(ctx: Context<{ Bindings: Bindings }>) {
    const data = await this.getValidatedData<typeof this.schema>();

    const { customer, orderItems, tableNumber, totalPrice } = data.body;

    return await OrderServices.create(ctx, {
      customer,
      orderItems: orderItems as any,
      totalPrice,
      tableNumber,
    });
  }
}
