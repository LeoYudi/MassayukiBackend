import { OpenAPIRoute } from 'chanfana';
import { z } from 'zod';
import { Context } from 'hono';

import { ProductBodyZod, ProductReturnZod } from 'types/product';
import { Bindings } from 'types/bindings';

import * as ProductServices from 'services/product.service';

export class ProductUpdate extends OpenAPIRoute {
  schema = {
    tags: ['Products'],
    summary: 'Update a new Product',
    request: {
      body: {
        content: {
          'application/json': {
            schema: ProductBodyZod,
          },
        },
      },
      params: z.object({
        id: z.string(),
      }),
    },
    responses: {
      '200': {
        description: 'Returns the updated product',
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
    const { name, description, categoryId, price } = data.body;

    return await ProductServices.update(ctx, +id, {
      name,
      description,
      categoryId,
      price,
    });
  }
}
