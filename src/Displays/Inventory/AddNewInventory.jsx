import "../../Styles/App.css";
import React, {useState} from "react";
import InventoryLogo from "../../assets/inventory-logo.png";
import {useAuth} from "../../services/authContext.jsx";
import createAxiosInstance from "../../services/axiosInstance.jsx";
import {TextField} from "@mui/material";

function AddNewInventory({onClose}) {
    const {isAuthenticated} = useAuth();
    const [showErrorPopup, setShowErrorPopup] = useState(false);
    const [namaInventory, setNamaInventory] = useState("");
    const [jumlahInventory, setJumlahInventory] = useState("");

  const titlestylecolor = {
    backgroundColor: "#ffce32",
  };

  const bgButtonAdd = {
    backgroundColor: "#1d63ff",
  };

    const formData = {
        nama: namaInventory, jumlah: jumlahInventory,
    };
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);
    const handleSubmit = (e) => {
        e.preventDefault();

        if (!namaInventory || !jumlahInventory) {
            setShowErrorPopup(true);
            setTimeout(() => {
                setShowErrorPopup(false);
            }, 3000);
            return; // Don't proceed with form submission
        }

        console.log(formData);
        const axiosInstance = createAxiosInstance(isAuthenticated);

        axiosInstance
            .post("/inventories", formData)
            .then((response) => {
                console.log(response);
                setShowSuccessPopup(true);
                onClose();
            })
            .catch((e) => {
                console.log(e);
            });
    };

    return (<div className="justify-center flex flex-col mx-2 w-full md:w-3/5 items-center ">
        <div style={titlestylecolor} className="flex h-12 w-full rounded-t-lg ">
            <div className="flex flex-row ">
                <div className="w-19 h-fit ml-7 flex">
                    <img
                        src={InventoryLogo}
                        alt="inventory"
                        className="w-6 h-fit pt-3"
                    />
                    <h1 className="ml-5 flex pt-3  font-semibold text-[18px] text-gray-800">
                        New Inventory
                    </h1>
                </div>
            </div>
        </div>

        <div className="flex w-full rounded-b-lg bg-white">
            <form className="flex w-full">
                <div className="flex flex-col w-full pt-4 px-6 pb-10">
                    <div className="p-3">
                        <TextField
                            className="w-full"
                            required
                            id="outlined-required-name"
                            label="item name"
                            value={namaInventory}
                            onChange={(e) => setNamaInventory(e.target.value)}
                        />
                    </div>
                    <div className="p-3">
                        <TextField
                            className="w-full"
                            required
                            id="outlined-required-amount"
                            label="amount"
                            type="number"
                            value={jumlahInventory}
                            onChange={(e) => setJumlahInventory(e.target.value)}
                        />
                    </div>
                    <div className="mt-4 mr-4">
                        {showErrorPopup && (<div className="error-popup">
                            <p className="text-red-600">
                                {" "}
                                !! Please fill in all required fields. !!{" "}
                            </p>
                        </div>)}
                        <button
                            className="float-right ml-5 text-center py-2 px-8 text-white font-semibold rounded-full"
                            style={bgButtonAdd}
                            onClick={handleSubmit}
                        >
                            Add
                        </button>

                        <button
                            className="float-right text-center py-2 px-8 text-white font-semibold rounded-full"
                            style={titlestylecolor}
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                    </div>

                </div>
            </form>
        </div>

        {showSuccessPopup && (<div className="success-popup">
            <p>Item successfully!</p>
        </div>)}
    </div>);
}

export default AddNewInventory;
