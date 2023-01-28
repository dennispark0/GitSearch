import { RateLimiter } from 'limiter';
import axios from 'axios';
import { SearchRepositoryRequest, SearchRequest } from '../models/search-request.model';

class SearchService {
    //allow 10 req in 10 seconds
    private _rateLimiter = new RateLimiter({ tokensPerInterval: 3, interval: 10000 });
    private _axios = axios.create({
        baseURL: '/api/search',
        withCredentials: true,
    });

    constructor() {
        /* Applies classic token bucket algorithm for limiting method calls to intercept
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

    private buildQueryString(params: SearchRequest): string {
        return Object.entries(params).map(([key,value]) => `${key}=${value}`).join('&');
    }

    getRepositories(params: SearchRepositoryRequest) {
        return this._axios.get(`/repositories?${this.buildQueryString(params)}`)
    }
}

export default new SearchService();