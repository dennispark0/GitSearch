import axios from "axios";
import { UserData } from "../models/user-data.model";

export class AuthService {
    private _axios = axios.create({
        baseURL: 'http://localhost:8080/auth',
        withCredentials: true,
    });

    login(code : string | null) {
        return this._axios.get<boolean>(`/login${code ? `?code=${code}` :''}`);
    }
    logout() {
        return this._axios.get('/logout');
    }
    getUser() {
        return this._axios.get<UserData | null>('/user');
    }
}

export default new AuthService();