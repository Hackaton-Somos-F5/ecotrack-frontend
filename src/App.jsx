import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/header/Header.jsx";
import Home from "./components/pages/Home.jsx";
import Footer from './components/footer/Footer.jsx';
import Dashboard from './components/pages/Dashboard.jsx';
import Register from './components/pages/Register.jsx';
import Wasteform from './components/pages/Wasteform.jsx';
import Login from './components/pages/Login.jsx';


function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/wasteform" element={<Wasteform />} />

        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;