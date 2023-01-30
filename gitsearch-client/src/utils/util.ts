export const buildQualifierString = (obj: Object) =>
    Object.entries(obj).filter(([_,v])=>v.length).map(([key, value]) => `${key}:${value}`).join(' ');

export const buildQueryString = <T extends Object>(params: T) =>
    Object.entries(params).map(([key, value]) => `${key}=${value}`).join('&');
