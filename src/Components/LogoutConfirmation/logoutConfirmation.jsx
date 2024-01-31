// LogoutConfirmation.jsx
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const LogoutConfirmation = ({ onConfirm, onCancel }) => {
    const navigate = useNavigate();
    const handleConfirm = () => {
        // Perform the logout logic
        onConfirm();

        // Navigate to the home page
        navigate('/');
    };

    return (
        <>
            {/* Transparent overlay */}
            <div
                id="overlay"
                className="fixed top-0 left-0 w-full h-full bg-black opacity-50"
                style={{ zIndex: 50 }}
                onClick={onCancel}
            ></div>

            {/* Logout confirmation popup */}
            <div id="logout" className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 shadow-md z-50">
                <h2 className="text-2xl mb-4">Logout Confirmation</h2>
                <p className="mb-4">Are you sure you want to log out?</p>
                <div className="flex justify-end">
                    <button
                        className="bg-red-500 text-white p-2 rounded mr-4 hover:bg-red-600"
                        onClick={handleConfirm}
                    >
                        Confirm
                    </button>
                    <button
                        className="bg-gray-300 text-gray-700 p-2 rounded hover:bg-gray-400"
                        onClick={onCancel}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </>
    );
};

LogoutConfirmation.propTypes = {
    onConfirm: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
};
export default LogoutConfirmation;
