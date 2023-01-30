# Git Search
This app is a simple UI that aids in querying Github for various repositories.

Visit the output at https://git-search.onrender.com

## Startup
To run this locally with authentication, you will need to do the following steps. To simply run, skip to step 3.

### 1.) Build a Github App
Follow the steps in the guide and specify a redirect url that points to your desired host at {host}/login. This is necessary to use authentication.

### 2.) Setup .env
Create an .env file in gitsearch-middleware:
APP_ID=< Your App ID >
PRIVATE_KEY=< Generated Private Key >
CLIENT_ID=< Your Client ID>
CLIENT_SECRET=< Your Client Secret>
WEB_DOMAIN=http://localhost:8080 (or whatever host you desire)

### 3.) Build
From the root of the project, execute the commands "npm run build" and "npm start"