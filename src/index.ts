import { fromHono } from 'chanfana';
import { Hono } from 'hono';
import { bearerAuth } from 'hono/bearer-auth';
import { logger } from 'hono/logger';
import { prettyJSON } from 'hono/pretty-json';

import { Bindings } from 'types/bindings';

import { ProductCategoryCreate } from 'controllers/productCategory/create.controller';
import { ProductCategoryList } from 'controllers/productCategory/list.controller';

// Start a Hono app
const app = new Hono<{ Bindings: Bindings }>();

// Setup OpenAPI registry
const openapi = fromHono(app, {
  docs_url: '/',
});

openapi.use('*', prettyJSON(), logger(), async (ctx, next) => {
  const auth = bearerAuth({ token: ctx.env.API_KEY });
  return auth(ctx, next);
});

openapi.get('/product-categories', ProductCategoryList);
openapi.post('/product-categories', ProductCategoryCreate);

// Export the Hono app
export default app;
