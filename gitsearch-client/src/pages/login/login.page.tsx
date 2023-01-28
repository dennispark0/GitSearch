import { useEffect } from "react";
import authService from "../../services/auth.service";
import { useNavigate } from 'react-router-dom'

export default function LoginPage() {
    const navigate = useNavigate();
    const tryLogin = async () => {
        try {
            const query = new URLSearchParams(window.location.search);
            const code = query.get("code");
            await authService.login(code);
        } catch (error) {
            console.error(error);
        } finally {
            navigate('/search');
        }
    }
    useEffect(()=> {
        tryLogin();
        return () => {};
    }, []);

    return (
        <div>Logging in...</div>
    )

}