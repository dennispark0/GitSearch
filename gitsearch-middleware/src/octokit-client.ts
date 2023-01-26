import { Octokit } from '@octokit/core';
import { Context } from 'koa';
//TODO: replace this with real authentication ASAP.
export const octoClient = new Octokit({ auth: process.env.API_KEY });
export const getOctokit = <T>(ctx: Context) => octoClient.request<T>({
    method: 'GET',
    url: ctx.path,
    ...ctx.query
});



