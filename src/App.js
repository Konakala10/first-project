import React, { useState } from "react";
import Login from "./components/Login";
import Home from "./components/Home";
import "./App.css";

function App() {
  const [user, setUser] = useState(null);

  if (user) {
    return <Home user={user} />;
  }

  return <Login onLogin={setUser} />;
}

export default App;