import { Context } from "koa";

export class StatusCodes {
    static readonly OK = 200;
    static readonly NOT_MODIFIED = 302;
    static readonly UNREADABLE_RESPONSE = 422;
    static readonly SERVICE_UNAVAILABLE = 503;
    private constructor() {}
}

export const setResponse = (ctx: Context, response: { data: unknown, status: number }) => {
    console.log(response);
    ctx.body = response.data;
    ctx.status = response.status;
}