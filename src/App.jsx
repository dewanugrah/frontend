import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Login from './Displays/Login/Login.jsx'
import HomePage from "./Displays/Home/HomePage.jsx";
import NotFoundPage from "./Displays/NotFound/Error.jsx"
import InvenroryList from "./Displays/Inventory/InvenroryList.jsx";
import MeetingList from "./Displays/Meeting/MeetingLIst.jsx";
import MeetingDetailed from "./Displays/Meeting/MeetingDetailed.jsx";
import Profile from "./Displays/Profile/Profile.jsx";
import ProjectDetailed from "./Displays/Project/ProjectDetailed.jsx";
import ProjectList from "./Displays/Project/ProjectList.jsx";
import Finance from "./Displays/Finance/Finance.jsx";
import PrivateRoute from "./services/privateRoute.jsx";
import PublicRoute from "./services/publicRoute.jsx";
function App() {
  return (
      <Router>
        <Routes>
            <Route path="/" element={<PublicRoute><Login/></PublicRoute>}/>
            <Route path="/404" element={<NotFoundPage/>}/>

            <Route path="/home" element={<PrivateRoute><HomePage/></PrivateRoute>}/>
            <Route path="/inventorylist" element={<PrivateRoute><InvenroryList/></PrivateRoute>}/>
            <Route path="/meetinglist" element={<PrivateRoute><MeetingList/></PrivateRoute>}/>
            <Route path="/meetinglist/meetingdetailed" element={<PrivateRoute><MeetingDetailed/></PrivateRoute>}/>
            <Route path="/profile" element={<PrivateRoute><Profile/></PrivateRoute>}/>
            <Route path="/projectlist" element={<PrivateRoute><ProjectList/></PrivateRoute>}/>
            <Route path="/projectlist/projectdetailed" element={<PrivateRoute><ProjectDetailed/></PrivateRoute>}/>
            <Route path="/finance" element={<PrivateRoute><Finance/></PrivateRoute>}/>
        </Routes>
      </Router>

  )
}

export default App
