import { Route, Routes } from "react-router-dom";
import Signin from "./pages/Signin";
import Dashboard from "./pages/Dashboard";
import Navbar from "./containers/Navbar";

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  return (
      <div className="App">
          <Routes>
              <Route path="/" exact element={<Signin />} />
              <Route path="/Dashboard" element={
                    <Dashboard />
                //   <>
                //     <Navbar />
                //   </>
              } />
          </Routes>
      </div>
  );
}

export default App;
