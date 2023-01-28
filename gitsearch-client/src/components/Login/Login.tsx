//TODO: move these to an env file.
const authUrl = `https://github.com/login/oauth/authorize`;
const clientId = `Iv1.9ea6762a29bbce2e`;
const redirectUrl = `http://localhost:3000/login`;
export default function Login() {
    return <a href={`${authUrl}?client_id=${clientId}&redirect_uri=${redirectUrl}`}>Login</a>
}