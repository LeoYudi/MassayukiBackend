import { Enumeration, OpenAPIRoute } from 'chanfana';
import { z } from 'zod';
import { Context } from 'hono';

import { OrderReturnZod } from 'types/order';
import { Bindings } from 'types/bindings';

import * as OrderServices from 'services/order.service';

export class OrderPay extends OpenAPIRoute {
  schema = {
    tags: ['Orders'],
    summary: 'Pay a unpaid Order',
    request: {
      body: {
        content: {
          'application/json': {
            schema: z.object({
              paymentMethod: Enumeration({
                values: ['pix', 'credit', 'debit', 'money'],
              }),
            }),
          },
        },
      },
      params: z.object({
        id: z.string(),
      }),
    },
    responses: {
      '200': {
        description: 'Returns the updated order',
        content: {
          'application/json': {
            schema: OrderReturnZod,
          },
        },
      },
    },
  };

  async handle(ctx: Context<{ Bindings: Bindings }>) {
    const data = await this.getValidatedData<typeof this.schema>();

    const { id } = data.params;
    const { paymentMethod } = data.body;

    return await OrderServices.pay(ctx, +id, paymentMethod);
  }
}
