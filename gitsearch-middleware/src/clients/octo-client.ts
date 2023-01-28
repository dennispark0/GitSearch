import { Octokit } from '@octokit/core';
import { RequestParameters } from '@octokit/types';
import { Context } from 'koa';

const octoClient = new Octokit({});

export const getRepositories = <T>(ctx: Context) => {
    const authCookie = ctx.cookies.get('authorization');
    const request: RequestParameters & { url : string } = {
        method: 'GET',
        url: '/search/repositories',
        ...ctx.query,
        headers : {
            authorization: `Bearer ${authCookie}`
        }
    }
    if (!authCookie) {
        delete request.headers?.authorization;
    }
    return octoClient.request<T>(request);
}

export const getUser = (ctx : Context) => {
    const authCookie = ctx.cookies.get('authorization');
    if(!authCookie) {
        return Promise.resolve(null);
    }
    return octoClient.request({
        method: 'GET',
        url: '/user',
        headers : {
            authorization: `Bearer ${authCookie}`
        }
    });
}



