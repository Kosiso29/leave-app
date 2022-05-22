import { Route, Routes } from "react-router-dom";
import Signin from "./pages/Signin";
import Dashboard from "./pages/Dashboard";
import Layout from "./containers/Layout";
import Navbar from "./containers/Navbar";
import Rejected from "./pages/Rejected";
import TotalLeave from "./pages/TotalLeave";

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  return (
      <div className="App">
          <Routes>
              <Route path="/" exact element={<Signin />} />
              <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
              <Route path="/rejected" element={<Layout><Rejected /></Layout>} />
              <Route path="/accepted" element={<Layout><Rejected /></Layout>} />
              <Route path="/total" element={<Layout><TotalLeave /></Layout>} />
              <Route path="/colleague" element={<Layout><Rejected /></Layout>} />
          </Routes>
      </div>
  );
}

export default App;
