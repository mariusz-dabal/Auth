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
  let [token, setToken] = useState(null);

  // Wrap any methods we want to use making sure ...
  // ... to save the user to state.
  const signin = (email, password) => {
    return axios
      .post("/api/login_check", {
        username: email,
        password: password,
      })
      .then((response) => {
        localStorage.setItem("token", response.data.token);
        setToken(response.data.token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
        return response.data.token;
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const signup = (name, challenge, email, password) => {
    return axios
      .post("/api/register", {
        name: name,
        challenge: challenge,
        email: email,
        password: password,
      })
      .then((response) => {
        console.log(response.data);
        return response.data;
      })
      .catch((error) => {
        console.error(error);
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
    token = token ? token : localStorage.getItem("token");

    if (token) {
      setToken(token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      setToken("");
      axios.defaults.headers.common['Authorization'] = `Bearer `;
    }
  }, []);

  // Return the user object and auth methods
  return {
    token,
    signup,
    signin,
    signout,
  };
}
