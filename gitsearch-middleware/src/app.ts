import koa from 'koa';
import mount from 'koa-mount';
import serve from 'koa-static';
import path from 'path';
import cors from '@koa/cors';
import router from './routes';
import send from 'koa-send';

const app = new koa();
app.proxy = true;

app.use(cors({ origin: process.env.WEB_URL, credentials: true}));

app.use(async (ctx, next) => {
    if(ctx.path === '/health'){
        ctx.status = 200;
        ctx.body = 'ok';
    }
    return await next();
});
app.use(router.routes());

const root = path.join(__dirname, '/client');
app.use(mount('/', serve(root)));
app.use(async (ctx) => {
    await send(ctx, `/index.html`, {
        root
    });
});
app.listen(process.env.PORT);

console.log(`app is now listening on port ${process.env.PORT}`);
