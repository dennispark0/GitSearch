import { RateLimiter } from 'limiter';
import axios from 'axios';
import { SearchRepositoryRequest } from '../models/search-request.model';
import { buildQueryString } from '../utils/util';

class SearchService {
    //allow 10 req in 10 seconds
    private _rateLimiter = new RateLimiter({ tokensPerInterval: 3, interval: 10000 });
    private _axios = axios.create({
        baseURL: '/api/search',
        withCredentials: true,
    });

    constructor() {
        /* Applies token bucket algorithm for limiting method calls to intercept
        and throttle requests. However, this can obviously be bypassed -- we would need to
        additionally implement rate-limiting in our middleware w/ redis or something.
        */
        this._axios.interceptors.request.use(async (config) => {
            if (this._rateLimiter.getTokensRemaining() <= 1) {
                return Promise.reject('too many requests, please wait a bit');
            }
            await this._rateLimiter.removeTokens(1);
            return config;
        });
    }

    getRepositories(params: SearchRepositoryRequest) {
        return this._axios.get(`/repositories?${buildQueryString<SearchRepositoryRequest>(params)}`);
    }
}

export default new SearchService();