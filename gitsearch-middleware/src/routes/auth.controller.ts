import Router from "@koa/router";
import { loginWithCode } from "../clients/auth-client";
import { deleteToken, getUser } from "../clients/octo-client";
import { setResponse, StatusCodes } from "../util";

const router = new Router({ prefix:'/auth' })

router.get('/login', async ctx => {
    const authorization = ctx.cookies.get('authorization');
    if(authorization) {
        setResponse(ctx, { data: true, status: StatusCodes.OK });
        return;
    }
    try {
        const { code } = ctx.query;
        if(!code || typeof code !== 'string' || !code.length) {
            setResponse(ctx, { data: null, status: StatusCodes.BAD_REQUEST });
        } else {
            const { token } = await loginWithCode(code);
            ctx.cookies.set('authorization', token, { httpOnly: true, secure: true });
            setResponse(ctx, { data :true, status: StatusCodes.OK });
        }
    } catch (error) {
        console.error(error);
        setResponse(ctx, { data: false, status : StatusCodes.FORBIDDEN});
    } 
});

router.get('/user', async ctx => {
    try {
        const response = await getUser(ctx);
        if(response) {
            const { data } = response;
            setResponse(ctx, { data, status: StatusCodes.OK});
        } else {
            setResponse(ctx, { data: null, status: StatusCodes.OK });
        }
    } catch (error) {
        setResponse(ctx, { data: { error: "could not get user data."}, status: StatusCodes.BAD_GATEWAY });
        console.error(error);
    } 
});

router.get('/logout', async ctx => {
    try {
        await deleteToken(ctx);
        setResponse(ctx, { data: null, status : StatusCodes.OK });
    } catch (error) {
        console.error(error);
        setResponse(ctx, { data: { error: "could not log out."}, status : StatusCodes.BAD_GATEWAY });
    } finally {
        ctx.cookies.set('authorization', '', { httpOnly: true, secure: true });
    }
});

export default router;