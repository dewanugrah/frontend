import '../../Styles/App.css'
import {useState} from "react";
import {useAuth} from "../../services/authContext.jsx";
import createAxiosInstance from "../../services/axiosInstance.jsx";
import logo_ce from "../../assets/logo-CE.jpg"
function Login() {
    const {isAuthenticated, login} = useAuth();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const headerList = {
        backgroundColor: "#ffce32", // Orange
    };

    const bgBlue ={
        backgroundColor: "#1d63ff"
    }
    const textColor = {
        color: "#121722"

    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const axiosInstance = createAxiosInstance(isAuthenticated);
        const data = {
            email: username, password: password
        }
        try {
            const response = await axiosInstance.post('auth/authenticate', data)
            if (response && response.data && response.data.token) {
                const token = response.data.token;
                login(token);
            } else {
                console.error('Authentication failed: Invalid response format');
            }
        } catch (e) {
            console.error('Authentication failed:', e);
        }
    };
    return (<>

        <header style={headerList} className=" text-white p-4 w-full h-16 flex"></header>
        <div id="terluar">

            <div id="bg-login" className=" justify-center flex w-full min-h-screen items-center h-full">
                <div id="img-login" className="w-full h-full absolute ">

                </div>
                <div id="login-box"
                     style={{...headerList,...textColor}}
                     className="flex flex-col justify-center items-center w-1/4 mt-32 mb-16 h-fit rounded-l relative">
                    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                            <img
                                className="mx-auto h-16 w-auto rounded-full"
                                src={logo_ce}
                                alt="Your Company"
                            />
                            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight ">
                                Sign in to your account
                            </h2>
                        </div>

                        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                             <form className="space-y-6" method="POST" onSubmit={handleSubmit}>
                                <div>
                                    <label htmlFor="email"
                                           className="block text-sm font-medium leading-6 ">
                                        Email address
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            autoComplete="email"
                                            required
                                            onChange={e => setUsername(e.target.value)}
                                            className="block w-full rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <div className="flex items-center justify-between">
                                        <label htmlFor="password"
                                               className="block text-sm font-medium leading-6 ">
                                            Password
                                        </label>
                                    </div>
                                    <div className="mt-2">
                                        <input
                                            id="password"
                                            name="password"
                                            type="password"
                                            autoComplete="current-password"
                                            required
                                            onChange={e => setPassword(e.target.value)}
                                            className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <button
                                        type="submit"
                                        style={bgBlue}
                                        className="flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    >
                                        Sign in
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <footer id="footer" style={headerList} className=" h-16 w-full static bottom-0"></footer>
    </>)

}

export default Login;