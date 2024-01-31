import igLogo from "../../assets/Instagram.png";

const Footer = () => {
    const openInstagram = () => {
        window.open('https://www.instagram.com/', '_blank');
    };

    const footer = {
        backgroundColor: "#ffce32", // Orange
    };

    const textColor = {
        color: "#121722"
    };
    return (

            <footer
                className="flex flex-col h-16 bg-sky-200 px-16"
                style={{ ...footer, ...textColor }}
            >
                <div className="border-b-2 border-blue-400 w-full h-3/4 flex justify-end items-center">
                    <div className=" flex flex-row items-center justify-center px-2 py-2 rounded-3xl border-2 h-7 w-7 bg-gray-200 mr-3">
                        <a
                            onClick={openInstagram}
                            className="cursor-pointer flex justify-center items-center rounded-3xl"
                        >
                            <img
                                src={igLogo}
                                alt=""
                                className="w-4 h-4 absolute flex justify-center items-center"
                            />
                        </a>
                    </div>
                </div>
                <div className="flex justify-end text-xs pr-8 py-0.5">
                    <p>© 2022 | by ICT Department</p>
                </div>
            </footer>
    );
};

export default Footer;
