import { OrderChat } from 'controllers/sockets/createOrder.controller';

export type Bindings = {
  API_KEY: string;
  DB: D1Database;
  ORDER_CHAT: DurableObjectNamespace;
};
