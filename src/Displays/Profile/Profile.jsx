import '../../Styles/App.css'
import Header from "../../Components/Header/header.jsx";
import Footer from "../../Components/Footer/footer.jsx";
import Menu from "../../Components/HamburgerMenu/menu.jsx"

function Profile(){
    const bgBigCard = {
        backgroundColor: "#ECEAC6", // Yellow
    };

    const textColor = {
        color: "#121722"

    }
    const boxShadow = {
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Subtle shadow for depth
    };

    const user = {
        email: localStorage.getItem('user.email') ,
        name: localStorage.getItem('user.name'),
        department: localStorage.getItem('user.department'),
        position: localStorage.getItem('user.position')
    }
    return(

        <>
            <Header />
            <Menu/>
            <div className="flex flex-col min-h-fit w-full justify-center rounded-b-5xl select-none pb-[163px] mb-[156px] pt-[250px]"
                 style={{...bgBigCard, ...boxShadow, ...textColor}}>
                <div className="container w-[35%] mx-auto p-4 ">
                    <h1 className="text-2xl font-bold mb-4">Profile</h1>
                    <div className="bg-white shadow-xl rounded-2xl px-8 pt-6 pb-8 mb-2">
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Name:</label>
                            <p className="text-gray-700 text-lg">{user.name}</p>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
                            <p className="text-gray-700 text-lg">{user.email}</p>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Department:</label>
                            <p className="text-gray-700 text-lg">{user.department}</p>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Position:</label>
                            <p className="text-gray-700 text-lg">{user.position}</p>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    )
}

export default Profile