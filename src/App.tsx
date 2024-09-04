import { useContext } from "react";
import Login from "./pages/Login";
import authContext from "./context/auth-context";

const App = () => {
  const auth = useContext(authContext)

  
  return (
    <div className="">

      {!auth.isLoggedIn && <Login />}
      {auth.isLoggedIn && <h1>Events</h1>}
    </div>
  );
};

export default App;
