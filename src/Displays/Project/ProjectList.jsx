import '../../Styles/App.css'
import Header from "../../Components/Header/header.jsx";
import Footer from "../../Components/Footer/footer.jsx";
import Menu from "../../Components/HamburgerMenu/menu.jsx"
import AddNewProject from "./AddNewProject.jsx";
import {useEffect, useState} from "react";
import projectIcon from "../../assets/verified.png";

function ProjectList(){
    const [currentPage, setCurrentPage] = useState(1);
    const [isAddProjectModalOpen, setIsAddProjectModalOpen] = useState(false);
    const itemsPerPage = 10;

    const handleClickNext = () => {
        setCurrentPage(prevPage => prevPage + 1);
    };

    const handleClickPrev = () => {
        setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
    };

    const formatDate = (dateString) => {
        const options = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        };
        return new Date(dateString).toLocaleDateString('id-ID', options);
    };

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = currentPage * itemsPerPage;

    const formatTime = (dateString) => {
        const options = {
            hour: 'numeric',
            minute: 'numeric',
        };
        return new Date(dateString).toLocaleTimeString('id-ID', options);
    };

    const [projectData, setProjectData] = useState([]);

    const bgBigCard = {
        backgroundColor: "#ECEAC6", // Yellow
    };

    const headerList = {
        backgroundColor: "#ffce32", // Orange
    };

    const bgList = {
        backgroundColor: "#FFFFFF", // Light Gray
    };

    const boxShadow = {
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Subtle shadow for depth
    };

    const textColor = {
        color: "#121722"
    }

    const bgBlue ={
        backgroundColor: "#1d63ff"
    }

    // Assume you have the authentication token available
    const authToken = localStorage.getItem('token');
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch project data
                const projectResponse = await fetch('http://localhost:8888/api/v1/project', {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    },
                });

                // Handle the response for project
                if (projectResponse.ok) {
                    const projectData = await projectResponse.json();
                    projectData.sort((a, b) => new Date(a.timeStart) - new Date(b.timeStart));
                    setProjectData(projectData);
                } else {
                    if (projectResponse.status === 403) {
                        console.error('Unauthorized: Authentication token is invalid or expired.');
                    } else {
                        console.error(`Failed to fetch project. Status: ${projectResponse.status}`);
                    }
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        // Call the combined function
        fetchData();
    }, [authToken, isAddProjectModalOpen]); // Empty dependency array means this effect runs once when the component mounts

    const openAddProjectModal = () => {
        setIsAddProjectModalOpen(true);
    };

    const closeAddProjectModal = () => {
        setIsAddProjectModalOpen(false);
    };

    return(
        <>
            <Header/>
            <Menu/>
            <div className="flex flex-col min-h-fit w-full justify-center rounded-b-5xl select-none pb-10 mb-[156px]"
                 style={{...bgBigCard, ...boxShadow, ...textColor}}>
                <div className="flex flex-col w-9/10 h-full mx-2 md:mx-16">
                    <div className="flex flex-row w-full px-2 py-4 rounded-t-3xl mt-16"
                         style={headerList}>
                        <div className="flex mx-3">
                            <img
                                src={projectIcon}
                                alt=""
                                className="w-6 h-fit"
                            />
                        </div>
                        <div>
                            <p>Project List</p>
                        </div>
                    </div>
                    <div className="flex flex-col h-full px-7 rounded-b-3xl mb-20"
                         style={{...bgList, ...boxShadow}}
                    >
                        <div className="flex w-full justify-start ">
                            <div style={bgBlue}
                                className="p-2 rounded-full my-4 text-white">
                                <button onClick={openAddProjectModal}>Add New Project</button>
                            </div>
                        </div>
                        {isAddProjectModalOpen && (
                            <div className="modal-container">
                                <AddNewProject onClose={closeAddProjectModal}/>
                            </div>
                        )}
                        {projectData.length === 0 ? (
                            <div className=" flex justify-center items-center p-40 overflow-x-auto mb-10">
                                <div className="flex justify-center items-center h-full">
                                    <p className="text-gray-500 text-lg">Project is empty. Please add new Project.</p>
                                </div>
                            </div>
                        ) : (
                            <div className="overflow-x-auto mb-10">
                                <table className="table-auto w-full bg-white border-collapse border border-gray-300">
                                    <thead>
                                    <tr className="bg-blue-200">
                                        <th className="px-2 md:px-6 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">
                                            Title
                                        </th>
                                        <th className="px-2 md:px-6 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">
                                        Status
                                        </th>
                                        <th className="px-2 md:px-6 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">
                                            Time
                                        </th>
                                        <th className="px-2 md:px-6 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">
                                            Department
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-300">
                                    {projectData.slice(startIndex, endIndex).map((project, index) => (
                                        <tr id={`project-list-${index}`} className="bg-blue-100" key={index}>
                                            <td className="px-2 md:px-6 py-4 whitespace-nowrap">{project.title}</td>
                                            <td className="px-2 md:px-6 py-4 whitespace-nowrap">{project.status}</td>
                                            <td className="px-2 md:px-6 py-4 whitespace-nowrap">
                                                {formatDate(project.timeStart)}, {formatTime(project.timeStart)} - {formatTime(project.timeEnd)} WITA
                                            </td>
                                            {project.department && (
                                                <td className="px-2 md:px-6 py-4 whitespace-nowrap">{project.department}</td>
                                            )}
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                                <div className="flex flex-row justify-between ">

                                    <div
                                        className="mb-2 flex items-center">Showing {startIndex + 1} - {endIndex} of {projectData.length} projects
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
                                            disabled={endIndex >= projectData.length}
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

export default ProjectList
