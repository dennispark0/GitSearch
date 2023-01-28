import { Octokit } from '@octokit/core';
import { RequestParameters } from '@octokit/types';
import { Context } from 'koa';

export const octoClient = new Octokit({});
export const getOctokit = <T>(ctx: Context) => {
    const authCookie = ctx.cookies.get('authorization');
    const request: RequestParameters & { url : string } = {
        method: 'GET',
        url: ctx.path,
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



