import { RateLimiter } from 'limiter';
import axios from 'axios';
import { SearchCodeRequest, SearchRepositoryRequest, SearchRequest } from '../models/search-request.model';

class SearchService {
    
    private _rateLimiter = new RateLimiter({ tokensPerInterval: 10, interval: 'minute' });
    private _axios = axios.create({
        baseURL: 'http://localhost:8080/search',
    });

    constructor() {
        /* Applies classic token bucket algorithm for limiting method calls to intercept
        and throttle requests. However, this can obviously be bypassed -- we will need
        middleware/a simple Backend-for-Frontend pattern to truly prevent our app from
        bombarding the Git APIs.
        */
        this._axios.interceptors.request.use(async (config) => {
            if (this._rateLimiter.getTokensRemaining() <= 0) {
                return Promise.reject('too many requests, please wait a bit');
            }
            await this._rateLimiter.removeTokens(1);
            return config;
        });
    }

    private buildQueryString(params: SearchRequest): string {
        return Object.entries(params).map(([key,value]) => `${key}=${value}`).join('&');
    }

    getHealth() {
        return this._axios.get('/health');
    }

    getCode(params: SearchCodeRequest) {
        return this._axios.get(`/code?${this.buildQueryString(params)}`)
    }
    getRepositories(params: SearchRepositoryRequest) {
        return this._axios.get(`/repositories?${this.buildQueryString(params)}`)
    }
}

export default new SearchService();