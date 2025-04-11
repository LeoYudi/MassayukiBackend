import { OrderRepository } from 'repositories/order.repository';

export const scheduled = async (
  controller: ScheduledController,
  env: any,
  ctx: ExecutionContext
) => {
  const repo = new OrderRepository(env.DB);
  const now = new Date();
  const lastYear = new Date();
  lastYear.setFullYear(now.getFullYear() - 1);

  const orders: any = await repo.listAll(undefined, lastYear, true);

  const promises = [];
  for (const order of orders) {
    promises.push(async () => {
      await repo.delete(order.id);
    });
  }

  await Promise.all(promises);
};
