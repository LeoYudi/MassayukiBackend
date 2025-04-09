import { DateTime, Enumeration, Num, Str } from 'chanfana';
import { z } from 'zod';

export type ReportType = {
  type: string;
  date: string;
};

export const ReportBodyZod = z.object({
  type: Enumeration({ values: ['daily', 'monthly'], required: true }),
  date: Str({ required: true }),
});

export const ReportReturnZod = z.object({
  id: Num(),
  pix: Num(),
  credit: Num(),
  debit: Num(),
  money: Num(),
  type: Str(),
  date: DateTime(),
  createdAt: DateTime(),
});
