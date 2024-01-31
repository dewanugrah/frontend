import {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {useAuth} from "./authContext.jsx";
import createAxiosInstance from "../services/axiosInstance";

function PrivateRoute({children}) {
    const {isAuthenticated, login, logout} = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated) {
            const token = localStorage.getItem('token');
            if (token) {
                const axiosInstance = createAxiosInstance(true);
                axiosInstance.get('/auth')
                    .then(() => {
                        login(token);
                    })
                    .catch(() => {
                        logout();
                        navigate('/');
                    });
            } else {
                navigate('/');
            }
        }
    }, [isAuthenticated, login, logout, navigate]);

    return children;
}

export default PrivateRoute;