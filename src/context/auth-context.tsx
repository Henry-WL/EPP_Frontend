import { createContext, ReactNode, useState } from "react";
import { useNavigate } from "react-router-dom";


export interface AuthContextType {
    token: string | null;
    userId: string | undefined;
    email: string | undefined;
    isStaff: boolean | undefined;
    isLoggedIn: boolean;
    login: (token: string, userId: string, email: string, isStaff: boolean) => void;
    logout: () => void;
}

const authContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: {children: ReactNode}) => {
  const [token, setToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | undefined>(undefined)
  const [email, setEmail] = useState<string | undefined>(undefined)
  const [isStaff, setIsStaff] = useState<boolean | undefined>(undefined)
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  // const [username, setUsername] = useState()
  // const [avatarURL, setavatarURL] = useState()
  const navigate = useNavigate()

  const login = (token: string, userId: string, email: string, isStaff: boolean) => {
    console.log(token);
    setToken(token);
    setUserId(userId)
    setEmail(email)
    setIsStaff(isStaff)
    setIsLoggedIn(true);
    navigate('/')

  };

  const logout = () => {
    setToken(null);
    setIsLoggedIn(false);
  };

  return (
    <authContext.Provider
      value={{ login, isLoggedIn, logout, token, userId, email, isStaff }}
    >
      {children}
    </authContext.Provider>
  );
};

export default authContext;