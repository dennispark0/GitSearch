import axios from "axios";

export class AuthService {
    private _axios = axios.create({
        baseURL: 'http://localhost:8080/auth',
    });

    login(code : string) {
        return this._axios.get<boolean>(`/login?code=${code}`);
    }
}

export default new AuthService();