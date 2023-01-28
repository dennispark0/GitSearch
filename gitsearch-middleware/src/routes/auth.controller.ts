import Router from "@koa/router";
import { loginWithCode } from "../clients/auth-client";
import { setResponse, StatusCodes } from "../util";

const router = new Router({ prefix:'/auth'})

router.get('/login', async (ctx, next)=> {
    const authorization = ctx.cookies.get('authorization', { signed: true });
    //TODO: obviously, we need to do more than that.
    if(authorization) {
        setResponse(ctx, { data: true, status: StatusCodes.OK });
        return await next();
    }
    try {
        const { code } = ctx.query;
        if(!code || typeof code !== 'string' || !code.length) {
            setResponse(ctx, {data: null, status: StatusCodes.BAD_REQUEST});
            return await next();
        }
        const { token } = await loginWithCode(code);
        ctx.cookies.set('authorization', token, { httpOnly: true, signed: true });
        setResponse(ctx, { data :true, status: StatusCodes.OK });
        return await next();
        
    } catch (err) {
        setResponse(ctx, { data: false, status : StatusCodes.FORBIDDEN});
        return await next();
    }
});

router.get('/logout', async (ctx, next) => {
    ctx.cookies.set('authorization', null, { httpOnly: true });
    setResponse(ctx, { data: null, status : StatusCodes.OK });
    return await next();
});

export default router;