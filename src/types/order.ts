import { Str, Num, DateTime, Bool } from 'chanfana';
import { z } from 'zod';

export type OrderItem = {
  price: number;
  productId: number;
  amount: number;
};

export type OrderType = {
  totalPrice: number;
  customer?: string;
  tableNumber?: number;
  note?: string;
  orderItems: OrderItem[];
};

export const OrderBodyZod = z.object({
  customer: Str({ required: false }),
  tableNumber: Num({ required: false }),
  totalPrice: Num(),
  note: Str({ required: false }),
  orderItems: z.array(
    z.object({
      price: Num(),
      productId: Num(),
      amount: Num(),
    })
  ),
});

export const OrderReturnZod = z.object({
  id: Num(),
  paid: Bool(),
  paymentMethod: Str(),
  customer: Str(),
  tableNumber: Num(),
  totalPrice: Str(),
  note: Str(),
  createdAt: DateTime(),
});

export const OrderReturnWithJoinsZod = z.object({
  id: Num(),
  paid: Bool(),
  paymentMethod: Str(),
  customer: Str(),
  tableNumber: Num(),
  totalPrice: Str(),
  note: Str(),
  createdAt: DateTime(),
  orderItems: z.array(
    z.object({
      id: Num(),
      orderId: Num(),
      price: Str(),
      productId: Num(),
      amount: Num(),
      product: z.object({
        id: Num(),
        name: Str(),
        description: Str(),
        price: Str(),
        categoryId: Num(),
        createdAt: DateTime(),
      }),
    })
  ),
});
