import { OpenAPIRoute } from 'chanfana';
import { z } from 'zod';
import { Context } from 'hono';

import { OrderReturnZod } from 'types/order';
import { Bindings } from 'types/bindings';

import * as OrderServices from 'services/order.service';

export class OrderDelete extends OpenAPIRoute {
  schema = {
    tags: ['Orders'],
    summary: 'Delete one Order',
    request: {
      params: z.object({
        id: z.string(),
      }),
    },
    responses: {
      '200': {
        description: 'Return the deleted Order',
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
    const { id } = data.params;

    return await OrderServices.remove(ctx, +id);
  }
}
