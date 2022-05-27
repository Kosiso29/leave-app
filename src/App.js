import { Route, Routes } from "react-router-dom";
import Signin from "./pages/Signin";
import Dashboard from "./pages/Dashboard";
import Layout from "./containers/Layout";
import RejectedLeave from "./pages/RejectedLeave";
import AcceptedLeave from "./pages/AcceptedLeave";
import ColleagueLeave from "./pages/ColleagueLeave";
import TotalLeave from "./pages/TotalLeave";

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  return (
      <div className="App">
          <Routes>
              <Route path="/" exact element={<Signin />} />
              <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
              <Route path="/rejected" element={<Layout><RejectedLeave /></Layout>} />
              <Route path="/accepted" element={<Layout><AcceptedLeave /></Layout>} />
              <Route path="/total" element={<Layout><TotalLeave /></Layout>} />
              <Route path="/colleague" element={<Layout><ColleagueLeave /></Layout>} />
          </Routes>
      </div>
  );
}

export default App;
