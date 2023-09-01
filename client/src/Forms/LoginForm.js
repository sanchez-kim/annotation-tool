import React, { useState, useContext } from "react";
import { AuthContext } from "../Auth";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { authenticateUser } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    authenticateUser(username, password);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
