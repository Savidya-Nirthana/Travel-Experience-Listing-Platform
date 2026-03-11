import "./App.css";
import Authentications from "./pages/Authentications";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import { AuthContext } from "./contexts/AuthContext";
import { useContext } from "react";

function App() {
  const { user, loading } = useContext(AuthContext);

  if (loading) return null;

  return (
    <Routes>
      <Route
        path="/auth"
        element={user ? <Navigate to="/home" /> : <Authentications />}
      />
      <Route path="/home" element={user ? <Home /> : <Navigate to="/auth" />} />
      <Route path="*" element={<Navigate to={user ? "/home" : "/auth"} />} />
    </Routes>
  );
}

export default App;
