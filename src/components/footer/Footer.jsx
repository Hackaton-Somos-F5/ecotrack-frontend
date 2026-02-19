import "./Footer.css";
import { useNavigate } from "react-router-dom";

export default function Footer() {
  const navigate = useNavigate();

  const goToSection = (id) => {
    navigate("/");
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <footer className="footer">
      <div className="footerInner">

        {/* LOGO */}
        <div className="footerLogo">
          <div className="footerCircle">
            <div className="footerCircleOverlay" />
            <img
              src="/logoSinFondo.png"
              alt="EcoCole Logo"
              className="footerLogoImage"
            />
          </div>

          <div className="footerLogoText">
            <span className="logoText">
              ECO<strong>COLE</strong>
            </span>
            <span className="logoTagline">Smart Resource Flow</span>
          </div>
        </div>

        {/* LINKS TEXTO */}
        <div className="footerLinks">
          <span onClick={() => goToSection("quienes-somos")}>Quiénes somos</span>
          <span onClick={() => goToSection("mision")}>Misión</span>
          <span onClick={() => goToSection("como-reciclar")}>Cómo reciclar</span>
        </div>

        <p className="footerCopy">© 2026 EcoCole · Smart Resource Flow</p>
      </div>
    </footer>
  );
}
