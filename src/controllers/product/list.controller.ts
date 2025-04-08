import { OpenAPIRoute } from 'chanfana';
import { z } from 'zod';
import { Context } from 'hono';

import { ProductReturnWithJoinsZod } from 'types/product';
import { Bindings } from 'types/bindings';

import * as ProductServices from 'services/product.service';

export class ProductList extends OpenAPIRoute {
  schema = {
    tags: ['Products'],
    summary: 'List all Products',
    responses: {
      '200': {
        description: 'Returns all products',
        content: {
          'application/json': {
            schema: z.array(ProductReturnWithJoinsZod),
          },
        },
      },
    },
  };

  async handle(ctx: Context<{ Bindings: Bindings }>) {
    return await ProductServices.list(ctx);
  }
}
