import { Bool, OpenAPIRoute } from 'chanfana';
import { z } from 'zod';
import { Context } from 'hono';

import { ProductCategoryReturnZod } from 'types/productCategory';
import { Bindings } from 'types/bindings';

import * as ProductCategoryServices from 'services/productCategory.service';

export class ProductCategoryDelete extends OpenAPIRoute {
  schema = {
    tags: ['Product Categories'],
    summary: 'List all Product Categories',
    request: {
      params: z.object({
        id: z.string(),
      }),
    },
    responses: {
      '200': {
        description: 'Returns all product categories',
        content: {
          'application/json': {
            schema: z.object({
              series: z.object({
                success: Bool(),
                result: z.array(ProductCategoryReturnZod),
              }),
            }),
          },
        },
      },
    },
  };

  async handle(ctx: Context<{ Bindings: Bindings }>) {
    const data = await this.getValidatedData<typeof this.schema>();
    const { id } = data.params;

    return await ProductCategoryServices.remove(ctx, +id);
  }
}
