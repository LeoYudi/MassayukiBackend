import { Context } from 'hono';
import { Bindings } from 'types/bindings';

import { ReportRepository } from 'repositories/report.repository';
import { OrderRepository } from 'repositories/order.repository';

import { ReportType } from 'types/report';

const list = async (ctx: Context<{ Bindings: Bindings }>) => {
  const repo = new ReportRepository(ctx.env.DB);

  try {
    const result = await repo.listAll();
    return ctx.json(result);
  } catch (error) {
    return ctx.json({ error }, 500);
  }
};

const create = async (
  ctx: Context<{ Bindings: Bindings }>,
  { type, date }: ReportType
) => {
  const repo = new ReportRepository(ctx.env.DB);
  const ordersRepo = new OrderRepository(ctx.env.DB);

  const dateObject = new Date(date);
  let startDate = new Date(dateObject),
    endDate = new Date(dateObject);

  if (type === 'daily') {
    startDate.setHours(0, 0, 0, 0);
    endDate.setHours(23, 59, 59, 999);
  } else if (type === 'monthly') {
    startDate.setHours(0, 0, 0, 0);
    endDate.setMonth(dateObject.getMonth() + 1);
    endDate.setDate(-1);
    endDate.setHours(23, 59, 59, 999);
  }

  const newReport = {
    pix: 0,
    credit: 0,
    debit: 0,
    money: 0,
  };

  try {
    const orders: any = await ordersRepo.listAll(startDate, endDate, true);

    for (const order of orders)
      newReport[order.paymentMethod] += parseFloat(order.totalPrice);

    const result = await repo.create(
      newReport.pix,
      newReport.credit,
      newReport.debit,
      newReport.money,
      type,
      startDate
    );

    return ctx.json(result);
  } catch (error) {
    return ctx.json({ error }, 500);
  }
};

export { list, create };
