import React, { useContext } from "react";
import Annotation from "./Annotation";
import { AuthContext } from "./Auth";
import LoginForm from "./Forms/LoginForm";

const App = () => {
  const { isAuthenticated } = useContext(AuthContext);

  if (!isAuthenticated) {
    return (
      <div>
        <h1>Login</h1>
        <LoginForm />
      </div>
    );
  }
  return (
    <div className="App">
      <h1>Title</h1>
      <Annotation />
    </div>
  );
};

export default App;
