import Router from '@koa/router';
import { getOctokit } from '../clients/search-client';
import { SearchResponse } from '../models/response/search-response.model';
import { setResponse } from '../util';

const router = new Router({prefix: '/search'});

router.get('', async (ctx,next) => {
    try {
        const { data, status } = await getOctokit<SearchResponse>(ctx);
        setResponse(ctx, { data, status });
    } catch (err : any) {
        if(err.message) {
            console.error(`Error! Status: ${err.response.status}. Message: ${err.response.data.message}`);
        }
        console.error(err);
        return await next();
    }
});

export default router;