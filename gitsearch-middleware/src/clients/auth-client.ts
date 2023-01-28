import { createAppAuth } from '@octokit/auth-app';

const auth = createAppAuth({
    appId: process.env.APP_ID!,
    privateKey: process.env.PRIVATE_KEY!,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
});

export const loginWithCode = (code : string) => auth({ type: "oauth-user", code });
