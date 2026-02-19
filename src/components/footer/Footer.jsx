import './Footer.css';

export default function Footer() {
    return (
        <footer className="footer">
            <div className="container footerInner">
                <div className="footerLogo">
                    <div className="logoContainer">
                        <img 
                            src="/src/img/logoSinFondo.png"
                            alt="EcoCole Logo"
                            className="footerLogoImage"
                        />
                    </div>
                    <span className="logoText">
                        ECO<strong>COLE</strong>
                    </span>
                    <span className="logoIcon">♻</span>
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
