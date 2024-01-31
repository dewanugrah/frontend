import '../../Styles/App.css'
import Header from "../../Components/Header/header.jsx";
import Footer from "../../Components/Footer/footer.jsx";
import Menu from "../../Components/HamburgerMenu/menu.jsx"
import Error from "../NotFound/Error.jsx";
function Finance() {
    return(
        <>
            <Header />
            <Menu/>
            <Error/>
            <Footer />
        </>
    )
}

export default Finance;