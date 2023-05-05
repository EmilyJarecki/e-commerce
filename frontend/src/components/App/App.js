import "./App.css";
import "../Header/header.css";
import Header from "../Header/Header";
// import Footer from '../Footer/Footer';
import Main from "../Main";
import UserProvider from "../../data/userContext";

import { UserContext } from "../../data";
import { useState } from "react";

function App() {
  const { Provider: UserInfo } = UserContext;

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  return (
    <div className="App">
        <UserInfo
          value={{
            isAuthenticated,
            currentUser,
            setAuth: setIsAuthenticated,
            setUser: setCurrentUser,
          }}
        >
          <Header />
          <Main />
        </UserInfo>
    </div>
  );
}

export default App;
