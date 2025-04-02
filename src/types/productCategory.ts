import { DateTime, Str } from 'chanfana';
import { number, z } from 'zod';

export type ProductCategoryType = {
  id: number;
  name: string;
  createdAt: string;
};

export const ProductCategoryBodyZod = z.object({
  name: Str(),
});

export const ProductCategoryReturnZod = z.object({
  id: number(),
  name: Str(),
  createdAt: DateTime(),
});
