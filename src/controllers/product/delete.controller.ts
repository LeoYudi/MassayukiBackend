import { Bool, OpenAPIRoute } from 'chanfana';
import { z } from 'zod';
import { Context } from 'hono';

import { ProductReturnZod } from 'types/product';
import { Bindings } from 'types/bindings';

import * as ProductServices from 'services/product.service';

export class ProductDelete extends OpenAPIRoute {
  schema = {
    tags: ['Products'],
    summary: 'Delete one Product',
    request: {
      params: z.object({
        id: z.string(),
      }),
    },
    responses: {
      '200': {
        description: 'Return the deleted product',
        content: {
          'application/json': {
            schema: z.object({
              series: ProductReturnZod,
            }),
          },
        },
      },
    },
  };

  async handle(ctx: Context<{ Bindings: Bindings }>) {
    const data = await this.getValidatedData<typeof this.schema>();
    const { id } = data.params;

    return await ProductServices.remove(ctx, +id);
  }
}
