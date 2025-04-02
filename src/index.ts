import { fromHono } from 'chanfana';
import { Hono } from 'hono';
import { bearerAuth } from 'hono/bearer-auth';
import { logger } from 'hono/logger';
import { prettyJSON } from 'hono/pretty-json';

import { Bindings } from 'types/bindings';

import { ProductCategoryCreate } from 'controllers/productCategory/create.controller';
import { ProductCategoryList } from 'controllers/productCategory/list.controller';
import { ProductCategoryDelete } from 'controllers/productCategory/delete.controller';

import { ProductCreate } from 'controllers/product/create.controller';
import { ProductList } from 'controllers/product/list.controller';
import { ProductDelete } from 'controllers/product/delete.controller';
import { ProductUpdate } from 'controllers/product/update.controller';

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
openapi.delete('/product-categories/:id', ProductCategoryDelete);

openapi.get('/products', ProductList);
openapi.post('/products', ProductCreate);
openapi.delete('/products/:id', ProductDelete);
openapi.patch('/products/:id', ProductUpdate);

// Export the Hono app
export default app;
