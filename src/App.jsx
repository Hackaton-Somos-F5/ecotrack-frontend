import './App.css'
import { Routes, Route } from "react-router-dom";
import Dashboard from "./components/pages/Dashboard";
import Register from "./components/pages/Register";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default App;