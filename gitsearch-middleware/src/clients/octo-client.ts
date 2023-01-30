import { Octokit } from '@octokit/core';
import { RequestParameters } from '@octokit/types';
import { Context } from 'koa';

const octoClient = new Octokit({});
/**
 * This solution is incomplete-- should be using a session id to store this in
 * Redis or other suitable alternative...
 */
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

export const deleteToken = (ctx : Context) => {
    const authCookie = ctx.cookies.get('authorization');
    if(!authCookie) {
        return Promise.resolve(null);
    }
    return octoClient.request({
        method: 'DELETE',
        url: '/applications/{client_id}/token',
        client_id:process.env.CLIENT_ID,
        access_token:authCookie,
    });
} 



