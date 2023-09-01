import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const authenticateUser = async (username, password) => {
    try {
      const response = await fetch("http://localhost:3001/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.status === 200) {
        localStorage.setItem("token", data.token);
        setIsAuthenticated(true);
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error("There was an error logging in", error);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, authenticateUser }}>
      {children}
    </AuthContext.Provider>
  );
};
