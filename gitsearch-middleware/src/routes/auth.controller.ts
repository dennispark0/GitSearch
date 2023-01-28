import Router from "@koa/router";
import { loginWithCode } from "../clients/auth-client";
import { getUser } from "../clients/octo-client";
import { setResponse, StatusCodes } from "../util";

const router = new Router({ prefix:'/auth'})

router.get('/login', async (ctx, next)=> {
    const authorization = ctx.cookies.get('authorization');
    if(authorization) {
        setResponse(ctx, { data: true, status: StatusCodes.OK });
        return await next();
    }
    try {
        const { code } = ctx.query;
        if(!code || typeof code !== 'string' || !code.length) {
            setResponse(ctx, { data: null, status: StatusCodes.BAD_REQUEST });
        } else {
            const { token } = await loginWithCode(code);
            ctx.cookies.set('authorization', token, { httpOnly: true, secure:true });
            setResponse(ctx, { data :true, status: StatusCodes.OK });
        }
    } catch (error) {
        console.error(error);
        setResponse(ctx, { data: false, status : StatusCodes.FORBIDDEN});
    } finally {
        return await next();
    }
});

router.get('/user', async (ctx, next)=> {
    try {
        const response = await getUser(ctx);
        if(response) {
            const { data } = response;
            setResponse(ctx, { data, status: StatusCodes.OK});
        } else {
            setResponse(ctx, { data: null, status: StatusCodes.OK });
        }
    } catch (error) {
        console.error(error);
    } finally {
        return await next();
    }
});

router.get('/logout', async (ctx, next) => {
    ctx.cookies.set('authorization', '', { httpOnly: true, secure:true });
    setResponse(ctx, { data: null, status : StatusCodes.OK });
    return await next();
});

export default router;