import Router from '@koa/router';
import { getRepositories } from '../clients/octo-client';
import { SearchResponse } from '../models/response/search-response.model';
import { setResponse } from '../util';

const router = new Router({prefix: '/search'});

router.get('/repositories', async (ctx,next) => {
    try {
        const { data, status } = await getRepositories<SearchResponse>(ctx);
        setResponse(ctx, { data, status });
    } catch (error) {
        console.error(error);
    }
});

export default router;