import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/header/Header.jsx";
import Home from "./components/pages/Home.jsx";
  import Footer from './components/footer/Footer.jsx';
  import Register from './components/pages/Register.jsx';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
         <Route path="/register" element={<Register/>} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;