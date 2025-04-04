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

const remove = async (ctx: Context<{ Bindings: Bindings }>, id: number) => {
  const repo = new ProductCategoryRepository(ctx.env.DB);

  try {
    const categoryExists = await repo.getById(id);

    if (!categoryExists) return ctx.json({ error: 'Category not found' }, 404);

    const result = await repo.delete(id);
    return ctx.json(result);
  } catch (error) {
    return ctx.json({ error }, 500);
  }
};

export { create, list, remove };
