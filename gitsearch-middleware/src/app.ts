import koa from 'koa';
import cors from '@koa/cors';
import authRouter from './routes/auth.controller';
import searchRouter from './routes/search.controller'

const app = new koa();
app.use(cors());
app.use(authRouter.routes());
app.use(searchRouter.routes());
app.listen(process.env.PORT);

console.log(`app is now listening on port ${process.env.PORT}`);
