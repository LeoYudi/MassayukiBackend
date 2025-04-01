import { Context } from 'hono';
import { ProductCategoryRepository } from 'repositories/productCategory.repository';
import { Bindings } from 'types/bindings';

const list = async (ctx: Context<{ Bindings: Bindings }>) => {
  const repo = new ProductCategoryRepository(ctx.env.DB);

  try {
    const result = await repo.listAll();
    return ctx.json(result);
  } catch (error) {
    return ctx.json({ error }, 500);
  }
};

const create = async (ctx: Context<{ Bindings: Bindings }>, name: string) => {
  const repo = new ProductCategoryRepository(ctx.env.DB);

  try {
    const result = await repo.create(name);
    return ctx.json(result);
  } catch (error) {
    return ctx.json({ error }, 500);
  }
};

export { create, list };
