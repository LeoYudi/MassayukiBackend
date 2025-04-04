import { Context } from 'hono';
import { OrderRepository } from 'repositories/order.repository';
import { Bindings } from 'types/bindings';
import { OrderType } from 'types/order';

const list = async (ctx: Context<{ Bindings: Bindings }>) => {
  const repo = new OrderRepository(ctx.env.DB);

  try {
    const result = await repo.listAll();
    return ctx.json(result);
  } catch (error) {
    return ctx.json({ error }, 500);
  }
};

const create = async (
  ctx: Context<{ Bindings: Bindings }>,
  { totalPrice, customer, tableNumber, orderItems, note }: OrderType
) => {
  const repo = new OrderRepository(ctx.env.DB);

  try {
    const result = await repo.create(
      totalPrice,
      customer,
      tableNumber,
      note,
      orderItems
    );
    return ctx.json(result);
  } catch (error) {
    return ctx.json({ error }, 500);
  }
};

const pay = async (
  ctx: Context<{ Bindings: Bindings }>,
  id: number,
  paymentMethod: string
) => {
  const repo = new OrderRepository(ctx.env.DB);

  try {
    const orderExists = await repo.getById(id);

    if (!orderExists) return ctx.json({ error: 'Not found' }, 404);
  } catch (error) {
    return ctx.json({ error }, 500);
  }
};

const remove = async (ctx: Context<{ Bindings: Bindings }>, id: number) => {
  const repo = new OrderRepository(ctx.env.DB);

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
