import { useContext, useEffect } from "react";
import authContext, { AuthContextType } from "../context/auth-context";
import { Route, Routes, useNavigate } from "react-router-dom";
import Example from "../components/Navbar";
import Events from "./Events";
import NewEvent from "./NewEvent";
import SingleEventPage from "./SingleEventPage";
import Login from "./Login";
import Index from "./Index";
import ProfilePage from "./ProfilePage";

const AuthenticatedRoutes = () => {
    const auth = useContext(authContext) as AuthContextType | null;
  const navigate = useNavigate();

  if (!auth) {
    return <p>Loading...</p>
  }

  useEffect(() => {
    if (!auth.isLoggedIn) {
      navigate("/login");
    }
  }, [auth.isLoggedIn, navigate]);

  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/login" element={<Login />} />
      <Route path="/events" element={<Events />} />
      <Route path="/newevent" element={<NewEvent />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/event/:eventId" element={<SingleEventPage />} />
    </Routes>
  );
};

export default AuthenticatedRoutes;
