import { useContext, useEffect } from "react";
import authContext from "../context/auth-context";
import { Route, Routes, useNavigate } from "react-router-dom";
import Example from "../components/Navbar";
import Events from "./Events";
import NewEvent from "./NewEvent";
import SingleEventPage from "./SingleEventPage";
import Login from "./Login";

const AuthenticatedRoutes = () => {
  const auth = useContext(authContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.isLoggedIn) {
      navigate("/login");
    }
  }, [auth.isLoggedIn, navigate]);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <div>
            <h1>Logged in</h1>
            <button onClick={() => auth.logout()}>logout</button>
          </div>
        }
      />
            <Route path='/login' element={<Login/>}/>

      <Route path="/events" element={<Events />} />
      <Route path="/newevent" element={<NewEvent />} />
      <Route path="/event/:eventId" element={<SingleEventPage />} />
    </Routes>
  );
};

export default AuthenticatedRoutes;