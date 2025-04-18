import { MiddlewareHandler } from 'hono';
import { cors } from 'hono/cors';

export const customCors: MiddlewareHandler = async (ctx, next) => {
  if (ctx.req.path.includes('connect')) return await next();
  else return await cors()(ctx, next);
};
