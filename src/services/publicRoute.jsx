import {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import createAxiosInstance from "./axiosInstance.jsx";
import {useAuth} from "./authContext.jsx";

function PublicRoute({children}) {
    const {isAuthenticated, login, logout} = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/home')
        } else {
            const token = localStorage.getItem('token');
            if (token) {
                const axiosInstance = createAxiosInstance(true);
                axiosInstance.get('/auth')
                    .then(() => {
                        login(token);
                        navigate('/home')
                    }).catch(() => {
                        logout();
                });
            }
        }
    }, [isAuthenticated, login, logout, navigate]);

    return children;
}

export default PublicRoute;