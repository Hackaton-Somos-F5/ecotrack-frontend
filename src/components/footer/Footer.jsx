import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footerInner">
        <div className="footerLogo">
          <div className="footerCircle">
            <div className="footerCircleOverlay" />
            <img
              src="./src/assets/logoSinFondo.png"
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

        <div className="footerLinks">
          <a href="#quienes-somos">Quiénes somos</a>
          <a href="#mision">Misión</a>
          <a href="#como-reciclar">Cómo reciclar</a>
        </div>

        <p className="footerCopy">© 2026 EcoCole · Smart Resource Flow</p>
      </div>
    </footer>
  );
}
