import "../../Styles/App.css";
import React, {useState} from "react";
import ProjectLogo from "../../assets/project-logo.png";
import {useAuth} from "../../services/authContext.jsx";
import createAxiosInstance from "../../services/axiosInstance.jsx";
import dayjs from "dayjs";
import {FormControl, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import {DateTimePicker} from "@mui/x-date-pickers";

function AddNewProject({onClose}) {
    const {isAuthenticated} = useAuth();
    const [showErrorPopup, setShowErrorPopup] = useState(false);
    const [titleProject, setTitleProject] = useState("");
    const [statusProject, setStatusProject] = useState();
    const [startTime, setStartTime] = useState(dayjs());
    const [endTime, setEndTime] = useState(dayjs());
    const [anggotaProject, setAnggotaProject] = useState("");

    const titlestylecolor = {
        backgroundColor: "#ffce32",
    };
    const bgInput = {
        backgroundColor: "#F6F4F4",
    };
    const bgButtonAdd = {
        backgroundColor: "#1d63ff",
    };

    const statusOptions = [{value: 'onProgress', key: 'On Progress'}, {value: 'done', key: 'Done'}, {
        value: 'cancelled', key: 'Cancelled'
    }, {value: 'onHold', key: 'On Hold'},];

    const userData = {
        email: localStorage.getItem("user.email"),
        name: localStorage.getItem("user.name"),
        department: localStorage.getItem("user.department"),
        position: localStorage.getItem("user.position"),
    };

    const formData = {
        title: titleProject,
        status: statusProject,
        department: localStorage.getItem("user.department"),
        timeStart: startTime,
        timeEnd: endTime,
        anggotaProject: userData.name,
    };
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);
    const handleSubmit = (e) => {
        e.preventDefault();

        if (!titleProject || !statusProject || !startTime || !endTime) {
            setShowErrorPopup(true);
            setTimeout(() => {
                setShowErrorPopup(false);
            }, 3000);
            return; // Don't proceed with form submission
        }

        console.log(formData);
        const axiosInstance = createAxiosInstance(isAuthenticated);

        axiosInstance
            .post("/project", formData)
            .then((response) => {
                console.log(response);
                setShowSuccessPopup(true);
                onClose();
            })
            .catch((e) => {
                console.log(e);
            });
    };

    const handleSelectChange = (setter) => (event) => {
        setter(event.target.value);
    };

    return (<div className="justify-center flex flex-col w-full mx-2 md:w-3/5 items-center ">
        <div style={titlestylecolor} className="flex h-12 w-full rounded-t-lg ">
            <div className="flex flex-row ">
                <div className="w-19 h-fit ml-7 flex">
                    <img
                        src={ProjectLogo}
                        alt="project"
                        className="w-6 h-fit pt-3"
                    />
                    <h1 className="ml-5 flex pt-3 font-semibold text-[18px] text-gray-800">
                        New Project
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
                            id="outlined-required-title"
                            label="Project title"
                            value={titleProject}
                            onChange={(e) => setTitleProject(e.target.value)}/>
                    </div>
                    <div className="p-3">
                        <FormControl className="w-full" required>
                            <InputLabel id="outlined-required-status">Project status</InputLabel>
                            <Select
                                required
                                labelId="outlined-required-status"
                                id="outlined-required-status"
                                label="Project status"
                                value={statusProject}
                                onChange={(e) => setStatusProject(e.target.value)}>
                                {statusOptions.map((option) => (<MenuItem value={option.value} key={option.key}>
                                    {option.key}
                                </MenuItem>))}
                            </Select>
                        </FormControl>
                    </div>
                    <div className="p-3">
                        <DateTimePicker
                            className="w-full"
                            label="Project start"
                            value={startTime}
                            onChange={handleSelectChange(setStartTime)}
                        />
                    </div>
                    <div className="p-3">
                        <DateTimePicker
                            className="w-full"
                            label="Project deadline"
                            value={endTime}
                            onChange={handleSelectChange(setEndTime)}
                        />
                    </div>
                    {showErrorPopup && (<div className="error-popup">
                        <p className="text-red-600">
                            {" "}
                            !! Please fill in all required fields. !!{" "}
                        </p>
                    </div>)}
                    <div className="mt-4 mr-4">
                        <button
                            className="float-right ml-5 text-center pt-2 pb-2 pl-8 pr-8 text-white font-semibold rounded-full"
                            style={bgButtonAdd}
                            onClick={handleSubmit}
                        >
                            Add
                        </button>

                        <button
                            className="float-right text-center pt-2 pb-2 pl-8 pr-8 text-white font-semibold rounded-full"
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

export default AddNewProject;
