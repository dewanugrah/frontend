import '../../Styles/App.css'
import Header from "../../Components/Header/header.jsx";
import Footer from "../../Components/Footer/footer.jsx";
import Menu from "../../Components/HamburgerMenu/menu.jsx"
import AddNewInventory from "./AddNewInventory.jsx";
import {useEffect, useState} from "react";
import InventoryIcon from "../../assets/inventory-logo.png";

function InventoryList() {
    const [currentPage, setCurrentPage] = useState(1);
    const [isAddInventoryModalOpen, setIsAddInventoryModalOpen] = useState(false);
    const itemsPerPage = 10;

    const handleClickNext = () => {
        setCurrentPage(prevPage => prevPage + 1);
    };

    const handleClickPrev = () => {
        setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
    };

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = currentPage * itemsPerPage;

    const [inventoryData, setInventoryData] = useState([]);
    const bgBigCard = {
        backgroundColor: "#ECEAC6", // Yellow
    };

    const headerList = {
        backgroundColor: "#ffce32", // Orange
    };

    const bgList = {
        backgroundColor: "#FFFFFF", // Light Gray
    };

    const bgBlue = {
        backgroundColor: "#1d63ff"
    }

    const textColor = {
        color: "#121722"
    }

    const boxShadow = {
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Subtle shadow for depth
    };

    // Assume you have the authentication token available
    const authToken = localStorage.getItem('token');
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch inventory data
                const inventoryResponse = await fetch('http://localhost:8888/api/v1/inventories', {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    },
                });

                // Handle the response for inventory
                if (inventoryResponse.ok) {
                    const inventoryData = await inventoryResponse.json();
                    console.log('inventory data:', inventoryData);
                    setInventoryData(inventoryData);
                } else {
                    if (inventoryResponse.status === 403) {
                        console.error('Unauthorized: Authentication token is invalid or expired.');
                    } else {
                        console.error(`Failed to fetch inventory. Status: ${inventoryResponse.status}`);
                    }
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        // Call the combined function
        fetchData();
    }, [authToken, isAddInventoryModalOpen]); // Empty dependency array means this effect runs once when the component mounts

    const openAddInventoryModal = () => {
        setIsAddInventoryModalOpen(true);
    };

    const closeAddInventoryModal = () => {
        setIsAddInventoryModalOpen(false);
    };

    return (<>
            <Header/>
            <Menu/>
            <div className="flex flex-col min-h-fit w-full justify-center rounded-b-5xl select-none pb-10 mb-[156px]"
                 style={{...bgBigCard, ...boxShadow, ...textColor}}>
                <div className="flex flex-col w-9/10 h-full mx-2 md:mx-16">
                    <div className="flex flex-row w-full px-2 py-4 rounded-t-3xl mt-16"
                         style={headerList}>
                        <div className="flex mx-3">
                            <img
                                src={InventoryIcon}
                                alt=""
                                className="w-6 h-fit"
                            />
                        </div>
                        <div>
                            <p className="">Inventory List</p>
                        </div>
                    </div>
                    <div className="flex flex-col h-full px-7 rounded-b-3xl mb-20"
                         style={{...bgList, ...boxShadow}}>
                        <div className="flex w-full justify-start ">
                            <div style={bgBlue}
                                 className=" p-2 rounded-full my-4 text-white">
                                <button onClick={openAddInventoryModal}>Add New Inventory</button>
                            </div>
                        </div>
                        {isAddInventoryModalOpen && (<div className="modal-container">
                            <AddNewInventory onClose={closeAddInventoryModal}/>
                        </div>)}
                        {inventoryData.length === 0 ? (
                            <div className=" flex justify-center items-center p-40 overflow-x-auto mb-10">
                                <div className="flex justify-center items-center h-full">
                                    <p className="text-gray-500 text-lg">Inventory is empty. Please add new
                                        inventory.</p>
                                </div>
                            </div>) : (<div className="overflow-x-auto mb-10">
                            <table className="table-auto w-full bg-white border-collapse border border-gray-300">
                                <thead>
                                <tr className="bg-blue-200">
                                    <th className="px-2 md:px-6 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">
                                        Nama Barang
                                    </th>
                                    <th className="px-2 md:px-6 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">
                                        Jumlah Barang
                                    </th>
                                </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-300">
                                {inventoryData.slice(startIndex, endIndex).map((inventory, index) => (
                                    <tr id={`inventory-list-${index}`} className="bg-blue-100" key={index}>
                                        <td className="px-2 md:px-6 py-4 whitespace-nowrap">{inventory.nama}</td>
                                        <td className="px-2 md:px-6 py-4 whitespace-nowrap">{inventory.jumlah}</td>
                                    </tr>))}
                                </tbody>
                            </table>
                            <div className="flex flex-row justify-between ">
                                <div
                                    className="mb-2 flex items-center">Showing {startIndex + 1} - {endIndex} of {inventoryData.length} projects
                                </div>
                                <div className="flex justify-end mt-4">
                                    <button
                                        onClick={handleClickPrev}
                                        disabled={currentPage === 1}
                                        style={bgBlue}
                                        className=" text-white font-bold py-2 px-4 rounded mx-3"
                                    >
                                        Previous
                                    </button>
                                    <button
                                        onClick={handleClickNext}
                                        disabled={endIndex >= inventoryData.length}
                                        style={bgBlue}
                                        className=" text-white font-bold py-2 px-4 rounded"
                                    >
                                        Next
                                    </button>
                                </div>
                            </div>
                        </div>)}
                    </div>
                </div>
            </div>
            <Footer/>
        </>)
}

export default InventoryList;
