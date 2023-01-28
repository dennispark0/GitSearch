import Router from '@koa/router';
import authRouter from './auth.controller';
import searchRouter from './search.controller';
const router = new Router({ prefix: '/api' });

router.use(authRouter.routes());
router.use(searchRouter.routes());

export default router;