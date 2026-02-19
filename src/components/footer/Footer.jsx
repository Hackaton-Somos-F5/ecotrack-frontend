import './Footer.css';

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footerInner">

                {/* Logo izquierda — igual que el header */}
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
                        <span className="logoText">ECO<strong>COLE</strong></span>
                        <span className="logoTagline">Smart Resource Flow</span>
                    </div>
                </div>

                {/* Links centrales */}
                <div className="footerLinks">
                    <a href="#quienes-somos">Quiénes somos</a>
                    <a href="#mision">Misión</a>
                    <a href="#como-reciclar">Cómo reciclar</a>
                </div>

                {/* Copyright derecha */}
                <p className="footerCopy">© 2026 EcoCole · Smart Resource Flow</p>

            </div>
        </footer>
    );
}