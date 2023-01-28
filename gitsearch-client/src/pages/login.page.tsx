import { useContext, useState } from "react";
import { AppContext, AppDispatch } from "../context/context";
import authService from "../services/auth.service";
import { useNavigate } from 'react-router-dom'

export default function LoginPage() {
    const { loggedIn } = useContext(AppContext);
    const { setLoggedIn } = useContext(AppDispatch);
    const [loginFinished, setLoginFinished] = useState(false);
    const navigate = useNavigate();
    const tryLogin = async () => {
        try {
            const query = new URLSearchParams(window.location.search);
            const code = query.get("code");
            const { data } = await authService.login(code || '');
            setLoggedIn(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoginFinished(true);
        }
    }

    if(!loginFinished){
        // tryLogin();
    } else {
        navigate('/search');
        //TODO: do an oops page.
    }

    return (
        <div>Logging in...</div>
    )

}