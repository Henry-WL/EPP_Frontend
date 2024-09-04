import { useContext, useEffect } from "react";
import Login from "./pages/Login";
import authContext from "./context/auth-context";
import { Route, Routes, useNavigate } from "react-router-dom";
import Example from "./components/Navbar";
import Events from "./pages/Events";

const App = () => {
  const auth = useContext(authContext)
  const navigate = useNavigate()


  useEffect(() => {
    if (!auth.isLoggedIn) {
      navigate('/login')
    }
  },[auth.isLoggedIn])

  return (
    <div className="">

      {/* {!auth.isLoggedIn && <Login />}
      {auth.isLoggedIn && <h1>Events</h1>} */}
      <Example/>
      <Routes>
      <Route path="/" element={<div>
        <h1>Logged in</h1>
        <button onClick={() => auth.logout()}>logout</button>
      </div>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/events" element={<Events/>}/> 
      </Routes>
    </div>
  );
};

export default App;
