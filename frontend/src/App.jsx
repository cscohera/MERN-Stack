import {Route, Routes} from "react-router";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import CreateAccountPage from "./pages/CreateAccountPage.jsx";
import CreateRunPage from "./pages/CreateRunPage";
import CoachPage from "./pages/CoachPage";


const App = () => {
  return <div>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/createUser" element={<CreateAccountPage/>}/>
        <Route path="/home" element={<HomePage />} />
        <Route path="/CoachPage" element={<CoachPage/>} />
        <Route path="/createRun" element={<CreateRunPage />} />
      </Routes>
    </div>
};

export default App
