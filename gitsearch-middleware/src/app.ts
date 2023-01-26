import koa, { Context } from 'koa';
import cors from '@koa/cors';
import { SearchResponse } from './models/response/search-response.model';
import { getOctokit } from './octokit-client';
import { RateLimiter } from 'limiter';
import { setResponse } from './util';


const app = new koa();

app.use(cors());

app.use(async ctx => {
    if(!ctx.path.includes('search')) {
        return;
    }
    console.log(ctx.url, ctx.query);
    const { data, status } = await getOctokit<SearchResponse>(ctx);

    setResponse(ctx, { data, status });
});

app.listen(8080);
console.log(`app is now listening on port ${8080}`);
