import { Context } from 'hono';
import { Bindings } from 'types/bindings';

import * as ProductCategoryService from 'services/productCategory.service';

const create = async (ctx: Context<{ Bindings: Bindings }>) => {
  const { name } = await ctx.req.json();
  return await ProductCategoryService.create(ctx, name);
};

export { create };
