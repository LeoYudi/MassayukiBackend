import { Bool, OpenAPIRoute } from 'chanfana';
import { z } from 'zod';
import { Context } from 'hono';

import {
  ProductCategoryBodyZod,
  ProductCategoryReturnZod,
} from 'types/productCategory';
import { Bindings } from 'types/bindings';

import * as ProductCategoryServices from 'services/productCategory.service';

export class ProductCategoryCreate extends OpenAPIRoute {
  schema = {
    tags: ['Product Categories'],
    summary: 'Create a new Product Category',
    request: {
      body: {
        content: {
          'application/json': {
            schema: ProductCategoryBodyZod,
          },
        },
      },
    },
    responses: {
      '200': {
        description: 'Returns the created category',
        content: {
          'application/json': {
            schema: ProductCategoryReturnZod,
          },
        },
      },
    },
  };

  async handle(ctx: Context<{ Bindings: Bindings }>) {
    const data = await this.getValidatedData<typeof this.schema>();

    const body = data.body;

    return await ProductCategoryServices.create(ctx, body.name);
  }
}
