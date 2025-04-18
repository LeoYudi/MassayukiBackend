import { OpenAPIRoute } from 'chanfana';
import { DurableObject } from 'cloudflare:workers';
import { Context, Env } from 'hono';
import { Bindings } from 'types/bindings';

export class OrderChat extends DurableObject {
  sessions: Map<WebSocket, any>;

  constructor(ctx: DurableObjectState, env: Env) {
    super(ctx, env);

    this.sessions = new Map();
    this.ctx.getWebSockets().forEach((ws) => {
      this.sessions.set(ws, { ...ws.deserializeAttachment() });
    });
  }

  async fetch(request: Request): Promise<Response> {
    if (request.headers.get('Upgrade') !== 'websocket') {
      return new Response('Expected websocket', { status: 400 });
    }

    const pair = new WebSocketPair();
    const [client, server] = Object.values(pair);
    this.ctx.acceptWebSocket(server);
    this.sessions.set(server, {});

    return new Response(null, { status: 101, webSocket: client } as any);
  }

  webSocketMessage(
    ws: WebSocket,
    message: string | ArrayBuffer
  ): void | Promise<void> {
    const session = this.sessions.get(ws);

    if (!session.id) {
      session.id = crypto.randomUUID();
      ws.serializeAttachment({ ...ws.deserializeAttachment(), id: session.id });
      ws.send(JSON.stringify({ ready: true, id: session.id }));
    }
    this.broadcast(ws, message);
  }

  broadcast(sender: WebSocket, message: string | ArrayBuffer) {
    const id = this.sessions.get(sender).id;

    for (const [ws] of this.sessions) {
      if (ws !== sender) {
        switch (typeof message) {
          case 'string':
            ws.send(JSON.stringify({ ...JSON.parse(message), id }));
            break;
          default:
            ws.send(JSON.stringify({ ...message, id }));
            break;
        }
      }
    }
  }

  webSocketClose(
    ws: WebSocket,
    code: number,
    reason: string,
    wasClean: boolean
  ): void | Promise<void> {
    this.close(ws);
  }

  webSocketError(ws: WebSocket, error: unknown): void | Promise<void> {
    this.close(ws);
  }

  close(ws: WebSocket) {
    const session = this.sessions.get(ws);
    if (!session?.id) return;

    this.sessions.delete(ws);
  }
}

export class OrderChatRoute extends OpenAPIRoute {
  async handle(ctx: Context<{ Bindings: Bindings }>) {
    const id = ctx.env.ORDER_CHAT.idFromName(new URL(ctx.req.url).pathname);
    const orderChat = ctx.env.ORDER_CHAT.get(id);
    return orderChat.fetch(ctx.req.raw);
  }
}
