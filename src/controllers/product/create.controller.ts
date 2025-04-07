import { OpenAPIRoute } from 'chanfana';
import { z } from 'zod';
import { Context } from 'hono';

import { ProductBodyZod, ProductReturnZod } from 'types/product';
import { Bindings } from 'types/bindings';

import * as ProductServices from 'services/product.service';

export class ProductCreate extends OpenAPIRoute {
  schema = {
    tags: ['Products'],
    summary: 'Create a new Product',
    request: {
      body: {
        content: {
          'application/json': {
            schema: ProductBodyZod,
          },
        },
      },
    },
    responses: {
      '200': {
        description: 'Returns the created product',
        content: {
          'application/json': {
            schema: z.object({
              ProductReturnZod,
            }),
          },
        },
      },
    },
  };

  async handle(ctx: Context<{ Bindings: Bindings }>) {
    const data = await this.getValidatedData<typeof this.schema>();

    const { name, description, categoryId, price } = data.body;

    return await ProductServices.create(ctx, {
      name,
      description,
      categoryId,
      price,
    });
  }
}
