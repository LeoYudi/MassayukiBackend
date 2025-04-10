import { OpenAPIRoute } from 'chanfana';
import { Context } from 'hono';
import { Bindings } from 'types/bindings';
import { ReportReturnZod } from 'types/report';
import { z } from 'zod';

import * as ReportService from 'services/report.service';

export class ReportList extends OpenAPIRoute {
  schema = {
    tags: ['Reports'],
    summary: 'List all Reports',
    responses: {
      '200': {
        description: 'Returns all Reports',
        content: {
          'application/json': {
            schema: z.array(ReportReturnZod),
          },
        },
      },
    },
  };

  async handle(ctx: Context<{ Bindings: Bindings }>) {
    return await ReportService.list(ctx);
  }
}
