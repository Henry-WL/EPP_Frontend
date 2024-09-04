import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const authContext = createContext();


export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  // const [userId, setUserId] = useState()
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  // const [username, setUsername] = useState()
  // const [avatarURL, setavatarURL] = useState()
  const navigate = useNavigate()

  const login = (token) => {
    console.log(token);
    setToken(token);
    setIsLoggedIn(true);
    navigate('/')

  };

  const logout = () => {
    setToken(null);
    setIsLoggedIn(false);
  };

  return (
    <authContext.Provider
      value={{ login, setIsLoggedIn, isLoggedIn, logout, token }}
    >
      {children}
    </authContext.Provider>
  );
};

export default authContext;