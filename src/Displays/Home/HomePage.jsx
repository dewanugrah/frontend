import '../../Styles/App.css'
import Header from "../../Components/Header/header.jsx";
import Footer from "../../Components/Footer/footer.jsx";
import Menu from "../../Components/HamburgerMenu/menu.jsx"
import meetingIcon from "../../assets/people.png"
import nextMeetingIcon from "../../assets/nextMeeting-logo.png"
import nextProjectIcon from "../../assets/nextProject-logo.png"
import projectIcon from "../../assets/verified.png"
import timeIcon from "../../assets/time.png"
import userIcon from "../../assets/user.png"
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
function HomePage() {
    const bgBigCard = {
        backgroundColor: "#ECEAC6", // Yellow
    };

    const bgMeetingCard = {
        backgroundColor: "#1d63ff", // Blue Gray
    };

    const bgProjectCard = {
        backgroundColor: "#ffce32", // Blue Gray
    };

    const headerList = {
        backgroundColor: "#ffce32", // Orange
    };

    const bgList = {
        backgroundColor: "#FFFFFF", // Light Gray
    };

    const bgStatus = {
        backgroundColor: "#1d63ff", // Blue
    };

    const boxShadow = {
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Subtle shadow for depth
    };

    const textColor = {
        color: "#121722"

    }


    const [meetingData, setMeetingData] = useState([]);
    const [projectData, setProjectData] = useState([]);

    // Assume you have the authentication token available
    const authToken = localStorage.getItem('token');



    const formatDate = (dateString) => {
        const options = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        };
        const formattedDate = new Date(dateString).toLocaleDateString('id-ID', options);
        return formattedDate;
    };

    const formatTime = (dateString) => {
        const options = {
            hour: 'numeric',
            minute: 'numeric',
        };
        const formattedTime = new Date(dateString).toLocaleTimeString('id-ID', options);
        return formattedTime;
    };

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

                // Fetch projects data
                const projectsResponse = await fetch('http://localhost:8888/api/v1/project', {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    },
                });

                // Handle the response for projects
                if (projectsResponse.ok) {
                    const projectsData = await projectsResponse.json();
                    if (!projectsData) {
                        console.error('Projects data is empty.');
                        return;
                    }
                    projectsData.sort((a, b) => new Date(a.timeStart) - new Date(b.timeStart));
                    setProjectData(projectsData);

                } else {
                    if (projectsResponse.status === 403) {
                        console.error('Unauthorized: Authentication token is invalid or expired.');
                    } else {
                        console.error(`Failed to fetch projects. Status: ${projectsResponse.status}`);
                    }
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        // Call the combined function
        fetchData();
    }, []); // Empty dependency array means this effect runs once when the component mounts



    return(
        <>
            <Header />
            <Menu/>
            <div className="flex flex-col h-full w-full justify-center rounded-b-3xl select-none"
                 style={{...bgBigCard,...boxShadow}}>

                <div className="flex flex-row justify-evenly my-20">
                    {meetingData.length === 0 ? (
                        <div className="w-1/3 h-full flex flex-col rounded-xl text-white"
                             style={{...bgMeetingCard, ...boxShadow}}
                        >
                            <div className="flex flex-row justify-between border-b-2 m-2 mx-10 border-orange-300 ">
                                <div className="flex flex-col  text-2xl">
                                    <p>Next Meeting</p>
                                    <p>Schedule</p>
                                </div>
                                <div className="flex w-14 h-14 ">
                                    <img src={nextMeetingIcon} alt=""/>
                                </div>
                            </div>

                            <div className="flex flex-col mx-14 mb-5  py-5 text-xl">
                                <p>DD/MM/YY</p>
                                <p> -- : -- WITA</p>
                            </div>

                        </div>
                    ) : (
                    <div className="w-1/3 flex flex-col rounded-xl text-white"
                         style={{...bgMeetingCard,...boxShadow}}
                    >
                        <div className="flex flex-row justify-between border-b-2 m-2 mx-10 border-orange-300">
                            <div className="flex flex-col text-2xl">
                                <p>Next Meeting</p>
                                <p>Schedule</p>
                            </div>
                            <div className="flex w-16 h-16">
                                <img src={nextMeetingIcon} alt=""/>
                            </div>
                        </div>
                        {meetingData.length > 0 && (
                            <div className="flex flex-col mx-14 mb-5 py-5 text-xl">
                                <p>{formatDate(meetingData[0].timeStart)}</p>
                                <p>{formatTime(meetingData[0].timeStart)} WITA</p>
                            </div>
                        )}
                    </div>
                    )}
                    {projectData.length === 0 ? (
                        <div className="w-1/3 h-full flex flex-col rounded-xl text-white"
                             style={{...bgProjectCard, ...boxShadow, ...textColor}}
                        >
                            <div className="flex flex-row justify-between border-b-2 m-2 mx-10 border-blue-500 ">
                                <div className="flex flex-col  text-2xl">
                                    <p>Next Deadline</p>
                                    <p>Project</p>
                                </div>
                                <div className="flex w-14 h-14 ">
                                    <img src={nextProjectIcon} alt=""/>
                                </div>
                            </div>

                                    <div className="flex flex-col mx-14 mb-5  py-5 text-xl">
                                        <p>DD/MM/YY</p>
                                        <p> -- : -- WITA</p>
                                    </div>

                        </div>
                    ) : (
                        <div className="w-1/3 h-full flex flex-col rounded-xl text-white"
                             style={{...bgProjectCard, ...boxShadow, ...textColor}}
                        >
                            <div className="flex flex-row justify-between border-b-2 m-2 mx-10 border-blue-500 ">
                                <div className="flex flex-col  text-2xl">
                                    <p>Next Deadline</p>
                                    <p>Project</p>
                                </div>
                                <div className="flex w-14 h-14 ">
                                    <img src={nextProjectIcon} alt=""/>
                                </div>
                            </div>
                            {projectData.length > 0 &&
                                (
                                    <div className="flex flex-col mx-14 mb-5  py-5 text-xl">
                                        <p>{formatDate(projectData[0].timeEnd)}</p>
                                        <p>{formatTime(projectData[0].timeEnd)} WITA</p>
                                    </div>
                                )}
                        </div>
                        )}
                </div>
            </div>

            <div className="flex flex-row w-full h-full justify-stretch">
                <div className="flex flex-col w-1/2 h-full m-20">
                    <div className="flex flex-row w-full px-2 py-4 rounded-t-xl"
                         style={headerList}
                    >
                        <div className="flex mx-3">
                            <img
                                src={meetingIcon}
                                alt=""
                                className="w-6 h-fit"
                            />
                        </div>
                        <div style={textColor}>
                            <p>Meeting</p>
                        </div>
                    </div>
                        {meetingData.length === 0 ? (
                            <div style={{...bgList,...boxShadow,...textColor}}
                                className=" flex justify-center items-center p-40 overflow-x-auto mb-10">
                                <div className="flex justify-center items-center h-full">
                                    <p className="text-gray-500 text-lg">Meeting is empty. Please add new Meeting.</p>
                                </div>
                            </div>
                        ) : (
                    <div className="flex flex-col h-full px-7 rounded-b-3xl "
                         style={{...bgList,...boxShadow,...textColor}}
                    >
                        {/*meeting dump data*/}
                        {meetingData.slice(0,5).map((meeting, index) => (
                            <div id={`meeting-list-home-${index}`}
                                 className="flex flex-row justify-between w-full p-5 items-center border-b-2 border-black"
                                 key={index}
                            >
                                <div className="flex flex-col">
                                    <div className="text-xl py-1">
                                        {meeting.topic}
                                    </div>
                                    <div className="flex w-full flex-row py-1">
                                        <div className="flex w-5 mr-3">
                                            <img src={userIcon} alt="" className="mr-3"/>
                                        </div>
                                        <div>
                                            {meeting.creator && (
                                                <p className="text-sm">{meeting.creator.name}</p>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex w-full flex-row py-1">
                                        <div className="flex w-5 mr-3">
                                            <img src={timeIcon} alt="" className="mr-3"/>
                                        </div>
                                        <div>
                                            <p className="text-sm">{formatDate(meetingData[index].timeStart)}, {formatTime(meetingData[index].timeStart)} - {formatTime(meetingData[0].timeEnd)} WITA</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center p-1 px-3 text-white rounded-lg"
                                     style={bgStatus}
                                >
                                    <p>NEW</p>
                                </div>
                            </div>
                        ))}
                        <div className="flex p-5 justify-center">
                            <Link to="/meetinglist">
                                <p>See All</p>
                            </Link>
                        </div>


                    </div>
                        )}
                </div>
                <div className="flex flex-col w-1/2 h-full m-20">
                    <div className="flex flex-row w-full bg-orange-300 px-2 py-4 rounded-t-xl"
                         style={headerList}>
                        <div className="flex mx-3">
                            <img
                                src={projectIcon}
                                alt=""
                                className="w-6 h-fit"
                            />
                        </div>
                        <div style={textColor}>
                            <p>Project</p>
                        </div>
                    </div>
                    {projectData.length === 0 ? (
                        <div style={{...bgList,...boxShadow,...textColor}}
                             className=" flex justify-center items-center p-40 overflow-x-auto mb-10">
                            <div className="flex justify-center items-center h-full">
                                <p className="text-gray-500 text-lg">Project is empty. Please add new Project.</p>
                            </div>
                        </div>
                    ) : (
                    <div className="flex flex-col bg-gray-200 h-full px-7 rounded-b-3xl"
                         style={{...bgList,...boxShadow,...textColor}}>
                        {/*Project dump data*/}
                        {projectData.slice(0,5).map((project, index) => (
                            <div id={`project-list-home-${index}`}
                                 className="flex flex-row justify-between w-full p-5 items-center border-b-2 border-black"
                                 key={index}
                            >
                                <div className="flex flex-col">
                                    <div className="text-xl py-1">
                                        {project.title}
                                    </div>
                                    <div className="flex w-full flex-row py-1">

                                    </div>
                                    <div className="flex w-full flex-row py-1">
                                        <div className="flex w-5 mr-3">
                                            <img src={timeIcon} alt="" className="mr-3 w-5 h-5"/>
                                        </div>
                                        <div>
                                            <p className="text-sm">{formatDate(projectData[index].timeStart)}, {formatTime(projectData[index].timeStart)} - {formatDate(projectData[index].timeEnd)} {formatTime(projectData[0].timeEnd)} WITA</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center p-1 px-3 text-white rounded-lg"
                                     style={bgStatus}
                                >
                                    <p>NEW</p>
                                </div>
                            </div>
                        ))}
                        <div className="flex p-5 justify-center">
                            <Link to="/projectlist">
                            <p>See All</p>
                            </Link>
                        </div>

                    </div>
                        )}
                </div>


            </div>
            <Footer/>
        </>
    )
}

export default HomePage;