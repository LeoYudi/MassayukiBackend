import { fromHono } from 'chanfana';
import { Hono } from 'hono';
import { bearerAuth } from 'hono/bearer-auth';
import { logger } from 'hono/logger';
import { prettyJSON } from 'hono/pretty-json';

import { Bindings } from 'types/bindings';

import { customCors } from 'middlewares/customCors';

import { ProductCategoryCreate } from 'controllers/productCategory/create.controller';
import { ProductCategoryList } from 'controllers/productCategory/list.controller';
import { ProductCategoryDelete } from 'controllers/productCategory/delete.controller';

import { ProductCreate } from 'controllers/product/create.controller';
import { ProductList } from 'controllers/product/list.controller';
import { ProductDelete } from 'controllers/product/delete.controller';
import { ProductUpdate } from 'controllers/product/update.controller';

import { OrderCreate } from 'controllers/order/create.controller';
import { OrderList } from 'controllers/order/list.controller';
import { OrderDelete } from 'controllers/order/delete.controller';
import { OrderPay } from 'controllers/order/pay.controller';
import { ReportCreate } from 'controllers/report/create.controller';
import { ReportList } from 'controllers/report/list.controller';

import { scheduled } from 'cron';

import {
  OrderChat,
  OrderChatRoute,
} from 'controllers/sockets/createOrder.controller';

// Start a Hono app
const app = new Hono<{ Bindings: Bindings }>();

// Setup OpenAPI registry
const openapi = fromHono(app, {
  docs_url: '/',
});

openapi.use(customCors);

openapi.use('*', prettyJSON(), logger(), async (ctx, next) => {
  const auth = bearerAuth({ token: ctx.env.API_KEY });
  return auth(ctx, next);
});

openapi.get('/connect', OrderChatRoute);

openapi.get('/product-categories', ProductCategoryList);
openapi.post('/product-categories', ProductCategoryCreate);
openapi.delete('/product-categories/:id', ProductCategoryDelete);

openapi.get('/products', ProductList);
openapi.post('/products', ProductCreate);
openapi.delete('/products/:id', ProductDelete);
openapi.patch('/products/:id', ProductUpdate);

openapi.get('/orders', OrderList);
openapi.post('/orders', OrderCreate);
openapi.delete('/orders/:id', OrderDelete);
openapi.patch('/orders/:id', OrderPay);

openapi.get('/reports', ReportList);
openapi.post('/reports', ReportCreate);

// Export the Hono app
export default { ...app, scheduled };

export { OrderChat };
