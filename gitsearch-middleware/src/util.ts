import { Context } from "koa";

export enum StatusCodes {
     OK = 200,
     NOT_MODIFIED = 302,
     BAD_REQUEST = 400,
     UNAUTHORIZED = 401,
     FORBIDDEN = 403,
     UNREADABLE_RESPONSE = 422,
     BAD_GATEWAY = 502,
     SERVICE_UNAVAILABLE = 503,
}

export const setResponse = (ctx: Context, response: { data: unknown, status: number }) => {
    ctx.body = response.data;
    ctx.status = response.status;
}