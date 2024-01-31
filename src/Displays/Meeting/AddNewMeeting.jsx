import "../../Styles/App.css";
import React, {useState} from "react";
import Meetinglogo from "../../assets/logo-meeting.png";
import {useAuth} from "../../services/authContext.jsx";
import createAxiosInstance from "../../services/axiosInstance.jsx";
import {DateTimePicker} from "@mui/x-date-pickers";
import dayjs from "dayjs";
import {TextField} from "@mui/material";

function AddNewMeeting({onClose}) {
    const {isAuthenticated} = useAuth();
    const [namaMeeting, setNamaMeeting] = useState("");
    const [tujuanMeeting, setTujuanMeeting] = useState("");
    const [showErrorPopup, setShowErrorPopup] = useState(false);
    const [startTime, setStartTime] = useState(dayjs());
    const [endTime, setEndTime] = useState(dayjs());
    const [lokasiMeeting, setLokasiMeeting] = useState("");

  const titlestylecolor = {
    backgroundColor: "#ffce32",
  };
  const bgButtonAdd = {
    backgroundColor: "#1d63ff",
  };


    const userData = {
        email: localStorage.getItem('user.email'),
        name: localStorage.getItem('user.name'),
        department: localStorage.getItem('user.department'),
        position: localStorage.getItem('user.position')
    }

    const formData = {
        topic: namaMeeting,
        purpose: tujuanMeeting,
        timeStart: startTime,
        timeEnd: endTime,
        creator: userData,
        location: lokasiMeeting,
    };

    const [showSuccessPopup, setShowSuccessPopup] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!namaMeeting || !tujuanMeeting || !startTime || !endTime || !lokasiMeeting) {
            setShowErrorPopup(true);
            setTimeout(() => {
                setShowErrorPopup(false);
            }, 3000);
            return; // Don't proceed with form submission
        }

        console.log(formData);
        const axiosInstance = createAxiosInstance(isAuthenticated);

        axiosInstance.post("/meetings", formData)
            .then((response) => {
                console.log(response);
                setShowSuccessPopup(true);
                onClose();
            }).catch((e) => {
            console.log(e);
        });
    };

    const handleSelectChange = (setter) => (event) => {
        setter(event.target.value);
    };

    return (<div className="justify-center flex flex-col w-full mx-2 md:w-3/5 items-center">
            <div style={titlestylecolor} className="flex h-12 w-full rounded-t-lg ">
                <div className="flex flex-row ">
                    <div className="w-19 h-fit ml-7 flex">
                        <img
                            src={Meetinglogo}
                            alt="meeting"
                            className="w-6 h-fit pt-3"
                        />
                        <h1 className="ml-5 flex pt-3 font-semibold text-[18px] text-gray-800">
                            New Meeting
                        </h1>
                    </div>
                </div>
            </div>
            <div className="flex rounded-b-lg w-full bg-white">
                <form className="flex w-full">
                    <div className="flex flex-col w-full pt-4 px-6 pb-10">
                        <div className="p-3">
                            <TextField
                                className="w-full"
                                required
                                id="outlined-required-name"
                                label="Meeting name"
                                value={namaMeeting}
                                onChange={(e) => setNamaMeeting(e.target.value)}
                            />
                        </div>
                        <div className="p-3">
                            <TextField
                                className="w-full"
                                required
                                id="outlined-required-purpose"
                                label="Meeting pupose"
                                value={tujuanMeeting}
                                onChange={(e) => setTujuanMeeting(e.target.value)}
                            />
                        </div>
                        <div className="p-3">
                            <DateTimePicker
                                className="w-full"
                                label="Meeting start"
                                value={startTime}
                                onChange={handleSelectChange(setStartTime)}
                            />
                        </div>
                        <div className="p-3">
                            <DateTimePicker
                                className="w-full"
                                label="Meeting end"
                                value={endTime}
                                onChange={handleSelectChange(setEndTime)}
                            />
                        </div>
                        <div className="p-3">
                            <TextField
                                className="w-full"
                                required
                                id="outlined-required-location"
                                label="Meeting location"
                                value={lokasiMeeting}
                                onChange={(e) => setLokasiMeeting(e.target.value)}
                            />
                        </div>
                        <div className="mt-4 mr-4">
                        {showErrorPopup && (<div className="error-popup">
                                <p className="text-red-600"> !! Please fill in all required fields. !! </p>
                            </div>)}
                            <button
                                className="float-right ml-5 text-center pt-2 pb-2 pl-8 pr-8 text-white font-semibold rounded-full"
                                style={bgButtonAdd}
                                onClick={handleSubmit}
                            >
                                Add
                            </button>
                            <button
                                className="float-right text-center pt-2 pb-2 pl-8 pr-8 font-semibold rounded-full"
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
                    <p>Meeting added successfully!</p>
                </div>)}
        </div>);
}

export default AddNewMeeting;
