import { OpenAPIRoute } from 'chanfana';
import { z } from 'zod';
import { Context } from 'hono';

import { OrderReturnWithJoinsZod } from 'types/order';
import { Bindings } from 'types/bindings';

import * as OrderServices from 'services/order.service';

export class OrderList extends OpenAPIRoute {
  schema = {
    tags: ['Orders'],
    summary: 'List all Orders',
    responses: {
      '200': {
        description: 'Returns all Orders',
        content: {
          'application/json': {
            schema: z.object({
              series: z.array(OrderReturnWithJoinsZod),
            }),
          },
        },
      },
    },
  };

  async handle(ctx: Context<{ Bindings: Bindings }>) {
    return await OrderServices.list(ctx);
  }
}
