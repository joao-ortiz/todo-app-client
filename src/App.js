import UserContext from "./Context/UserContext";
import auth from "./services/auth.service"
import "./App.css"

import { 
  BrowserRouter as Router,
  Route,
  Routes
 } from "react-router-dom"
import Login from "./Page/Login";
import SignUp from "./Page/Signup"
import Home from "./Page/Home";
import Project from "./Page/Project"
import { useState } from "react";
import history from "./history";

function App() {
  const [user, setUser] = useState(auth.getUser())
  
  return <UserContext.Provider value={user}>
    <Router history={history}>
      { 
        user ?
        <Routes>
          <Route path="/" element={<Home setUser={setUser} />} />
          <Route path="/project/:id" element={<Project />} />
        </Routes>
        :
        <Routes>
          <Route path="/" element={<Login setUser={setUser} />} />
          <Route path="/signup" element={<SignUp setUser={setUser} />} />
        </Routes>
      }
    </Router>
  </UserContext.Provider>
}

export default App;
