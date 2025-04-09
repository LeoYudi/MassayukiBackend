import { OpenAPIRoute } from 'chanfana';
import { Context } from 'hono';

import { ReportBodyZod, ReportReturnZod } from 'types/report';
import { Bindings } from 'types/bindings';

import * as ReportServices from 'services/report.service';

export class ReportCreate extends OpenAPIRoute {
  schema = {
    tags: ['Reports'],
    summary: 'Create a new Report',
    request: {
      body: {
        content: {
          'application/json': {
            schema: ReportBodyZod,
          },
        },
      },
    },
    responses: {
      '200': {
        description: 'Returns the created report',
        content: {
          'application/json': {
            schema: ReportReturnZod,
          },
        },
      },
    },
  };

  async handle(ctx: Context<{ Bindings: Bindings }>) {
    const data = await this.getValidatedData<typeof this.schema>();

    const { date, type } = data.body;

    return await ReportServices.create(ctx, { date, type });
  }
}
