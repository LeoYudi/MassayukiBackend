import { Context } from 'hono';
import { ProductRepository } from 'repositories/product.repository';
import { Bindings } from 'types/bindings';
import { ProductType } from 'types/product';

const list = async (ctx: Context<{ Bindings: Bindings }>) => {
  const repo = new ProductRepository(ctx.env.DB);

  try {
    const result = await repo.listAll();
    return ctx.json(result);
  } catch (error) {
    return ctx.json({ error }, 500);
  }
};

const create = async (
  ctx: Context<{ Bindings: Bindings }>,
  { name, description, price, categoryId }: ProductType
) => {
  const repo = new ProductRepository(ctx.env.DB);

  try {
    const result = await repo.create(name, price, categoryId, description);
    return ctx.json(result);
  } catch (error) {
    return ctx.json({ error }, 500);
  }
};

const remove = async (ctx: Context<{ Bindings: Bindings }>, id: number) => {
  const repo = new ProductRepository(ctx.env.DB);

  try {
    const productExists = await repo.getById(id);

    if (!productExists) return ctx.json({ error: 'Product not found' }, 404);

    const result = await repo.delete(id);
    return ctx.json(result);
  } catch (error) {
    return ctx.json({ error }, 500);
  }
};

const update = async (
  ctx: Context<{ Bindings: Bindings }>,
  id: number,
  { name, description, price, categoryId }: ProductType
) => {
  const repo = new ProductRepository(ctx.env.DB);

  try {
    const productExists = await repo.getById(id);

    if (!productExists) return ctx.json({ error: 'Product not found' }, 404);

    const result = await repo.update(id, name, price, categoryId, description);
    return ctx.json(result);
  } catch (error) {
    return ctx.json({ error }, 500);
  }
};

export { create, list, remove, update };
