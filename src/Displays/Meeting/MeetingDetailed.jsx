import '../../Styles/App.css'
import Header from "../../Components/Header/header.jsx";
import Footer from "../../Components/Footer/footer.jsx";
import Menu from "../../Components/HamburgerMenu/menu.jsx"

function MeetingDetailed(){
    return(
        <>
            <Header />
            <Menu/>
            <p>Meeting Detailed</p>
            <Footer />
        </>
    )
}

export default MeetingDetailed