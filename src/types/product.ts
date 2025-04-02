import { DateTime, Str, Num } from 'chanfana';
import { z } from 'zod';

export type ProductType = {
  name: string;
  description?: string;
  price: number;
  categoryId?: number;
};

export const ProductBodyZod = z.object({
  name: Str(),
  description: Str({ required: false }),
  price: Num(),
  categoryId: Num(),
});

export const ProductReturnZod = z.object({
  id: Num(),
  name: Str(),
  description: Str(),
  price: Str({ default: '10.21' }),
  categoryId: Num(),
  createdAt: DateTime(),
});
