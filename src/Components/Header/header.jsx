import logo from '/src/assets/logo-CE.jpg'
import {Link, useNavigate} from "react-router-dom";
import {useAuth} from "../../services/authContext.jsx";

import LogoutConfirmation from "../LogoutConfirmation/logoutConfirmation.jsx";
import {useState} from "react";
import profile from "../../assets/profile.png";
import { Menu, Transition } from '@headlessui/react'
import {Fragment} from "react";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const bgHeader = {
    backgroundColor: "#F0F0F0",
};

const Header = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const [isLogoutConfirmationOpen, setIsLogoutConfirmationOpen] = useState(false);

    const openLogoutConfirmation = () => {
        setIsLogoutConfirmationOpen(true);
    };

    const closeLogoutConfirmation = () => {
        setIsLogoutConfirmationOpen(false);
    };

    const handleLogout = () => {

        // Add your logout logic here
        // For now, let's just close the confirmation dialog
        closeLogoutConfirmation();
        if(isLogoutConfirmationOpen){
          logout();
          navigate('/');
        }
    };

    return (
        <div
            id="header"
            className="flex flex-row h-16 w-full bg-sky-200 px-10 content-end select-none"
            style={bgHeader}
        >
            <div className="w-1/2 flex">
                <div className="flex flex-row items-center">
                    <Link to="/home" className="flex">
                        <img src={logo} alt="" className="w-9 h-9 rounded-xl" />
                    </Link>
                </div>
                <Link to="/home" className="flex">
                    <div className="flex flex-col justify-center text-sm ml-4 ">
                        <strong className="text-blue-600">COORPORATE</strong>
                        <strong className="text-orange-400">ENTREPRENEURSHIP</strong>
                    </div>
                </Link>
            </div>
            <div className="flex w-1/2 justify-end">
                <div className="items-center flex">

                    <Menu as="div" className="relative inline-block text-left">

                        <div>

                            <Menu.Button
                                className="inline-flex w-full justify-center gap-x-1.5 rounded-md  px-3 py-2 text-md  items-center  text-gray-900  ring-inset ring-gray-300">
                                <strong>{localStorage.getItem('user.name')}</strong>
                                <img src={profile} alt="" className="w-10 border-2 border-blue-500 rounded-full"/>
                            </Menu.Button>
                        </div>

                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                        >
                            <Menu.Items
                                className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                <div className="py-1">
                                    <Menu.Item>
                                        {({active}) => (
                                            <Link to="/profile">
                                            <a
                                                className={classNames(
                                                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                    'block px-4 py-2 text-sm'
                                                )}
                                            >
                                                Profile
                                            </a>
                                            </Link>
                                        )}
                                    </Menu.Item>

                                    <Menu.Item>
                                        {({active}) => (
                                            <div
                                                className={classNames(
                                                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                    'block px-4 py-2 text-sm'
                                                )}
                                                onClick={openLogoutConfirmation}
                                            >
                                                Logout
                                            </div>
                                        )}
                                    </Menu.Item>
                                </div>
                            </Menu.Items>
                        </Transition>
                    </Menu>
                                    {isLogoutConfirmationOpen && (
                                            <div className="fixed top-0 left-0 w-full h-full" onClick={closeLogoutConfirmation}>

                                            <LogoutConfirmation onConfirm={handleLogout} onCancel={closeLogoutConfirmation} />
                                            </div>
                                    )}
                </div>
            </div>
            <div></div>
        </div>
    );
}

export default Header;
