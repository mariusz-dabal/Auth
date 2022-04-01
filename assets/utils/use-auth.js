import React, { useState, useEffect, useContext, createContext } from "react";
import axios from "axios";

const authContext = createContext();

// Provider component that wraps your app and makes auth object ...
// ... available to any child component that calls useAuth().
export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

// Hook for child components to get the auth object ...
// ... and re-render when it changes.
export const useAuth = () => {
  return useContext(authContext);
};

// Provider hook that creates auth object and handles state
function useProvideAuth() {
  const [token, setToken] = useState(null);

  // Wrap any methods we want to use making sure ...
  // ... to save the user to state.
  const signin = (email, password) => {
    return axios
      .post("/api/login_check", {
        username: email,
        password: password,
      })
      .then((response) => {
        localStorage.setItem("token", JSON.stringify(response.data.token));
        setToken(response.data.token);
        return response.data.token;
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const signout = () => {
    setToken("");
    localStorage.removeItem("token");
  };

  // Subscribe to user on mount
  // Because this sets state in the callback it will cause any ...
  // ... component that utilizes this hook to re-render with the ...
  // ... latest auth object.
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setToken(token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      setToken("");
    }
  }, []);

  // Return the user object and auth methods
  return {
    token,
    signin,
    signout,
  };
}
