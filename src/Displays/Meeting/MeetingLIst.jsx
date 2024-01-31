import '../../Styles/App.css'
import Header from "../../Components/Header/header.jsx";
import Footer from "../../Components/Footer/footer.jsx";
import Menu from "../../Components/HamburgerMenu/menu.jsx"
import AddNewMeeting from "./AddNewMeeting.jsx";
import {useEffect, useState} from "react";
import meetingIcon from "../../assets/people.png";

function MeetingList(){
    const [currentPage, setCurrentPage] = useState(1);
    const [isAddMeetingModalOpen, setIsAddMeetingModalOpen] = useState(false);
    const itemsPerPage = 10;

    const handleClickNext = () => {
        setCurrentPage(prevPage => prevPage + 1);
    };

    const handleClickPrev = () => {
        setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
    };

    const textColor = {
        color: "#121722"

    }
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = currentPage * itemsPerPage;

    const formatDate = (dateString) => {
        const options = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        };
        return new Date(dateString).toLocaleDateString('id-ID', options);
    };

    const formatTime = (dateString) => {
        const options = {
            hour: 'numeric',
            minute: 'numeric',
        };
        return new Date(dateString).toLocaleTimeString('id-ID', options);
    };

    const [meetingData, setMeetingData] = useState([]);

    const bgBigCard = {
        backgroundColor: "#ECEAC6", // Yellow
    };

    const headerList = {
        backgroundColor: "#ffce32", // Orange
    };

    const bgList = {
        backgroundColor: "#FFFFFF", // Light Gray
    };

    const bgBlue ={
        backgroundColor: "#1d63ff"
    }

    const boxShadow = {
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Subtle shadow for depth
    };


    // Assume you have the authentication token available
    const authToken = localStorage.getItem('token');
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch meetings data
                const meetingsResponse = await fetch('http://localhost:8888/api/v1/meetings', {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    },
                });

                // Handle the response for meetings
                if (meetingsResponse.ok) {
                    const meetingsData = await meetingsResponse.json();
                    meetingsData.sort((a, b) => new Date(a.timeStart) - new Date(b.timeStart));
                    setMeetingData(meetingsData);
                } else {
                    if (meetingsResponse.status === 403) {
                        console.error('Unauthorized: Authentication token is invalid or expired.');
                    } else {
                        console.error(`Failed to fetch meetings. Status: ${meetingsResponse.status}`);
                    }
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        // Call the combined function
        fetchData();
    }, [authToken, isAddMeetingModalOpen]); // Empty dependency array means this effect runs once when the component mounts

    const openAddMeetingModal = () => {
        setIsAddMeetingModalOpen(true);
    };

    const closeAddMeetingModal = () => {
        setIsAddMeetingModalOpen(false);
    };

    return(
        <>
            <Header/>
            <Menu/>
            <div className="flex flex-col min-h-fit w-full justify-center rounded-b-5xl select-none pb-10 mb-[156px]"
                 style={{...bgBigCard, ...boxShadow, ...textColor}}>
                <div className="flex flex-col w-9/10 h-full mx-2 md:mx-16">
                    <div className="flex flex-row w-full px-2 py-4 rounded-t-2xl mt-16"
                         style={headerList}>
                        <div className="flex mx-3">
                            <img
                                src={meetingIcon}
                                alt=""
                                className="w-6 h-fit"
                            />
                        </div>
                        <div>
                            <p >Meeting List</p>
                        </div>
                    </div>
                    <div className="flex flex-col h-full px-7 rounded-b-2xl mb-20"
                         style={{...bgList, ...boxShadow}}
                    >
                        <div className="flex w-full justify-start ">
                            <div className=" p-2 rounded-full my-4 text-white"
                            style={bgBlue}>
                                <button onClick={openAddMeetingModal}>Add New Meeting</button>
                            </div>
                        </div>
                        {isAddMeetingModalOpen && (
                            <div className="modal-container">
                                <AddNewMeeting onClose={closeAddMeetingModal}/>
                            </div>
                        )}
                        {meetingData.length === 0 ? (
                            <div className=" flex justify-center items-center p-40 overflow-x-auto mb-10">
                                <div className="flex justify-center items-center h-full">
                                    <p className="text-gray-500 text-lg">Meeting is empty. Please add new Meeting.</p>
                                </div>
                            </div>
                        ) : (
                            <div className="overflow-x-auto mb-10">
                                <table className="table-auto w-full bg-white border-collapse border border-gray-300">
                                    <thead>
                                    <tr className="bg-blue-200">
                                        <th className="px-2 md:px-6 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">
                                            Topic
                                        </th>
                                        <th className="px-2 md:px-6 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">
                                            Location
                                        </th>
                                        <th className="px-2 md:px-6 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">
                                            Time
                                        </th>
                                        <th className="px-2 md:px-6 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">
                                            Creator
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-300">
                                    {meetingData.slice(startIndex, endIndex).map((meeting, index) => (
                                        <tr id={`meeting-list-${index}`} className="bg-blue-100" key={index}>
                                            <td className="px-2 md:px-6 py-4 whitespace-nowrap">{meeting.topic}</td>
                                            <td className="px-2 md:px-6 py-4 whitespace-nowrap">{meeting.location}</td>
                                            <td className="px-2 md:px-6 py-4 whitespace-nowrap">
                                                {formatDate(meeting.timeStart)}, {formatTime(meeting.timeStart)} - {formatTime(meeting.timeEnd)} WITA
                                            </td>
                                            {meeting.creator && (
                                                <td className="px-2 md:px-6 py-4 whitespace-nowrap">{meeting.creator.name}</td>
                                            )}
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                                <div className="flex flex-row justify-between ">

                                    <div
                                        className="mb-2 flex items-center">Showing {startIndex + 1} - {endIndex} of {meetingData.length} projects
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
                                            disabled={endIndex >= meetingData.length}
                                            style={bgBlue}
                                            className=" text-white font-bold py-2 px-4 rounded"
                                        >
                                            Next
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                    </div>

                </div>
            </div>
            <Footer/>
        </>
    )
}

export default MeetingList